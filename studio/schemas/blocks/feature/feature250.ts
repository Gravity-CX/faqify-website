import { defineField, defineType } from "sanity";
import { Sparkles } from "lucide-react";

export default defineType({
  name: "feature-250",
  type: "object",
  title: "Feature 250",
  description:
    "Feature 250: Animated beam illustration with editable tag, title and blurb. Icons and animations are fixed.",
  icon: Sparkles,
  fields: [
    defineField({
      name: "padding",
      type: "section-padding",
    }),
    defineField({
      name: "tag",
      type: "string",
      title: "Tag",
      description: "Badge text above the title (e.g. 'The problem')",
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      description: "Main heading",
      validation: (rule) =>
        rule.required().error("Title is required before publishing"),
    }),
    defineField({
      name: "blurb",
      type: "text",
      title: "Blurb",
      description: "Optional short description below the title",
    }),
  ],
  preview: {
    select: { title: "title", tag: "tag" },
    prepare({ title, tag }) {
      return {
        title: "Feature 250",
        subtitle: title || tag || "No title",
      };
    },
  },
});
