import { sanityFetch } from "@/sanity/lib/live";
import { HEADER_QUERY } from "@/sanity/queries/header";

/** Single cache tag for all Sanity data; used with revalidateTag() when content is published. */
export const SANITY_CACHE_TAG = "sanity";

type SanityFetchOptions = Parameters<typeof sanityFetch>[0];

/** Wraps sanityFetch with SANITY_CACHE_TAG for on-demand revalidation. Exported for use in sitemap etc. */
export async function fetchWithRevalidate<T>(
  options: SanityFetchOptions
): Promise<T> {
  const { data } = await sanityFetch({
    ...options,
    tags: [SANITY_CACHE_TAG],
  });
  return data as T;
}
import { FOOTER_QUERY } from "@/sanity/queries/footer";
import { BANNER_QUERY } from "@/sanity/queries/banner";
import { PAGE_QUERY, PAGES_SLUGS_QUERY } from "@/sanity/queries/page";
import { SETTINGS_QUERY } from "@/sanity/queries/settings";
import { CONTACT_QUERY } from "@/sanity/queries/contact";
import {
  POST_QUERY,
  POSTS_QUERY,
  POSTS_SLUGS_QUERY,
  POSTS_COUNT_QUERY,
} from "@/sanity/queries/post";
import { CHANGELOGS_QUERY } from "@/sanity/queries/changelog";
import { TEAM_QUERY } from "@/sanity/queries/team";
import type {
  PAGE_QUERY_RESULT,
  PAGES_SLUGS_QUERY_RESULT,
  POST_QUERY_RESULT,
  POSTS_QUERY_RESULT,
  POSTS_SLUGS_QUERY_RESULT,
  FOOTER_QUERY_RESULT,
  BANNER_QUERY_RESULT,
  SETTINGS_QUERY_RESULT,
  CONTACT_QUERY_RESULT,
  CHANGELOGS_QUERY_RESULT,
  TEAM_QUERY_RESULT,
  HEADER_QUERY_RESULT,
} from "@/sanity.types";

export const fetchSanityHeader = async (): Promise<HEADER_QUERY_RESULT> =>
  fetchWithRevalidate<HEADER_QUERY_RESULT>({ query: HEADER_QUERY });

export const fetchSanityFooter = async (): Promise<FOOTER_QUERY_RESULT> =>
  fetchWithRevalidate<FOOTER_QUERY_RESULT>({ query: FOOTER_QUERY });

export const fetchSanityBanner = async (): Promise<BANNER_QUERY_RESULT> =>
  fetchWithRevalidate<BANNER_QUERY_RESULT>({ query: BANNER_QUERY });

export const fetchSanityPageBySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<PAGE_QUERY_RESULT> =>
  fetchWithRevalidate<PAGE_QUERY_RESULT>({ query: PAGE_QUERY, params: { slug }});

export const fetchSanityPagesStaticParams =
  async (): Promise<PAGES_SLUGS_QUERY_RESULT> =>
    fetchWithRevalidate<PAGES_SLUGS_QUERY_RESULT>({
      query: PAGES_SLUGS_QUERY,
      perspective: "published",
      stega: false,
    });

export const fetchSanityPosts = async ({
  page,
  limit,
}: {
  page?: number;
  limit: number;
}): Promise<POSTS_QUERY_RESULT> => {
  const offset = page && limit ? (page - 1) * limit : 0;
  const end = offset + limit;
  return fetchWithRevalidate<POSTS_QUERY_RESULT>({
    query: POSTS_QUERY,
    params: { offset, end },
  });
};

export const fetchSanityChangelogs =
  async (): Promise<CHANGELOGS_QUERY_RESULT> =>
    fetchWithRevalidate<CHANGELOGS_QUERY_RESULT>({ query: CHANGELOGS_QUERY });

export const fetchSanityTeam = async (): Promise<TEAM_QUERY_RESULT> =>
  fetchWithRevalidate<TEAM_QUERY_RESULT>({ query: TEAM_QUERY });

export const fetchSanityPostsCount = async (): Promise<number> =>
  fetchWithRevalidate<number>({ query: POSTS_COUNT_QUERY });

export const fetchSanityPostBySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<POST_QUERY_RESULT> =>
  fetchWithRevalidate<POST_QUERY_RESULT>({ query: POST_QUERY, params: { slug }});

export const fetchSanityPostsStaticParams =
  async (): Promise<POSTS_SLUGS_QUERY_RESULT> =>
    fetchWithRevalidate<POSTS_SLUGS_QUERY_RESULT>({
      query: POSTS_SLUGS_QUERY,
      perspective: "published",
      stega: false,
    });

export const fetchSanitySettings = async (): Promise<SETTINGS_QUERY_RESULT> =>
  fetchWithRevalidate<SETTINGS_QUERY_RESULT>({ query: SETTINGS_QUERY });

export const fetchSanityContact = async (): Promise<CONTACT_QUERY_RESULT> =>
  fetchWithRevalidate<CONTACT_QUERY_RESULT>({ query: CONTACT_QUERY });

export const getOgImageUrl = ({
  type,
  slug,
}: {
  type: "post" | "page";
  slug: string;
}): string => {
  // Clean the slug by removing any path segments before the last slash (e.g. "blog/my-post" becomes "my-post")
  const cleanSlug = slug.split("/").pop() || slug;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return `${baseUrl}/api/og?type=${type}&slug=${encodeURIComponent(cleanSlug)}`;
};
