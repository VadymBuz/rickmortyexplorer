import type { VariantProps } from "class-variance-authority";
import Link from "next/link";
import type { ComponentProps } from "react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ButtonLinkProps = ComponentProps<typeof Link> & VariantProps<typeof buttonVariants>;

/**
 * A link styled as a button. Rendering a Base UI `Button` as a link gives the
 * anchor `role="button"`, so assistive tech would announce navigation as an
 * action. This keeps it a real link.
 */
export function ButtonLink({ variant, size, className, ...props }: ButtonLinkProps) {
  return <Link className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
