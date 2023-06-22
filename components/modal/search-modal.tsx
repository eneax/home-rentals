"use client";

import * as React from "react";

import useSearchModal from "@/hooks/use-search-modal";

import Modal from "./modal";

const SearchModal = () => {
  const searchModal = useSearchModal();

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={searchModal.onOpen}
      title="Filters"
      actionLabel="Search"
    />
  );
};

export default SearchModal;
