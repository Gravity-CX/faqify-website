import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { PAGE_QUERY_RESULT } from "@/sanity.types";
import VideoPlayer from "@/components/blocks/timelines/video-player";

type Block = NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number];
type Feature1 = Extract<Block, { _type: "feature-1" }>;
type FeatureImage = Extract<
  NonNullable<Feature1["columns"]>[number],
  { _type: "feature-image" }
>;

export default function FeatureImage({
  mediaType,
  image,
  video,
}: FeatureImage) {
  if (mediaType === "video" && video?.asset?.url) {
    return (
      <VideoPlayer
        src={video.asset.url}
        alt={video.alt || ""}
        showControls={video.showControls !== false}
        playbackRate={video.playbackRate ?? 1}
        autoplay={video.autoplay || false}
        loop={video.loop || false}
        muted={video.muted !== false}
        className="max-h-96 w-full rounded-md object-cover"
      />
    );
  }

  if (mediaType === "image" && image && image.asset?._id) {
    return (
      <Image
        src={urlFor(image).url()}
        alt={image.alt || ""}
        placeholder={image?.asset?.metadata?.lqip ? "blur" : undefined}
        blurDataURL={image?.asset?.metadata?.lqip || ""}
        className="max-h-96 w-full rounded-md object-cover"
        sizes="(min-width: 640px) 50vw, 100vw"
        width={image.asset?.metadata?.dimensions?.width || 800}
        height={image.asset?.metadata?.dimensions?.height || 800}
        quality={100}
      />
    );
  }

  return null;
}