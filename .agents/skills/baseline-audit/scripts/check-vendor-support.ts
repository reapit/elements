interface EndOfLifeCycle {
  cycle: string;
  releaseDate: string;
  eol: boolean | string;
  latest: string;
  latestReleaseDate: string;
  lts: boolean | string;
}

interface BrowserSupport {
  browser: string;
  version: string;
  eol: string | "ongoing";
  lts: boolean;
  baselineFloor: number | null;
}

interface VendorReport {
  timestamp: string;
  date: string;
  browsers: BrowserSupport[];
  policyFloor: {
    baselineYear: number | null;
    boundBy: string | null;
  };
}

/** Baseline core browser set — the three engines that matter. */
const BASELINE_BROWSERS = ["chrome", "firefox", "safari"] as const;

/**
 * For each Baseline year, the minimum browser versions.
 * Hardcoded from browserslist-config-baseline — these are historical facts
 * that do not change once a Baseline year is defined. Add a new row annually.
 */
function computeBaselineFloors(): Map<string, Map<number, string>> {
  // Hardcoded floor versions from browserslist-config-baseline.
  // These are well-known and stable.
  const floors: Array<{ year: number; chrome: string; firefox: string; safari: string }> = [
    { year: 2015, chrome: "46", firefox: "44", safari: "10" },
    { year: 2016, chrome: "55", firefox: "52", safari: "10.1" },
    { year: 2017, chrome: "62", firefox: "57", safari: "11.1" },
    { year: 2018, chrome: "69", firefox: "62", safari: "12" },
    { year: 2019, chrome: "79", firefox: "72", safari: "13.1" },
    { year: 2020, chrome: "87", firefox: "84", safari: "14" },
    { year: 2021, chrome: "96", firefox: "95", safari: "15.2" },
    { year: 2022, chrome: "108", firefox: "108", safari: "16.2" },
    { year: 2023, chrome: "120", firefox: "121", safari: "17.2" },
    { year: 2024, chrome: "130", firefox: "132", safari: "18.2" },
    { year: 2025, chrome: "143", firefox: "146", safari: "26.2" },
  ];

  // browser -> year -> min version
  const result = new Map<string, Map<number, string>>();
  for (const browser of BASELINE_BROWSERS) {
    const yearMap = new Map<number, string>();
    for (const f of floors) {
      yearMap.set(f.year, f[browser]);
    }
    result.set(browser, yearMap);
  }
  return result;
}

function compareVersions(a: string, b: string): number {
  const pa = a.split(".").map(Number);
  const pb = b.split(".").map(Number);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const na = pa[i] ?? 0;
    const nb = pb[i] ?? 0;
    if (na !== nb) return na - nb;
  }
  return 0;
}

function findBaselineYear(
  browser: string,
  version: string,
  floors: Map<string, Map<number, string>>,
): number | null {
  const yearMap = floors.get(browser);
  if (!yearMap) return null;

  let highestYear: number | null = null;
  for (const [year, minVersion] of yearMap) {
    if (compareVersions(version, minVersion) >= 0) {
      if (highestYear === null || year > highestYear) {
        highestYear = year;
      }
    }
  }
  return highestYear;
}

async function fetchEndOfLife(product: string): Promise<EndOfLifeCycle[]> {
  const url = `https://endoflife.date/api/${product}.json`;
  let res: Response;
  try {
    res = await fetch(url);
  } catch (e: any) {
    throw new Error(`Network error fetching ${url}: ${e.message}`);
  }
  if (!res.ok)
    throw new Error(`Failed to fetch ${product} from endoflife.date: HTTP ${res.status}`);
  return res.json() as Promise<EndOfLifeCycle[]>;
}

function isStillSupported(cycle: EndOfLifeCycle, today: Date): boolean {
  if (cycle.eol === false) return true;
  if (cycle.eol === true) return false;
  return new Date(cycle.eol) > today;
}

async function run() {
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];
  const floors = computeBaselineFloors();

  const browsers: BrowserSupport[] = [];

  // Firefox (stable + ESR)
  const firefoxCycles = await fetchEndOfLife("firefox");
  for (const cycle of firefoxCycles) {
    if (!isStillSupported(cycle, today)) continue;
    const isLts = cycle.lts === true || (typeof cycle.lts === "string" && cycle.lts !== "false");
    const version = cycle.cycle;
    const baselineFloor = findBaselineYear("firefox", version, floors);
    browsers.push({
      browser: isLts ? `Firefox ESR ${version}` : `Firefox ${version}`,
      version,
      eol: cycle.eol === false ? "ongoing" : String(cycle.eol),
      lts: isLts,
      baselineFloor,
    });
  }

  // Chrome (only latest stable matters — evergreen)
  const chromeCycles = await fetchEndOfLife("chrome");
  const latestChrome = chromeCycles.find((c) => isStillSupported(c, today));
  if (latestChrome) {
    browsers.push({
      browser: `Chrome ${latestChrome.cycle}`,
      version: latestChrome.cycle,
      eol: latestChrome.eol === false ? "ongoing" : String(latestChrome.eol),
      lts: false,
      baselineFloor: findBaselineYear("chrome", latestChrome.cycle, floors),
    });
  }

  // Safari — derived from macOS support
  // Apple supports Safari on the latest 3 macOS versions.
  // We map macOS version -> Safari version.
  const macosSafariMap: Record<string, string> = {
    "26": "26", // macOS 26 Tahoe
    "15": "18", // macOS 15 Sequoia
    "14": "17", // macOS 14 Sonoma
    "13": "16", // macOS 13 Ventura
    "12": "15", // macOS 12 Monterey
  };

  const macosCycles = await fetchEndOfLife("macos");
  for (const cycle of macosCycles) {
    if (!isStillSupported(cycle, today)) continue;
    const majorVersion = cycle.cycle.split(".")[0];
    const safariVersion = macosSafariMap[majorVersion];
    if (!safariVersion) continue;

    const baselineFloor = findBaselineYear("safari", safariVersion, floors);
    browsers.push({
      browser: `Safari ${safariVersion} (macOS ${cycle.cycle})`,
      version: safariVersion,
      eol: cycle.eol === false ? "ongoing" : String(cycle.eol),
      lts: false,
      baselineFloor,
    });
  }

  // Find the lowest baseline floor across all supported browsers
  const allFloors = browsers
    .map((b) => ({ year: b.baselineFloor, name: `${b.browser} (EOL: ${b.eol})` }))
    .filter((b) => b.year !== null);

  allFloors.sort((a, b) => a.year! - b.year!);

  const policyFloor =
    allFloors.length > 0
      ? { baselineYear: allFloors[0].year, boundBy: allFloors[0].name }
      : { baselineYear: null, boundBy: null };

  const report: VendorReport = {
    timestamp: new Date().toISOString(),
    date: todayStr,
    browsers,
    policyFloor,
  };

  console.log(JSON.stringify(report, null, 2));
}

run().catch((err) => {
  console.error(err.message);
  process.exitCode = 1;
});
