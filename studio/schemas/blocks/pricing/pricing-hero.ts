import { defineField, defineType } from "sanity";
import { DollarSign } from "lucide-react";

export default defineType({
  name: "pricing-hero",
  type: "object",
  title: "Pricing Hero",
  description:
    "Pricing section with tagline, title, and plan cards. Supports discount badge, original price, and highlight variant.",
  icon: DollarSign,
  fields: [
    defineField({
      name: "padding",
      type: "section-padding",
    }),
    defineField({
      name: "tagline",
      type: "string",
      title: "Tagline",
      description: "Small label above the main title (e.g. 'Pricing')",
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      description: "Main heading for the pricing section",
      validation: (rule) =>
        rule.required().error("A section title is required before publishing"),
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
      description: "Supporting text below the title",
    }),
    defineField({
      name: "plans",
      type: "array",
      title: "Plans",
      of: [
        {
          type: "object",
          name: "plan",
          fields: [
            defineField({
              name: "name",
              type: "string",
              title: "Plan name",
              validation: (rule) =>
                rule.required().error("Plan name is required"),
            }),
            defineField({
              name: "blurb",
              type: "text",
              title: "Blurb",
              description: "Short description below the plan name",
            }),
            defineField({
              name: "price",
              type: "string",
              title: "Price",
              description:
                "Display price (e.g. '$299'). Leave empty to show 'Let's Talk'.",
            }),
            defineField({
              name: "originalPrice",
              type: "string",
              title: "Original price",
              description: "Strikethrough price when discounted (e.g. '$499')",
            }),
            defineField({
              name: "discountBadge",
              type: "string",
              title: "Discount badge",
              description: "Badge text (e.g. 'Early access')",
            }),
            defineField({
              name: "discountSuffix",
              type: "string",
              title: "Discount suffix",
              description: "Text after the badge (e.g. 'save 40%')",
            }),
            defineField({
              name: "perUnit",
              type: "string",
              title: "Per unit",
              description: "Billing period or unit (e.g. 'per month billed yearly')",
            }),
            defineField({
              name: "features",
              type: "array",
              title: "Features",
              of: [{ type: "string" }],
            }),
            defineField({
              name: "ctaLabel",
              type: "string",
              title: "CTA label",
              description: "Button text (e.g. 'Talk to sales')",
              validation: (rule) =>
                rule.required().error("CTA label is required"),
            }),
            defineField({
              name: "ctaLink",
              type: "link",
              title: "CTA link",
            }),
            defineField({
              name: "highlight",
              type: "string",
              title: "Highlight",
              description: "Use highlighted style for this card",
              options: {
                list: [
                  { title: "Default", value: "default" },
                  { title: "Highlight", value: "highlight" },
                ],
                layout: "radio",
              },
              initialValue: "default",
            }),
          ],
          preview: {
            select: { name: "name" },
            prepare({ name }) {
              return { title: name || "Plan" };
            },
          },
        },
      ],
      validation: (rule) => rule.required().min(1).max(4),
    }),
  ],
  preview: {
    select: { title: "title", firstPlan: "plans.0.name" },
    prepare({ title, firstPlan }) {
      return {
        title: "Pricing Hero",
        subtitle: title || firstPlan || "No title",
      };
    },
  },
});
