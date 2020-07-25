import React from "react";
import AsyncSelect from 'react-select/async';
import debounce from "debounce-promise";
import { Location } from "../domain";
import { getLocations } from "../lib/api/api";

const loadOptions = async (inputValue: string): Promise<{ label: string, value: Location }[]> => {
  const locations = await getLocations(inputValue);

  return locations.map(location => ({ value: location, label: location.name }))
}

const debouncedLoadOptions = debounce(loadOptions, 500);

type Option = {
  value: Location
}

export interface LocationSelectProps {
  value?: Location,
  onChange: (location: Location) => void,
  label: string,
  className?: string,
}

const LocationSelect = ({ onChange, label, className, value }: LocationSelectProps) => {
  const selectedValue = value ? { value: value, label: value.name } : null;

  return (
    <AsyncSelect
      value={selectedValue}
      className={className}
      onChange={(selected: Option) => onChange(selected.value)}
      loadOptions={debouncedLoadOptions}
      placeholder={label}
    />
  )
}

export default LocationSelect;