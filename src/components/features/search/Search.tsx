"use client";
import { useRef } from "react";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/shared";
import { useRouter, useSearchParams } from "next/navigation";

export const Search = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const params = useSearchParams();
  const search = params.get("search");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchValue = inputRef.current?.value;
    if (searchValue || searchValue === "") {
      const isEmpty = searchValue === "";
      const params = new URLSearchParams(window.location.search);
      if (isEmpty) {
        params.delete("search");
      } else params.set("search", searchValue);
      params.delete("page");
      router.replace(`${window.location.pathname}?${params}`, {
        scroll: false,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="group relative rounded-2xl border border-secondary transition-colors focus-within:border-secondary-accent"
    >
      <SearchIcon
        size={20}
        onClick={() => inputRef.current?.focus()}
        className="absolute top-1/2 left-2 -translate-y-1/2 cursor-pointer stroke-secondary-accent"
      />
      <Input
        defaultValue={search || ""}
        ref={inputRef}
        rounded
        placeholder="Search"
        className="w-50"
      />
    </form>
  );
};

{
  /* <input
        ref={inputRef}
        type="text"
        placeholder="Search"
        className="w-50 bg-transparent p-1 pl-8 outline-none"
      /> */
}
