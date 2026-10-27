import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 items-center px-4 pb-20 sm:px-6 lg:px-8">
      <Empty className="py-24">
        <EmptyHeader>
          <EmptyTitle className="display-type font-heading text-4xl font-bold">
            Lost between dimensions
          </EmptyTitle>
          <EmptyDescription className="text-base">
            There&apos;s nothing at this address. It may have been mistyped.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button size="lg" nativeButton={false} render={<Link href="/" />}>
            Browse all characters
          </Button>
        </EmptyContent>
      </Empty>
    </main>
  );
}
