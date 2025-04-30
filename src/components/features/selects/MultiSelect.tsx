"use client";
import { useState } from "react";
import { X, ChevronDown, Search, Loader2 } from "lucide-react";
import { Checkbox } from "@/components/shared";
import type { IMultiSelect } from "@/utils/models/inputs";

export const MultiSelect = ({
  options,
  value,
  onChange,
  onClear,
  placeholder = "Select options",
  loading = false,
  single = false,
}: IMultiSelect) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const toggleDropdown = () => setIsOpen(!isOpen);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const list = options.filter((item) =>
    item.label
      .toLowerCase()
      .replace(/\s/g, "")
      .includes(searchValue.toLowerCase().replace(/\s/g, "")),
  );
  return (
    <div className="relative w-full text-text-primary">
      <div className="flex w-full items-center justify-between rounded-md border border-border p-3">
        {value.length === 0 &&
          (isOpen ? (
            <label className="relative grow">
              <Search
                className="absolute top-1/2 left-0 -translate-y-1/2"
                size={16}
              />
              <input
                type="text"
                className="w-full border-none bg-transparent pl-5 text-text-primary outline-none placeholder:text-text-secondary"
                placeholder="Search..."
                onChange={onChangeSearch}
              />
            </label>
          ) : (
            <div>{placeholder}</div>
          ))}
        {value.length > 0 && (
          <ul className="inline-flex flex-wrap gap-2 overflow-hidden p-0 text-ellipsis whitespace-nowrap select-none">
            {value.map((selectedValue) => {
              const selectedOption = options.find(
                (option) => option.value === selectedValue,
              );
              return (
                selectedOption && (
                  <li
                    className="flex items-center gap-1 rounded-md bg-foreground py-0.5 pr-1 pl-0.5"
                    key={selectedValue}
                  >
                    <p className="text-center">{selectedOption.label}</p>
                    <X
                      className="cursor-pointer"
                      size={16}
                      onClick={() => onChange(selectedValue)}
                    />
                  </li>
                )
              );
            })}
          </ul>
        )}
        {loading ? (
          <Loader2 size={28} className="animate-spin" />
        ) : (
          <div className="relative flex items-center gap-1">
            {value.length > 0 && (
              <>
                <X
                  size={28}
                  onClick={onClear}
                  className="min-w-[28px] cursor-pointer"
                />
                <span className="absolute top-1/2 left-1/2 h-full w-0.25 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-t from-background from-5% via-text-primary to-background to-95% [percentage:5%_95%]" />
              </>
            )}

            <ChevronDown
              className="min-w-[28px] cursor-pointer transition-transform"
              size={28}
              style={isOpen ? { transform: "rotate(180deg)" } : {}}
              onClick={toggleDropdown}
            />
          </div>
        )}
      </div>
      <ul
        //3 items(46px*3)+ 2 gaps(16*2)+ padding(12*2) + 2px(border) = 196
        className={`${isOpen ? "max-h-[196px] scale-y-100 overflow-y-auto opacity-100" : "max-h-0 scale-y-0 opacity-0"} absolute top-full z-2 mt-2 flex w-full flex-col gap-4 overflow-hidden overflow-x-hidden rounded border border-border bg-foreground p-3 shadow-lg transition-all [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-md [&::-webkit-scrollbar-thumb]:bg-primary`}
      >
        {list.map((option) => (
          <li
            className="hover:text-contrast hover:text-contrast cursor-pointer rounded-md px-[9px] py-[11px] transition-colors hover:bg-background"
            key={option.value}
            onClick={(e) => {
              e.preventDefault();
              if (single) {
                onClear();
                onChange(option.value);
                setIsOpen(false);
              } else
                document
                  .getElementById(`${option.label}-${option.value}`)
                  ?.click();
            }}
          >
            <Checkbox
              checked={value.includes(option.value)}
              //value.some((item) => item.value === option.value)
              label={option.label}
              id={option.value}
              name={option.label}
              disabled={option.disabled}
              onChange={() => onChange(option.value)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
