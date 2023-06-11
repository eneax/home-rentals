"use client";

import Select from "react-select";

import useCountries from "@/hooks/use-countries";

export type CountrySelectValue = {
  label: string;
  value: string;
  flag: string;
  region: string;
  latlng: [number, number];
};

interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
  const { getAll } = useCountries();

  return (
    <div>
      <Select
        placeholder="Select a country"
        value={value}
        options={getAll()}
        isClearable
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel={(option) => (
          <div className="flex items-center gap-3">
            <div>{option.flag}</div>
            <div>
              <span>{option.label}</span>,{" "}
              <span className="text-neutral-500">{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "#000",
            primary25: "#ffe4e6",
          },
        })}
      />
    </div>
  );
};

export default CountrySelect;
