"use client";

import * as React from "react";
import { Range } from "react-date-range";

import Calendar from "@/components/inputs/calendar";
import Button from "@/components/button";

interface ListingReservationProps {
  price: number;
  totalPrice: number;
  dateRange: Range;
  disabledDates: Date[];
  disabled?: boolean;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  totalPrice,
  dateRange,
  disabledDates,
  disabled,
  onChangeDate,
  onSubmit,
}) => {
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex items-center gap-1 p-4">
        <span className="font-semibold text-2xl">€ {price}</span>
        <span className="font-light text-neutral-600">/ night</span>
      </div>

      <hr />

      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />

      <hr />

      <div className="flex items-center justify-between p-4 font-semibold text-lg">
        <span>Total</span>
        <span>€ {totalPrice}</span>
      </div>

      <hr />

      <div className="p-4">
        <Button disabled={disabled} label="Reserve" onClick={onSubmit} />
      </div>
    </div>
  );
};

export default ListingReservation;
