import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PAGE_QUERY_RESULT } from "@/sanity.types";

type Cta12Props = Extract<
  NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number],
  { _type: "cta-12" }
>;

const Cta12 = ({
  heading = "Call to Action",
  description = "Build faster with our collection of pre-built blocks. Speed up your development and ship features in record time.",
  primaryButton,
  secondaryButton,
}: Cta12Props) => {
  return (
    <section className="py-32">
      <div className="container">
        <div className="bg-accent rounded-lg p-8 md:rounded-xl lg:p-12">
          <div className="mx-auto max-w-4xl text-center">
            <h3 className="mb-4 text-3xl font-semibold md:text-5xl lg:mb-6 lg:text-6xl">
              {heading}
            </h3>
            <p className="text-muted-foreground mb-8 text-lg font-medium lg:text-xl">
              {description}
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
              {primaryButton && (
                <Button size="lg" className="w-full sm:w-auto" asChild>
                  <Link
                    href={primaryButton.href || "#"}
                    target={primaryButton.target ? "_blank" : undefined}
                    rel={primaryButton.target ? "noopener" : undefined}
                  >
                    {primaryButton.title || "Buy Now"}
                  </Link>
                </Button>
              )}
              {secondaryButton && (
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                  asChild
                >
                  <Link
                    href={secondaryButton.href || "#"}
                    target={secondaryButton.target ? "_blank" : undefined}
                    rel={secondaryButton.target ? "noopener" : undefined}
                  >
                    {secondaryButton.title || "Contact Us"}
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta12;
