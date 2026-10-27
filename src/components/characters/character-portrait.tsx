"use client";

import { useParams } from "next/navigation";
import { ViewTransition } from "react";

import { CharacterAvatar } from "@/components/characters/character-avatar";
import { Portal } from "@/components/common/portal";
import { Skeleton } from "@/components/ui/skeleton";
import { getAvatarTransitionName, getAvatarUrl } from "@/lib/avatar";

const frameClassName = "relative isolate mx-auto w-full max-w-60 md:max-w-none";

/**
 * The detail page portrait. It only needs the id from the URL, so on a client
 * navigation it renders in the same commit as the click, and the card's
 * portrait morphs into it while the rest of the profile is still loading.
 */
export function CharacterPortrait() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className={frameClassName}>
      <Portal className="absolute top-1/2 left-1/2 -z-10 size-[165%] -translate-x-1/2 -translate-y-1/2" />
      <ViewTransition name={getAvatarTransitionName(id)} share="morph" default="none">
        <CharacterAvatar
          src={getAvatarUrl(id)}
          sizes="(min-width: 768px) 22rem, 15rem"
          eager
          className="rounded-3xl ring-4 ring-background/70"
        />
      </ViewTransition>
    </div>
  );
}

export function CharacterPortraitSkeleton() {
  return (
    <div className={frameClassName}>
      <Skeleton className="aspect-square rounded-3xl" />
    </div>
  );
}
