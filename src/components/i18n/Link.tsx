"use client";

/**
 * Drop-in replacement for next/link that keeps the visitor in their language:
 * "/explore" becomes "/bn/explore" on Bangla pages. External, hash and
 * object hrefs are passed through unchanged.
 */
import NextLink from "next/link";
import type { ComponentProps } from "react";
import { localizePath } from "@/i18n/config";
import { useLocale } from "@/i18n/client";

export default function Link({ href, ...rest }: ComponentProps<typeof NextLink>) {
  const locale = useLocale();
  return <NextLink href={typeof href === "string" ? localizePath(locale, href) : href} {...rest} />;
}
