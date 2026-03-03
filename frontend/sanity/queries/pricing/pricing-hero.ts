import { groq } from "next-sanity";
import { linkQuery } from "../shared/link";

// @sanity-typegen-ignore
export const pricingHeroQuery = groq`
  _type == "pricing-hero" => {
    _type,
    _key,
    padding,
    tagline,
    title,
    description,
    plans[]{
      _key,
      name,
      blurb,
      price,
      originalPrice,
      discountBadge,
      discountSuffix,
      perUnit,
      features,
      ctaLabel,
      ctaLink{
        ${linkQuery},
      },
      highlight,
    },
  }
`;
