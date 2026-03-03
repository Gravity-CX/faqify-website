"use client";

import { motion, MotionValue, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import SectionContainer from "@/components/ui/section-container";
import { PAGE_QUERY_RESULT } from "@/sanity.types";
import { buttonVariants } from "@/components/ui/button";

type Integration13Props = Extract<
  NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number],
  { _type: "integration-13" }
>;

const Integration13 = ({
  padding,
  tag,
  title,
  description,
  integrations,
  button,
}: Integration13Props) => {
  return (
    <SectionContainer padding={padding} withContainer={false}>
      <section className="overflow-hidden py-32">
        <div className="container flex w-full flex-col items-center justify-center px-4">
          {tag?.text && (
            <p className="bg-muted mb-4 rounded-full px-2 py-1 text-xs uppercase">
              {tag.text}
            </p>
          )}
          {title && (
            <h2 className="relative py-2 text-center font-sans text-5xl font-semibold tracking-tighter lg:text-6xl">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-md text-muted-foreground mx-auto mt-5 max-w-xl px-5 text-center lg:text-lg">
              {description}
            </p>
          )}

          {integrations && integrations.length > 0 && (
            <div className="bg-muted rounded-4xl container relative my-20 w-fit">
              <DockIntegrations
                integrations={integrations}
                className="hidden md:flex"
              />
              <div className="flex flex-wrap items-center justify-center gap-4 py-4 md:hidden">
                {integrations.map((integration) => (
                  <Link
                    key={integration._key}
                    href={integration.href || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center transition-transform hover:scale-105"
                  >
                    {integration.image?.asset && (
                      <Image
                        src={urlFor(integration.image).url()}
                        alt={integration.title || ""}
                        className="h-16 w-16 rounded-xl object-cover"
                        width={64}
                        height={64}
                        placeholder={
                          integration.image?.asset?.metadata?.lqip &&
                          integration.image?.asset?.mimeType !== "image/svg+xml"
                            ? "blur"
                            : undefined
                        }
                        blurDataURL={integration.image?.asset?.metadata?.lqip || ""}
                      />
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {button && button.href && (
            <Link
              href={button.href}
              target={button.target ? "_blank" : undefined}
              rel={button.target ? "noopener noreferrer" : undefined}
              className={cn(
                buttonVariants({
                  variant: button.buttonVariant || "default",
                }),
                "h-10 rounded-xl"
              )}
            >
              {button.title || "Get Full Access"}
            </Link>
          )}
        </div>
      </section>
    </SectionContainer>
  );
};

const DockIntegrations = ({
  integrations,
  className,
}: {
  integrations: NonNullable<Integration13Props["integrations"]>;
  className?: string;
}) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <div
      className={cn("flex items-end gap-2 px-6 py-6", className)}
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
    >
      {integrations.map((integration) => (
        <DockIcon
          key={integration._key}
          integration={integration}
          mouseX={mouseX}
        />
      ))}
    </div>
  );
};

const DockIcon = ({
  integration,
  mouseX,
}: {
  integration: NonNullable<Integration13Props["integrations"]>[number];
  mouseX: MotionValue<number>;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const width = useSpring(
    useTransform(distance, [-100, 0, 100], [64, 85, 64]),
    {
      mass: 0.1,
      stiffness: 150,
      damping: 12,
    }
  );

  const height = useSpring(
    useTransform(distance, [-100, 0, 100], [64, 94, 64]),
    {
      mass: 0.1,
      stiffness: 150,
      damping: 12,
    }
  );

  const y = useSpring(useTransform(distance, [-150, 0, 150], [0, -12, 0]), {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  if (!integration.image?.asset) return null;

  return (
    <div
      ref={ref}
      className="relative flex h-16 w-16 flex-col items-center justify-end"
    >
      <motion.div
        style={{ width, height, y, transformOrigin: "bottom center" }}
        className="absolute bottom-0 flex items-center justify-center rounded-xl"
      >
        <Link
          href={integration.href || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="h-full w-full"
        >
          <Image
            src={urlFor(integration.image).url()}
            alt={integration.title || ""}
            className="h-full w-full rounded-xl object-cover"
            width={85}
            height={94}
            placeholder={
              integration.image?.asset?.metadata?.lqip &&
              integration.image?.asset?.mimeType !== "image/svg+xml"
                ? "blur"
                : undefined
            }
            blurDataURL={integration.image?.asset?.metadata?.lqip || ""}
          />
        </Link>
      </motion.div>
    </div>
  );
};

export default Integration13;

