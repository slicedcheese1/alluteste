import { debounce } from "@mui/material/utils";
import { SyntheticEvent, useEffect, useMemo, useState } from "react";
import { CustomAutocomplete, CustomTextField } from "./styles";

export interface OptionType {
  id: string;
  label: string;
}

export interface AutocompleteProps<T extends OptionType> {
  label: string;
  onCallback: (input: string, page?: number) => Promise<T[]>;
  size?: "small" | "medium";
  debounceWait?: number;
  pageable?: boolean;
  error?: string;
  noOptionsText?: string;
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
  disabled?: boolean;
  required?: boolean;
}

export function Autocomplete<T extends OptionType>({
  label,
  onCallback,
  size,
  debounceWait = 300,
  pageable = false,
  error,
  noOptionsText = "Sem resultados",
  defaultValue,
  onChange,
  value,
  disabled,
  required,
}: AutocompleteProps<T>) {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<readonly T[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);

  const fetchNewPage = useMemo(() => debounce(() => setPage(prevPage => prevPage + 1), debounceWait), []);

  const handleScroll = ({ target }: React.UIEvent<HTMLUListElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = target as HTMLUListElement;

    const isScrollDown = () => scrollTop + clientHeight >= scrollHeight * 0.95;

    if (pageable && isScrollDown() && !isLastPage) {
      fetchNewPage();
    }
  };

  const fetchData = useMemo(
    () =>
      debounce(async (input, page) => {
        const results = await onCallback(input, page);
        setOptions(prevOptions => (page === 1 ? results : [...prevOptions, ...results]));
        setIsLastPage(!results.length);
      }, debounceWait),
    [],
  );

  useEffect(() => {
    setPage(1);
    setOptions([]);
    setIsLastPage(false);
  }, [inputValue]);

  useEffect(() => {
    if (inputValue.trim().length) {
      fetchData(inputValue, page);
    }
  }, [inputValue, page]);

  return (
    <CustomAutocomplete
      fullWidth
      size={size}
      value={value}
      options={options}
      defaultValue={defaultValue}
      clearOnBlur={false}
      isOptionEqualToValue={(option: unknown, currentValue: unknown) => (option as T).id === (currentValue as T).id}
      filterOptions={option => option}
      noOptionsText={noOptionsText}
      disablePortal
      onChange={(event: SyntheticEvent<Element, Event>, newValue: unknown) => {
        onChange?.(newValue as T);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      disabled={disabled}
      inputValue={inputValue}
      ListboxProps={{ onScroll: handleScroll }}
      renderInput={params => (
        <CustomTextField required={required} {...params} label={label} error={!error === false} helperText={error} />
      )}
    />
  );
}
