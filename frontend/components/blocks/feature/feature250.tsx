"use client";

import { BookOpenText } from "lucide-react";
import { motion } from "motion/react";
import type { RefObject } from "react";
import React, { useRef } from "react";
import { useEffect, useId, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import SectionContainer from "@/components/ui/section-container";
import type { PAGE_QUERY_RESULT } from "@/sanity.types";

type Block = NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number];
type Feature250Props = Extract<Block, { _type: "feature-250" }>;

const REVERSE = false;
const DURATION = 4;

function AnimatedBeamIllustration() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);
  return (
    <div
      className="relative flex w-full items-center justify-center overflow-hidden p-10"
      ref={containerRef}
    >
      <div className="flex w-full flex-col items-center justify-between gap-10 lg:flex-row">
        <div className="relative z-10 flex h-100 w-full items-center justify-center rounded-3xl lg:w-0">
          <div
            ref={div1Ref}
            className="absolute left-0 top-40 z-10 flex size-18 -translate-y-1/2 items-center justify-center rounded-full bg-background p-1 lg:left-0 lg:top-1/2"
          >
            <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-background p-[5px]">
              <div className="flex size-full items-center justify-center rounded-md border border-border bg-muted">
                <img
                  src="https://iconape.com/wp-content/png_logo_vector/intercom.png"
                  alt="Intercom"
                  width={16}
                  height={16}
                />
              </div>
            </div>
          </div>
          <div
            ref={div2Ref}
            className="absolute right-0 top-40 z-10 flex size-18 -translate-y-1/2 items-center justify-center rounded-full bg-background p-1 lg:left-20 lg:top-20"
          >
            <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-background p-[5px]">
              <div className="flex size-full items-center justify-center rounded-md border border-border bg-muted">
                <img
                  src="https://merge-api-public.s3.amazonaws.com/media/PlatformSalesforce.png"
                  alt="Salesforce"
                  width={16}
                  height={16}
                />
              </div>
            </div>
          </div>
          <div
            ref={div3Ref}
            className="absolute bottom-0 left-6 z-10 flex size-18 -translate-y-1/2 items-center justify-center rounded-full bg-background p-1 lg:bottom-2 lg:left-20"
          >
            <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-background p-[5px]">
              <div className="flex size-full items-center justify-center rounded-md border border-border bg-muted">
                <img
                  src="https://merge-api-public.s3.amazonaws.com/media/Hubspot_square.png"
                  alt="HubSpot"
                  width={16}
                  height={16}
                />
              </div>
            </div>
          </div>
          <div
            ref={div4Ref}
            className="absolute bottom-0 right-6 z-10 flex size-18 -translate-y-1/2 items-center justify-center rounded-full bg-background p-1 lg:left-50 lg:top-0"
          >
            <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-background p-[5px]">
              <div className="flex size-full items-center justify-center rounded-md border border-border bg-muted">
                <img
                  src="https://merge-api-public.s3.amazonaws.com/media/Jira_Square.png"
                  alt="Jira"
                  width={16}
                  height={16}
                />
              </div>
            </div>
          </div>
          <div
            ref={div5Ref}
            className="absolute top-20 z-10 flex size-18 -translate-y-1/2 items-center justify-center rounded-full bg-background p-1 lg:left-50 lg:top-100"
          >
            <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-background p-[5px]">
              <div className="flex size-full items-center justify-center rounded-md border border-border bg-muted">
                <img
                  src="https://merge-api-public.s3.amazonaws.com/media/PlatformZendesk_9qMuXiF.png"
                  alt="Zendesk"
                  width={16}
                  height={16}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          ref={div6Ref}
          className="z-10 flex size-32 items-center justify-center rounded-3xl border bg-muted lg:size-42"
        >
          <img
            src="/favicon/favicon.svg"
            className="size-14 dark:invert lg:size-18"
            alt=""
          />
        </div>
        <div
          ref={div7Ref}
          className="z-10 mt-40 flex size-15 items-center justify-center rounded-xl border bg-muted lg:mt-0"
        >
          <BookOpenText />
        </div>
      </div>

      <div className="block lg:hidden">
        <AnimatedBeam
          duration={DURATION}
          containerRef={containerRef}
          fromRef={div3Ref}
          toRef={div6Ref}
          reverse={REVERSE}
        />
        <AnimatedBeam
          duration={DURATION}
          endYOffset={-60}
          endXOffset={-10}
          curvature={10}
          containerRef={containerRef}
          fromRef={div1Ref}
          toRef={div6Ref}
          reverse={REVERSE}
        />
        <AnimatedBeam
          duration={DURATION}
          containerRef={containerRef}
          fromRef={div5Ref}
          toRef={div6Ref}
          direction="vertical"
          reverse={REVERSE}
        />
        <AnimatedBeam
          duration={DURATION}
          endYOffset={-60}
          endXOffset={10}
          curvature={10}
          containerRef={containerRef}
          fromRef={div2Ref}
          toRef={div6Ref}
          reverse={!REVERSE}
        />
        <AnimatedBeam
          duration={DURATION}
          containerRef={containerRef}
          fromRef={div4Ref}
          toRef={div6Ref}
          reverse={!REVERSE}
        />
        <AnimatedBeam
          duration={DURATION}
          containerRef={containerRef}
          fromRef={div6Ref}
          toRef={div7Ref}
          direction="vertical"
          reverse={REVERSE}
        />
      </div>

      <div className="hidden lg:block">
        <AnimatedBeam
          duration={DURATION}
          containerRef={containerRef}
          fromRef={div1Ref}
          toRef={div6Ref}
          reverse={REVERSE}
        />
        <AnimatedBeam
          endYOffset={-30}
          endXOffset={60}
          duration={DURATION}
          curvature={-140}
          containerRef={containerRef}
          fromRef={div2Ref}
          toRef={div6Ref}
          reverse={REVERSE}
        />
        <AnimatedBeam
          duration={DURATION}
          endYOffset={30}
          curvature={140}
          containerRef={containerRef}
          fromRef={div3Ref}
          toRef={div6Ref}
          reverse={REVERSE}
        />
        <AnimatedBeam
          duration={DURATION}
          endYOffset={-30}
          endXOffset={-60}
          curvature={-180}
          containerRef={containerRef}
          fromRef={div4Ref}
          toRef={div6Ref}
          reverse={REVERSE}
        />
        <AnimatedBeam
          duration={DURATION}
          endXOffset={-60}
          endYOffset={30}
          curvature={180}
          containerRef={containerRef}
          fromRef={div5Ref}
          toRef={div6Ref}
          reverse={REVERSE}
        />
        <AnimatedBeam
          duration={DURATION}
          containerRef={containerRef}
          fromRef={div6Ref}
          toRef={div7Ref}
          reverse={REVERSE}
        />
      </div>
    </div>
  );
}

export interface AnimatedBeamProps {
  className?: string;
  containerRef: RefObject<HTMLElement | null>;
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  curvature?: number;
  reverse?: boolean;
  direction?: "horizontal" | "vertical";
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  delay?: number;
  duration?: number;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
}

const AnimatedBeam: React.FC<AnimatedBeamProps> = ({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  direction = "horizontal",
  duration = Math.random() * 3 + 4,
  delay = 0,
  pathColor = "gray",
  pathWidth = 2,
  pathOpacity = 0.2,
  gradientStartColor = "#ffaa40",
  gradientStopColor = "#9c40ff",
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}) => {
  const id = useId();
  const [pathD, setPathD] = useState("");
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

  const gradientCoordinates =
    direction === "vertical"
      ? reverse
        ? {
            x1: ["0%", "0%"] as const,
            x2: ["0%", "0%"] as const,
            y1: ["90%", "-10%"] as const,
            y2: ["100%", "0%"] as const,
          }
        : {
            x1: ["0%", "0%"] as const,
            x2: ["0%", "0%"] as const,
            y1: ["10%", "110%"] as const,
            y2: ["0%", "100%"] as const,
          }
      : reverse
        ? {
            x1: ["90%", "-10%"] as const,
            x2: ["100%", "0%"] as const,
            y1: ["0%", "0%"] as const,
            y2: ["0%", "0%"] as const,
          }
        : {
            x1: ["10%", "110%"] as const,
            x2: ["0%", "100%"] as const,
            y1: ["0%", "0%"] as const,
            y2: ["0%", "0%"] as const,
          };

  useEffect(() => {
    const updatePath = () => {
      if (containerRef.current && fromRef.current && toRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const rectA = fromRef.current.getBoundingClientRect();
        const rectB = toRef.current.getBoundingClientRect();

        const svgWidth = containerRect.width;
        const svgHeight = containerRect.height;
        setSvgDimensions({ width: svgWidth, height: svgHeight });

        const startX =
          rectA.left - containerRect.left + rectA.width / 2 + startXOffset;
        const startY =
          rectA.top - containerRect.top + rectA.height / 2 + startYOffset;
        const endX =
          rectB.left - containerRect.left + rectB.width / 2 + endXOffset;
        const endY =
          rectB.top - containerRect.top + rectB.height / 2 + endYOffset;

        let d: string;
        if (direction === "vertical") {
          const controlX = startX - curvature;
          d = `M ${startX},${startY} Q ${controlX},${
            (startY + endY) / 2
          } ${endX},${endY}`;
        } else {
          const controlY = startY - curvature;
          d = `M ${startX},${startY} Q ${
            (startX + endX) / 2
          },${controlY} ${endX},${endY}`;
        }
        setPathD(d);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      updatePath();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    updatePath();

    return () => {
      resizeObserver.disconnect();
    };
  }, [
    containerRef,
    fromRef,
    toRef,
    curvature,
    startXOffset,
    startYOffset,
    endXOffset,
    endYOffset,
    direction,
  ]);

  return (
    <svg
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "pointer-events-none absolute left-0 top-0 transform-gpu stroke-2",
        className,
      )}
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
    >
      <path
        d={pathD}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
      />
      <path
        d={pathD}
        strokeWidth={pathWidth}
        stroke={`url(#${id})`}
        strokeOpacity="1"
        strokeLinecap="round"
      />
      <defs>
        <motion.linearGradient
          className="transform-gpu"
          id={id}
          gradientUnits="userSpaceOnUse"
          initial={{
            x1: "0%",
            x2: "0%",
            y1: "0%",
            y2: "0%",
          }}
          animate={{
            x1: gradientCoordinates.x1,
            x2: gradientCoordinates.x2,
            y1: gradientCoordinates.y1,
            y2: gradientCoordinates.y2,
          }}
          transition={{
            delay,
            duration,
            ease: [0.16, 1, 0.3, 1],
            repeat: Infinity,
            repeatDelay: 0,
          }}
        >
          <stop stopColor={gradientStartColor} stopOpacity="0"></stop>
          <stop stopColor={gradientStartColor}></stop>
          <stop offset="32.5%" stopColor={gradientStopColor}></stop>
          <stop
            offset="100%"
            stopColor={gradientStopColor}
            stopOpacity="0"
          ></stop>
        </motion.linearGradient>
      </defs>
    </svg>
  );
};

export default function Feature250({
  padding,
  tag,
  title,
  blurb,
}: Feature250Props) {
  return (
    <SectionContainer padding={padding}>
      <section className="py-32">
        <div className="container">
          {tag && (
            <p className="mx-auto mb-4 max-w-sm text-center text-muted-foreground md:text-xl">
              <Badge>{tag}</Badge>
            </p>
          )}
          {title && (
            <h2 className="mx-auto mb-12 max-w-3xl text-center text-4xl font-medium tracking-tighter">
              {title}
            </h2>
          )}
          {blurb && (
            <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
              {blurb}
            </p>
          )}
          <AnimatedBeamIllustration />
        </div>
      </section>
    </SectionContainer>
  );
}
