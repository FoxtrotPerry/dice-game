import { useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { useEditSearchParams } from "./use-edit-search-params";

export const useModal = (modalId: string) => {
  const searchParams = useSearchParams();

  const { editSearchParams } = useEditSearchParams();

  const open = useMemo(() => {
    const queryParams = new URLSearchParams(searchParams);
    const modalParam = queryParams.get("modal");
    if (!modalParam) return false;
    const openModals = modalParam.split(",");
    return openModals.includes(modalId);
  }, [modalId, searchParams]);

  const openModal = useCallback(() => {
    const queryParams = new URLSearchParams(searchParams);
    const modalParam = queryParams.get("modal") ?? "";
    const openModals = modalParam.split(",");
    if (!openModals.includes(modalId)) {
      const newModals = openModals.concat(modalId);
      editSearchParams({ set: { modal: newModals } });
    }
  }, [searchParams, modalId, editSearchParams]);

  const closeModal = useCallback(() => {
    const queryParams = new URLSearchParams(searchParams);
    const modalParam = queryParams.get("modal");
    if (modalParam == null) return;
    const openModals = modalParam.split(",");
    const modalIsOpen = openModals.includes(modalId);
    if (modalIsOpen) {
      const filteredModals = openModals.filter((id) => id !== modalId);
      if (filteredModals.length === 0) {
        editSearchParams({ del: "modal" });
      } else {
        editSearchParams({ set: { modal: filteredModals } });
      }
    }
  }, [searchParams, modalId, editSearchParams]);

  return { open, openModal, closeModal };
};
