"use client";

import * as React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

const counterButtonStyles =
  "flex items-center justify-center w-10 h-10 rounded-full border-[1px] border-neutral-400 text-neutral-600 cursor-pointer transition hover:opacity-80";

const Counter: React.FC<CounterProps> = ({
  title,
  subtitle,
  value,
  onChange,
}) => {
  const handleIncrement = React.useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const handleDecrement = React.useCallback(() => {
    if (value === 1) {
      return;
    }

    onChange(value - 1);
  }, [onChange, value]);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <p className="font-medium">{title}</p>
        <p className="font-light text-gray-600">{subtitle}</p>
      </div>

      <div className="flex items-center gap-4">
        <button onClick={handleDecrement} className={counterButtonStyles}>
          <AiOutlineMinus />
        </button>

        <p className="font-light text-xl text-neutral-600">{value}</p>

        <button onClick={handleIncrement} className={counterButtonStyles}>
          <AiOutlinePlus />
        </button>
      </div>
    </div>
  );
};

export default Counter;
