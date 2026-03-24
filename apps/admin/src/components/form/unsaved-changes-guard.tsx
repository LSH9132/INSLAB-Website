"use client";

import { useEffect, useRef } from "react";

export function UnsavedChangesGuard() {
  const dirty = useRef(false);

  useEffect(() => {
    const form = document.querySelector("form");
    if (!form) return;

    const markDirty = () => {
      dirty.current = true;
    };
    const markClean = () => {
      dirty.current = false;
    };

    form.addEventListener("input", markDirty);
    form.addEventListener("submit", markClean);

    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      if (dirty.current) {
        e.preventDefault();
      }
    };
    window.addEventListener("beforeunload", onBeforeUnload);

    return () => {
      form.removeEventListener("input", markDirty);
      form.removeEventListener("submit", markClean);
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, []);

  return null;
}
