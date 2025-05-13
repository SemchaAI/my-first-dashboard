"use client";
import { useEffect } from "react";

export const useScrollControl = (mobile: boolean) => {
  useEffect(() => {
    const html = document.querySelector("body");
    if (html) {
      html.style.overflow = mobile ? "hidden" : "auto";
    }
  }, [mobile]);
};
