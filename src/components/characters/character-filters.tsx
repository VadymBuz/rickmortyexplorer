"use client";

import { LoaderCircle, Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useOptimistic, useRef, useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DEFAULT_LIST_PARAMS,
  GENDER_OPTIONS,
  SPECIES_OPTIONS,
  STATUS_OPTIONS,
  getCharacterListHref,
  hasActiveFilters,
  parseURLSearchParams,
  type CharacterListParams,
} from "@/lib/search-params";

const SEARCH_DEBOUNCE_MS = 300;

type FilterKey = "status" | "species" | "gender";

export function CharacterFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = parseURLSearchParams(searchParams);

  const [isPending, startTransition] = useTransition();
  // Shows the requested filters right away, while the new results are loading.
  const [optimisticParams, setOptimisticParams] = useOptimistic(params);
  // What the user is typing. While the field is focused it wins over the URL, so
  // slow responses can't overwrite keystrokes; on blur the URL takes over again.
  const [nameDraft, setNameDraft] = useState<string | null>(null);
  const debounceRef = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(debounceRef.current), []);

  function navigate(next: CharacterListParams, history: "push" | "replace") {
    window.clearTimeout(debounceRef.current);
    startTransition(() => {
      setOptimisticParams(next);
      router[history](getCharacterListHref(next), { scroll: false });
    });
  }

  function currentParams(): CharacterListParams {
    return { ...optimisticParams, name: (nameDraft ?? optimisticParams.name).trim() };
  }

  function handleNameChange(name: string) {
    setNameDraft(name);
    window.clearTimeout(debounceRef.current);
    if (name.trim() === optimisticParams.name) {
      return;
    }
    debounceRef.current = window.setTimeout(() => {
      navigate({ ...currentParams(), name: name.trim(), page: 1 }, "replace");
    }, SEARCH_DEBOUNCE_MS);
  }

  function submitName() {
    if (nameDraft !== null && nameDraft.trim() !== optimisticParams.name) {
      navigate({ ...currentParams(), page: 1 }, "replace");
    }
  }

  function handleFilterChange<K extends FilterKey>(key: K, value: CharacterListParams[K]) {
    navigate({ ...currentParams(), [key]: value, page: 1 }, "push");
  }

  function clearFilters() {
    setNameDraft(null);
    navigate(DEFAULT_LIST_PARAMS, "push");
  }

  const nameValue = nameDraft ?? optimisticParams.name;

  return (
    <form
      role="search"
      aria-label="Filter characters"
      aria-busy={isPending}
      className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-center"
      onSubmit={(event) => {
        event.preventDefault();
        submitName();
      }}
    >
      <div className="relative lg:max-w-sm lg:flex-1">
        {isPending ? (
          <LoaderCircle
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 animate-spin text-primary"
          />
        ) : (
          <Search
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
          />
        )}
        <Input
          type="search"
          name="name"
          value={nameValue}
          placeholder="Search by name"
          aria-label="Search characters by name"
          autoComplete="off"
          className="h-10 pl-9 text-base [&::-webkit-search-cancel-button]:hidden"
          onChange={(event) => handleNameChange(event.target.value)}
          onBlur={() => {
            submitName();
            setNameDraft(null);
          }}
        />
      </div>

      <div className="grid grid-cols-3 gap-2 lg:flex">
        <FilterSelect
          label="Status"
          anyLabel="Any status"
          options={STATUS_OPTIONS}
          value={optimisticParams.status}
          onChange={(value) => handleFilterChange("status", value)}
        />
        <FilterSelect
          label="Species"
          anyLabel="Any species"
          options={SPECIES_OPTIONS}
          value={optimisticParams.species}
          onChange={(value) => handleFilterChange("species", value)}
        />
        <FilterSelect
          label="Gender"
          anyLabel="Any gender"
          options={GENDER_OPTIONS}
          value={optimisticParams.gender}
          onChange={(value) => handleFilterChange("gender", value)}
        />
      </div>

      {hasActiveFilters({ ...optimisticParams, name: nameValue }) && (
        <Button type="button" variant="ghost" size="lg" className="self-start lg:self-auto" onClick={clearFilters}>
          <X data-icon="inline-start" />
          Clear filters
        </Button>
      )}
    </form>
  );
}

type FilterSelectProps<T extends string> = {
  label: string;
  anyLabel: string;
  options: ReadonlyArray<{ value: T; label: string }>;
  value: T | null;
  onChange: (value: T | null) => void;
};

function FilterSelect<T extends string>({
  label,
  anyLabel,
  options,
  value,
  onChange,
}: FilterSelectProps<T>) {
  return (
    <Select items={options} value={value} onValueChange={onChange}>
      <SelectTrigger
        aria-label={label}
        className="w-full min-w-0 text-base data-[size=default]:h-10 lg:w-44 lg:text-sm"
      >
        <SelectValue placeholder={label} className="truncate" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={null}>{anyLabel}</SelectItem>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function CharacterFiltersSkeleton() {
  return (
    <div aria-hidden className="mb-8 flex flex-col gap-3 lg:flex-row">
      <Skeleton className="h-10 w-full rounded-lg lg:max-w-sm" />
      <div className="grid grid-cols-3 gap-2 lg:flex">
        <Skeleton className="h-10 rounded-lg lg:w-44" />
        <Skeleton className="h-10 rounded-lg lg:w-44" />
        <Skeleton className="h-10 rounded-lg lg:w-44" />
      </div>
    </div>
  );
}
