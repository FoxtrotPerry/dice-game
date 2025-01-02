import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

type EditSearchParamsArgs = {
  /** Keys to delete from search params */
  del?: string[] | string;
  /**
   * Entries to add to search params **IF THEY DON'T ALREADY EXIST**
   */
  add?: Record<string, string | string[]>;
  /**
   * Entries to edit in search params **IF THEY ALREADY PRESENT**
   */
  edit?: Record<string, string | string[]>;
  /**
   * Entries to indiscriminately set in search params
   */
  set?: Record<string, string | string[]>;
};

/**
 * Useful in cases where you have multiple consecutive router
 * actions.
 */
export const useEditSearchParams = () => {
  const searchParams = useSearchParams();
  const path = usePathname();
  const router = useRouter();

  const editSearchParams = useCallback(
    ({ del, add, edit, set }: EditSearchParamsArgs) => {
      if (!del && !add && !edit && !set) return;
      const queryParams = new URLSearchParams(searchParams);
      // Deletions happen first
      if (del) {
        if (typeof del === "string") {
          queryParams.delete(del);
        } else {
          del.forEach((key) => queryParams.delete(key));
        }
      }
      // Edits happen second
      if (edit) {
        Object.entries(edit).forEach(([key, value]) => {
          if (queryParams.has(key)) {
            queryParams.set(key, value.toString());
          }
        });
      }
      // Additions are applied third
      if (add) {
        Object.entries(add).forEach(([key, value]) => {
          if (!queryParams.has(key)) {
            queryParams.set(key, value.toString());
          }
        });
      }
      // indiscriminately set values fourth
      if (set) {
        Object.entries(set).forEach(([key, value]) =>
          queryParams.set(key, value.toString()),
        );
      }
      const newUrl = `${path}?${queryParams}`;
      router.push(newUrl);
    },
    [path, router, searchParams],
  );

  return { editSearchParams };
};
