import { cva, type VariantProps } from "class-variance-authority";

export const editorialButton = cva(
  "group inline-flex items-center justify-center gap-2 rounded-full font-inter transition-colors disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        solid: "bg-espresso text-cream hover:bg-clay",
        outline:
          "border border-espresso/25 text-espresso hover:border-clay hover:text-clay",
      },
      size: {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-sm",
        lg: "px-7 py-3.5 text-base",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "md",
    },
  }
);

export type EditorialButtonVariants = VariantProps<typeof editorialButton>;
