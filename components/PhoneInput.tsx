import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Command } from "cmdk";
import RPNInput, {
  Country,
  getCountryCallingCode,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Check, ChevronsUpDown } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

// Helper components for the Popover & Command (mimicking shadcn structure to avoid full setup)
const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={`z-50 w-72 rounded-md border bg-white text-black shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ${className || ""}`}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

type PhoneInputProps = Omit<
  React.ComponentProps<"input">,
  "onChange" | "value"
> & {
  value?: string;
  onChange?: (value: string | undefined) => void;
  defaultCountry?: Country;
};

export const PhoneInput = React.forwardRef<
  React.ElementRef<typeof RPNInput>,
  PhoneInputProps
>(({ className, onChange, ...props }, ref) => {
  return (
    <RPNInput
      ref={ref}
      className="flex w-full overflow-hidden PhoneInputCustomRoot"
      flagComponent={FlagComponent}
      countrySelectComponent={CountrySelect}
      inputComponent={InputComponent}
      /**
       * Handles the onChange event.
       * react-phone-number-input might trigger the onChange event as undefined
       * when a valid phone number is not entered. To prevent this,
       * the value is coerced to an empty string.
       */
      onChange={(value) => onChange?.(value || "")}
      international
      withCountryCallingCode
      {...props}
    />
  );
});
PhoneInput.displayName = "PhoneInput";

const InputComponent = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, ...props }, ref) => (
  <input
    className="flex-1 w-full bg-transparent border-b border-gray-300 py-3 focus:border-black focus:outline-none transition-colors rounded-none placeholder:text-gray-400"
    {...props}
    ref={ref}
  />
));
InputComponent.displayName = "InputComponent";

type CountrySelectOption = { label: string; value: Country };
type CountrySelectProps = {
  disabled?: boolean;
  value: Country;
  onChange: (value: Country) => void;
  options: CountrySelectOption[];
};

const CountrySelect = ({
  disabled,
  value,
  onChange,
  options,
}: CountrySelectProps) => {
  const handleSelect = React.useCallback(
    (country: Country) => {
      onChange(country);
    },
    [onChange],
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className="flex gap-2 items-center border-b border-gray-300 py-3 pr-2 mr-3 focus-visible:outline-none hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <FlagComponent country={value} countryName={value} />
          <ChevronsUpDown size={14} className="text-gray-500" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command className="flex h-full w-full flex-col overflow-hidden bg-white text-black">
          <Command.Input
            placeholder="Search country..."
            className="w-full border-b border-gray-200 px-4 py-3 outline-none text-sm bg-transparent"
          />
          <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-1 scrollbar-thin scrollbar-thumb-gray-200">
            <Command.Empty className="py-6 text-center text-sm text-gray-500">
              No country found.
            </Command.Empty>
            <Command.Group>
              {options
                .filter((x) => x.value)
                .map((option) => (
                  <Command.Item
                    key={option.value}
                    value={option.label}
                    onSelect={() => handleSelect(option.value)}
                    className="flex cursor-pointer items-center justify-between gap-2 rounded-sm px-3 py-2 text-sm hover:bg-gray-100 aria-selected:bg-gray-100 transition-colors"
                  >
                    <div className="flex flex-1 items-center gap-2">
                      <FlagComponent
                        country={option.value}
                        countryName={option.value}
                      />
                      <span className="flex-1 text-sm truncate">
                        {option.label}
                      </span>
                      <span className="text-gray-500 text-xs font-mono">
                        +{getCountryCallingCode(option.value)}
                      </span>
                    </div>
                    {option.value === value && (
                      <Check size={16} className="text-black" />
                    )}
                  </Command.Item>
                ))}
            </Command.Group>
          </Command.List>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const FlagComponent = ({
  country,
  countryName,
}: {
  country: Country;
  countryName: string;
}) => {
  if (!country) return <div className="w-6 h-4 bg-gray-200 rounded-sm" />;
  return (
    <span className="bg-gray-100 flex h-4 w-6 overflow-hidden rounded-sm">
      <img
        src={`https://flagcdn.com/w40/${country.toLowerCase()}.png`}
        srcSet={`https://flagcdn.com/w80/${country.toLowerCase()}.png 2x`}
        width="24"
        height="16"
        alt={countryName}
        className="object-cover"
      />
    </span>
  );
};
