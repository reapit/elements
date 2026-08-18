import { useState } from "react";
import type { ChangeEventHandler } from "react";

import preview from "#.storybook/preview";
import { ChipSelect } from "#src/core/chip-select";
import { isWidthAtOrAbove, isWidthBelow } from "#src/utils/breakpoints";
import { Image } from "#src/utils/image";
import { MatchMedia } from "#src/utils/match-media";
import { Video } from "#src/utils/video";

import { GalleryViewer } from "./gallery-viewer";

const EXAMPLE_VIDEO_SRC =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm";

const ITEMS = [
  {
    id: "photo-1",
    type: "photo",
    label: "Front view",
    src: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
  },
  {
    id: "photo-2",
    type: "photo",
    label: "Garden view",
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
  },
  {
    id: "photo-3",
    type: "photo",
    label: "Living room",
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  },
  { id: "video-1", type: "video", src: EXAMPLE_VIDEO_SRC },
];

function imageSrc(baseSrc: string, width: number, height: number) {
  return `${baseSrc}?w=${width}&h=${height}&fit=crop`;
}

const meta = preview.meta({
  title: "Content display/GalleryViewer",
  component: GalleryViewer,
  argTypes: {
    children: { control: false },
  },
});

export const Example = meta.story({
  args: {
    id: "gallery",
    title: "10 High Street, Great Horwood, Buckinghamshire, MK17 0QL",
  },
  parameters: {
    docs: { source: { type: "code" } },
  },
  render: function Example(args) {
    const [filter, setFilter] = useState(["all"]);
    const [value, setValue] = useState<string>(ITEMS[0].id);

    const onFilterChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      const option = event.currentTarget;
      setFilter((current) => ChipSelect.determineNextControlledState(current, option));
    };

    const showPhotos = filter.includes("all") || filter.includes("photos");
    const showVideos = filter.includes("all") || filter.includes("videos");

    const visibleItems = ITEMS.filter(
      (item) => (item.type === "photo" && showPhotos) || (item.type === "video" && showVideos),
    );

    const chipSelect = (
      <ChipSelect required size="small">
        <ChipSelect.Option checked={filter.includes("all")} onChange={onFilterChange} value="all">
          All
        </ChipSelect.Option>
        <ChipSelect.Option
          checked={filter.includes("photos")}
          onChange={onFilterChange}
          value="photos"
        >
          Photos
        </ChipSelect.Option>
        <ChipSelect.Option
          checked={filter.includes("videos")}
          onChange={onFilterChange}
          value="videos"
        >
          Videos
        </ChipSelect.Option>
      </ChipSelect>
    );

    return (
      <>
        {/* @ts-expect-error -- command and commandfor not supported by React 18 types. Need React 19 */}
        <button command="show-modal" commandfor={args.id || "gallery"}>
          Open gallery
        </button>
        <GalleryViewer {...args} id={args.id || "gallery"}>
          <MatchMedia condition={isWidthBelow("LG")}>
            <GalleryViewer.MediaListLayout>
              {chipSelect}
              <GalleryViewer.MediaList>
                {visibleItems.map((item) => (
                  <GalleryViewer.MediaListItem id={item.id} key={item.id}>
                    {item.type === "photo" ? (
                      <Image
                        alt={item.label ?? ""}
                        height="100%"
                        objectFit="cover"
                        src={imageSrc(item.src, 800, 600)}
                        width="100%"
                      />
                    ) : (
                      <Video
                        controls
                        height="100%"
                        objectFit="contain"
                        src={item.src}
                        width="100%"
                      />
                    )}
                    {item.label && <GalleryViewer.Caption>{item.label}</GalleryViewer.Caption>}
                  </GalleryViewer.MediaListItem>
                ))}
              </GalleryViewer.MediaList>
            </GalleryViewer.MediaListLayout>
          </MatchMedia>
          <MatchMedia condition={isWidthAtOrAbove("LG")}>
            <GalleryViewer.CarouselLayout
              main={
                <GalleryViewer.Carousel
                  aria-label="Property media"
                  onChange={setValue}
                  value={value}
                >
                  <GalleryViewer.CarouselButton aria-label="Previous" direction="previous" />
                  <GalleryViewer.CarouselTrack>
                    {visibleItems.map((item) => (
                      <GalleryViewer.CarouselItem id={item.id} key={item.id}>
                        {item.type === "photo" ? (
                          <Image
                            alt={item.label ?? ""}
                            height="100%"
                            objectFit="cover"
                            src={imageSrc(item.src, 800, 600)}
                            width="100%"
                          />
                        ) : (
                          <Video
                            controls
                            height="100%"
                            objectFit="contain"
                            src={item.src}
                            width="100%"
                          />
                        )}
                        {item.label && <GalleryViewer.Caption>{item.label}</GalleryViewer.Caption>}
                      </GalleryViewer.CarouselItem>
                    ))}
                  </GalleryViewer.CarouselTrack>
                  <GalleryViewer.CarouselButton aria-label="Next" direction="next" />
                </GalleryViewer.Carousel>
              }
              sidebar={
                <>
                  {chipSelect}
                  <GalleryViewer.ThumbnailList>
                    {visibleItems.map((item) => (
                      <GalleryViewer.ThumbnailButton
                        aria-label={`View ${item.label?.toLowerCase() ?? "media"}`}
                        aria-pressed={value === item.id}
                        isVideo={item.type === "video"}
                        key={item.id}
                        onClick={() => setValue(item.id)}
                        src={
                          item.type === "photo"
                            ? imageSrc(item.src, 176, 112)
                            : imageSrc(ITEMS[0].src, 176, 112)
                        }
                      />
                    ))}
                  </GalleryViewer.ThumbnailList>
                </>
              }
            />
          </MatchMedia>
        </GalleryViewer>
      </>
    );
  },
});
