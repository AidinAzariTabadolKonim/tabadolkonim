// utils/option-converters.ts
import { Option } from "../data/suggestions";

// Convert string values to Option objects
export const stringsToOptions = (
  values: string[],
  allOptions: Option[]
): Option[] => {
  return values
    .map((value) => allOptions.find((option) => option.value === value))
    .filter((option): option is Option => option !== undefined);
};

// Convert Option objects to string values
export const optionsToStrings = (options: Option[]): string[] => {
  return options.map((option) => option.value);
};
