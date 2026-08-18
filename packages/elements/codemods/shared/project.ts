import { Project, QuoteKind, SourceFile } from "ts-morph";

/**
 * Creates an in-memory ts-morph project configured for JSX transforms and
 * returns the SourceFile ready for AST manipulation.
 */
export function createProjectFromSource(source: string, filePath: string): SourceFile {
  const project = new Project({
    useInMemoryFileSystem: true,
    compilerOptions: {
      jsx: 2, // JsxEmit.React
    },
    manipulationSettings: {
      quoteKind: QuoteKind.Single,
      useTrailingCommas: false,
    },
  });

  return project.createSourceFile(filePath, source);
}
