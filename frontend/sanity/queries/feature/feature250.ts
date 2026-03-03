import { groq } from "next-sanity";

// @sanity-typegen-ignore
export const feature250Query = groq`
  _type == "feature-250" => {
    _type,
    _key,
    padding,
    tag,
    title,
    blurb,
  }
`;
