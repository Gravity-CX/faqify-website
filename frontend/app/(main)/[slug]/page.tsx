import Blocks from "@/components/blocks";
import {
  fetchSanityPageBySlug,
  fetchSanityPagesStaticParams,
} from "@/sanity/lib/fetch";
import type { PAGES_SLUGS_QUERY_RESULT } from "@/sanity.types";
import { notFound } from "next/navigation";
import { generatePageMetadata } from "@/sanity/lib/metadata";

export async function generateStaticParams() {
  const pages = await fetchSanityPagesStaticParams();

  return pages.map((page: PAGES_SLUGS_QUERY_RESULT[number]) => ({
    slug: page.slug?.current,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = await fetchSanityPageBySlug({ slug: params.slug });

  if (!page) {
    notFound();
  }

  return generatePageMetadata({ page, slug: params.slug, type: "page" });
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    page?: string;
  }>;
}) {
  const params = await props.params;
  const page = await fetchSanityPageBySlug({ slug: params.slug });

  if (!page) {
    notFound();
  }

  return <Blocks blocks={page?.blocks ?? []} searchParams={props.searchParams} />;
}
