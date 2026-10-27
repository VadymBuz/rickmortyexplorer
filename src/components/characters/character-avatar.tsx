"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

type CharacterAvatarProps = {
  src: string | null;
  eager?: boolean;
  /** For the largest image on the page. */
  highPriority?: boolean;
  className?: string;
};

/**
 * A character portrait on a muted square.
 *
 * Portraits load straight from the API's CDN (`unoptimized`): they're already
 * small 300×300 JPEGs, and proxying them through the Next image optimizer
 * funnels every visitor's requests into the CDN's per-IP rate limit. If a
 * request is still throttled, the muted square stays instead of a broken image.
 */
export function CharacterAvatar({
  src,
  eager = false,
  highPriority = false,
  className,
}: CharacterAvatarProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={cn("relative aspect-square overflow-hidden bg-muted", className)}>
      {src && !failed && (
        <Image
          src={src}
          alt=""
          fill
          unoptimized
          loading={eager ? "eager" : "lazy"}
          fetchPriority={highPriority ? "high" : undefined}
          className="object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
