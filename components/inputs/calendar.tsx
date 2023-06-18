"use client";

import * as React from "react";
import { DateRange, Range, RangeKeyDict } from "react-date-range";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface CalendarProps {
  value: Range;
  disabledDates?: Date[];
  onChange: (value: RangeKeyDict) => void;
}

const Calendar: React.FC<CalendarProps> = ({
  value,
  disabledDates,
  onChange,
}) => {
  return (
    <DateRange
      ranges={[value]}
      rangeColors={["#262626"]}
      disabledDates={disabledDates}
      onChange={onChange}
      date={new Date()}
      minDate={new Date()}
      direction="vertical"
      showDateDisplay={false}
    />
  );
};

export default Calendar;
