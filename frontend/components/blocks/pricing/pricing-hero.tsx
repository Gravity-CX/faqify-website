"use client";

import { Check } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import SectionContainer from "@/components/ui/section-container";
import { PAGE_QUERY_RESULT } from "@/sanity.types";

type PricingHeroProps = Extract<
  NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number],
  { _type: "pricing-hero" }
>;

export default function PricingHero({
  padding,
  tagline,
  title,
  description,
  plans,
}: PricingHeroProps) {
  return (
    <SectionContainer padding={padding} withContainer={false}>
      <div className="bg-background px-6 lg:px-0">
        <div className="container px-0 md:px-6">
          <div className="relative overflow-hidden">
            <div className="mx-auto max-w-4xl px-6 py-12 text-center sm:px-8 sm:py-16 md:py-20">
              {tagline && (
                <p className="text-sm font-medium text-muted-foreground sm:text-base">
                  {tagline}
                </p>
              )}
              {title && (
                <h2 className="mt-4 text-4xl font-medium leading-tight tracking-tight text-balance sm:text-5xl md:text-[68px]">
                  {title}
                </h2>
              )}
              {description && (
                <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
                  {description}
                </p>
              )}
            </div>

            {/* Cards */}
            <div className="mx-auto grid max-w-6xl gap-6 px-6 pb-12 sm:px-8 md:grid-cols-2 md:gap-8 md:pb-16">
              {plans?.map((plan) => {
                const isHighlight = plan.highlight === "highlight";
                const price = plan.price;
                const perUnit = plan.perUnit;

                return (
                  <article
                    key={plan._key}
                    className={cn(
                      "rounded-[20px] border shadow-sm",
                      isHighlight
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card",
                    )}
                  >
                    <div className="grid gap-6 p-5 sm:p-6 md:p-7 lg:grid-cols-2">
                      {/* Left column: title/price/blurb */}
                      <div>
                        <h3 className="text-lg font-semibold">{plan.name}</h3>

                        {plan.blurb && (
                          <p
                            className={cn(
                              "mt-2 text-sm",
                              isHighlight
                                ? "text-primary-foreground/90"
                                : "text-muted-foreground",
                            )}
                          >
                            {plan.blurb}
                          </p>
                        )}

                        {/* Price or Let's Talk */}
                        {price ? (
                          <>
                            {(plan.discountBadge || plan.discountSuffix) && (
                              <span className="mt-4 inline-flex items-center gap-1.5">
                                {plan.discountBadge && (
                                  <Badge
                                    variant="secondary"
                                    className="bg-primary text-white"
                                  >
                                    {plan.discountBadge}
                                  </Badge>
                                )}
                                {plan.discountSuffix && (
                                  <span
                                    className={cn(
                                      "text-xs font-medium",
                                      isHighlight
                                        ? "text-primary-foreground/90"
                                        : "text-muted-foreground",
                                    )}
                                  >
                                    {plan.discountSuffix}
                                  </span>
                                )}
                              </span>
                            )}
                            <div className="mt-4 flex flex-wrap items-baseline gap-2">
                              {plan.originalPrice && (
                                <span
                                  className={cn(
                                    "text-xl font-medium line-through sm:text-2xl",
                                    isHighlight
                                      ? "text-primary-foreground/70"
                                      : "text-muted-foreground",
                                  )}
                                >
                                  {plan.originalPrice}
                                </span>
                              )}
                              <span
                                className={cn(
                                  "text-[40px] leading-none font-semibold sm:text-[44px]",
                                  isHighlight
                                    ? "text-primary-foreground"
                                    : "text-foreground",
                                )}
                              >
                                {price}
                              </span>
                            </div>
                            {perUnit && (
                              <div
                                className={cn(
                                  "mt-2 text-sm",
                                  isHighlight
                                    ? "text-primary-foreground/90"
                                    : "text-muted-foreground",
                                )}
                              >
                                {perUnit}
                              </div>
                            )}
                          </>
                        ) : (
                          <>
                            <div
                              className={cn(
                                "mt-6 text-[44px] font-medium",
                                isHighlight
                                  ? "text-primary-foreground"
                                  : "text-foreground",
                              )}
                            >
                              Let&apos;s Talk
                            </div>
                            <div
                              className={cn(
                                "mt-1 text-sm",
                                isHighlight
                                  ? "text-primary-foreground/90"
                                  : "text-muted-foreground",
                              )}
                            >
                              Contact us for details
                            </div>
                          </>
                        )}
                      </div>

                      {/* Right column: features with checkmarks */}
                      <ul className="space-y-3">
                        {plan.features?.map((f) => (
                          <li key={f} className="flex items-start gap-3">
                            <Check
                              className={cn(
                                "mt-0.5 size-4 shrink-0",
                                isHighlight
                                  ? "text-primary-foreground"
                                  : "text-foreground",
                              )}
                              strokeWidth={2.5}
                            />
                            <span
                              className={cn(
                                "text-sm sm:text-base",
                                isHighlight
                                  ? "text-primary-foreground"
                                  : "text-foreground",
                              )}
                            >
                              {f}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA spans both columns */}
                      <div className="lg:col-span-2">
                        <Button
                          asChild
                          className={cn(
                            "h-12 w-full rounded-[12px]",
                            isHighlight &&
                              "bg-primary-foreground text-primary hover:bg-primary-foreground/90",
                          )}
                          variant={isHighlight ? "secondary" : "default"}
                        >
                          <Link
                            href={plan.ctaLink?.href ?? "#"}
                            target={
                              plan.ctaLink?.target ? "_blank" : undefined
                            }
                            rel={
                              plan.ctaLink?.target ? "noopener noreferrer" : undefined
                            }
                          >
                            {plan.ctaLabel}
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="h-6 sm:h-8" />
        </div>
      </div>
    </SectionContainer>
  );
}
