import React from "react";
import AsyncSelect from 'react-select/async';
import debounce from "debounce-promise";
import { Station, Location } from "../domain";
import { getLocations } from "../lib/api";

const loadOptions = async (inputValue: string): Promise<{ label: string, value: Location }[]> => {
  console.log(`Getting options for"${inputValue}"`);

  const locations = await getLocations(inputValue);

  return locations.map(location => ({ value: location, label: location.name }))
}

const debouncedLoadOptions = debounce(loadOptions, 500);

type Option = {
  value: Station
}

export interface LocationSelectProps {
  onChange: (location: Station) => void,
  label: string,
  className?: string
}

const LocationSelect = ({ onChange, label, className }: LocationSelectProps) => {
  return (
    <AsyncSelect
      className={className}
      onChange={(selected: Option) => onChange(selected.value)}
      loadOptions={debouncedLoadOptions}
      placeholder={label}
    />
  )
}

export default LocationSelect;