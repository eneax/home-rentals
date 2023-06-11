"use client";

import useRentModal from "@/hooks/use-rent-modal";
import Modal from "@/components/modal/modal";

const RentModal = () => {
  const rentModal = useRentModal();

  return (
    <Modal
      title="Airbnb your home"
      actionLabel="Submit"
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={rentModal.onClose}
    />
  );
};

export default RentModal;
