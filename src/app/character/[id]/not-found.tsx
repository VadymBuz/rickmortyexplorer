import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";

export default function CharacterNotFound() {
  return (
    <Empty className="py-20">
      <EmptyHeader>
        <EmptyTitle className="display-type font-heading text-3xl font-bold">
          No character with this ID
        </EmptyTitle>
        <EmptyDescription className="text-base">
          The link may be mistyped, or the character isn&apos;t in the Rick and Morty API.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="lg" nativeButton={false} render={<Link href="/" />}>
          Browse all characters
        </Button>
      </EmptyContent>
    </Empty>
  );
}
