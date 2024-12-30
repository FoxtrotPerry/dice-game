import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

export const useModal = (modalId: string) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const path = usePathname();

  const open = useMemo(() => {
    return !!searchParams.get(modalId);
  }, [modalId, searchParams]);

  const openModal = useCallback(() => {
    const queryParams = new URLSearchParams(searchParams);
    const modalParam = queryParams.get(modalId);
    if (!modalParam) {
      queryParams.append(modalId, "open");
    }
    const newUrl = `${path}?${queryParams}`;
    router.push(newUrl);
  }, [modalId, path, router, searchParams]);

  const closeModal = useCallback(() => {
    const queryParams = new URLSearchParams(searchParams);
    const modalParam = queryParams.get(modalId);
    if (modalParam) {
      queryParams.delete(modalId);
    }
    const newUrl = `${path}?${queryParams}`;
    router.push(newUrl);
  }, [modalId, path, router, searchParams]);

  return { open, openModal, closeModal };
};
