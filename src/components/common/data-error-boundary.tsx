"use client";

import { RotateCw } from "lucide-react";
import { catchError, type ErrorInfo } from "next/error";

import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";

function DataErrorFallback({ title }: { title: string }, { retry }: ErrorInfo) {
  return (
    <Empty role="alert" className="border py-16">
      <EmptyHeader>
        <EmptyTitle className="text-xl">
          <h2>{title}</h2>
        </EmptyTitle>
        <EmptyDescription>
          The Rick and Morty API didn&apos;t respond or is limiting requests. Wait a few seconds,
          then try again.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button onClick={() => retry()}>
          <RotateCw data-icon="inline-start" />
          Try again
        </Button>
      </EmptyContent>
    </Empty>
  );
}

/** Catches failed API requests in its children and offers a retry. */
export const DataErrorBoundary = catchError(DataErrorFallback);
