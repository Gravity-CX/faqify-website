import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import Icon from "@/components/icon";
import { urlFor } from "@/sanity/lib/image";
import { PAGE_QUERY_RESULT, LinkIcon } from "@/sanity.types";

type Hero28Props = Extract<
  NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number],
  { _type: "hero-28" }
>;

type LinkWithKey = LinkIcon & { _key: string };

// Position mapping for background icons
const positionMap: Record<
  string,
  { rectX: number; rectY: number; imageX: number; imageY: number }
> = {
  "top-left": { rectX: 140, rectY: 120, imageX: 160, imageY: 140 },
  "middle-left": { rectX: 60, rectY: 280, imageX: 80, imageY: 300 },
  "bottom-left": { rectX: 300, rectY: 360, imageX: 320, imageY: 380 },
  "top-right": { rectX: 1180, rectY: 40, imageX: 1200, imageY: 60 },
  "bottom-right": { rectX: 1260, rectY: 280, imageX: 1280, imageY: 300 },
};

const Hero28 = ({ title, description, links, backgroundIcons }: Hero28Props) => {
  const linksArray: LinkWithKey[] = Array.isArray(links) ? (links as LinkWithKey[]) : [];
  const iconsArray = Array.isArray(backgroundIcons) ? backgroundIcons : [];
  
  return (
    <section className="relative py-32">
      {/* Background pattern */}
      <div className="container absolute inset-x-0 top-0 hidden h-full overflow-hidden lg:block">
        <div className="flex flex-col items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 520">
            <defs>
              <radialGradient id="text-backgroud" cx="50%" cy="50%" r={0.6}>
                <stop stopColor="black" offset={0.4} />
                <stop stopColor="black" offset={1} stopOpacity={0} />
              </radialGradient>
              <linearGradient id="icon-backgroud" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="var(--color-accent)" offset={0} />
                <stop stopColor="var(--color-background)" offset={1} />
              </linearGradient>
              <mask id="mask">
                <rect
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  stroke="none"
                  fill="black"
                />
                <rect
                  x="80"
                  y="40"
                  width="1260"
                  height="380"
                  rx="140"
                  stroke="none"
                  filter="url(#blur)"
                  fill="white"
                />
                <rect
                  x="40"
                  y="-120"
                  width="1320"
                  height="600"
                  stroke="none"
                  fill="url(#text-backgroud)"
                />
              </mask>
              <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="40" />
              </filter>
            </defs>
            <path
              stroke="var(--border)"
              strokeWidth={1}
              d="M0,40H1400M0,120H1400M0,200H1400M0,280H1400M0,360H1400M0,440H1400M60,0V520M140,0V520M220,0V520M300,0V520M380,0V520M460,0V520M540,0V520M620,0V520M700,0V520M780,0V520M860,0V520M940,0V520M1020,0V520M1100,0V520M1180,0V520M1260,0V520M1340,0V520"
              mask="url(#mask)"
            />
            {iconsArray.map((icon) => {
              if (!icon.position || !icon.image || !icon.image.asset?._id) return null;
              const position = positionMap[icon.position];
              if (!position) return null;
              const imageUrl = urlFor(icon.image).url();
              if (!imageUrl) return null;
              return (
                <g key={icon._key}>
                  <rect
                    x={position.rectX}
                    y={position.rectY}
                    width={80}
                    height={80}
                    stroke="var(--border)"
                    fill="url(#icon-backgroud)"
                  />
                  <image
                    href={imageUrl}
                    x={position.imageX}
                    y={position.imageY}
                    width={40}
                    height={40}
                  />
                </g>
              );
            })}
          </svg>
        </div>
      </div>
      <div className="container relative flex flex-col items-center text-center">
        {title && (
          <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl">
            {title}
          </h1>
        )}
        {description && (
          <p className="text-muted-foreground mb-8 max-w-3xl lg:text-xl">
            {description}
          </p>
        )}
        {linksArray.length > 0 && (
          <div className="flex gap-3">
            {linksArray.map((link) => (
              <Link
                key={link._key}
                href={link.href || "#"}
                target={link.target ? "_blank" : undefined}
                rel={link.target ? "noopener" : undefined}
                className={cn(
                  buttonVariants({
                    variant: link.buttonVariant || "default",
                  })
                )}
              >
                <div className="flex items-center gap-2">
                  {link.title}
                  {link.iconVariant && link.iconVariant !== "none" && (
                    <Icon
                      iconVariant={link.iconVariant}
                      className="ml-2 h-4"
                    />
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero28;
