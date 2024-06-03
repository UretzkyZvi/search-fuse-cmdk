"use client";
import { Search as SearchIcon, User } from "lucide-react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Suspense, useEffect, useState } from "react";
import { Button } from "./button";
import useSearch from "@/hooks/useSearch";
import { CommandLoading } from "cmdk";
import Highlighter from "react-highlight-words";

export function Search() {
  const [open, setOpen] = useState(false);
  const [modifierKey, setModifierKey] = useState<string>();
  const [searchQuery, setSearchQuery] = useState("");
  const { results, loading } = useSearch(searchQuery);
  const [selected, setSelected] = useState<string | null>(null);
  useEffect(() => {
    setModifierKey(
      /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform) ? "⌘" : "Ctrl ",
    );
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleCommandClick = (author: string) => {
    setOpen(false);
    setSelected(author);
    setSearchQuery("");
  };

  function HighlightQuery({ text, query }: { text: string; query: string }) {
    return (
      <Highlighter
        highlightClassName="underline bg-transparent text-emerald-500"
        searchWords={[query]}
        autoEscape={true}
        textToHighlight={text}
      />
    );
  }
  return (
    <div className=" lg:block lg:max-w-md lg:flex-auto">
      <Button
        onClick={() => setOpen(true)}
        className="ui-not-focus-visible:outline-none  h-8 w-full items-center gap-2 rounded-full bg-white pl-2 pr-3 text-sm text-zinc-500 ring-1 ring-zinc-900/10 transition hover:ring-zinc-900/20 dark:bg-white/5 dark:text-zinc-400 dark:ring-inset dark:ring-white/10 dark:hover:ring-white/20 lg:flex"
      >
        {selected ? (
          <div className="flex items-center gap-2">
            <User size={16} />
            <span>{selected}</span>
          </div>
        ) : (
          <>
            <SearchIcon className="h-5 w-5 stroke-current" />
            Search...
          </>
        )}

        <kbd className="text-2xs ml-auto text-zinc-400 dark:text-zinc-500">
          <kbd className="font-sans">{modifierKey}</kbd>
          <kbd className="font-sans">J</kbd>
        </kbd>
      </Button>
      <Suspense fallback={null}>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput
            placeholder="Type a command or search..."
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            {loading && <CommandLoading>Fetching…</CommandLoading>}
            {results.length === 0 && (
              <CommandEmpty>No results found.</CommandEmpty>
            )}

            {results.map((result) => (
              <CommandItem
                key={result.refIndex}
                onSelect={(value) => {
                  handleCommandClick(value);
                }}
                value={result.item.title}
              >
                <div className="flex flex-col space-y-2">
                  <HighlightQuery
                    text={result.item.title}
                    query={searchQuery}
                  />
                  <HighlightQuery
                    text={result.item.director}
                    query={searchQuery}
                  />
                </div>
              </CommandItem>
            ))}
          </CommandList>
        </CommandDialog>
      </Suspense>
    </div>
  );
}
