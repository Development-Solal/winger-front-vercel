// CustomAsyncSelect.tsx
import React from "react";
import {AsyncPaginate} from "react-select-async-paginate";
import {components} from "react-select";

interface CustomAsyncSelectProps {
  value: {value: string; label: string} | null;
  loadOptions: any; // You can adjust this type to be more specific
  onChange: (selected: any) => void;
  placeholder: string;
  page: number;
  debounceTimeout?: number;
  icon?: React.ReactNode;
}

interface CustomAsyncSelectMultiProps {
  value: {value: string; label: string}[] | null;
  loadOptions: any; // You can adjust this type to be more specific
  onChange: (selected: any[]) => void;
  placeholder: string;
  page: number;
  debounceTimeout?: number;
  icon?: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomSingleValue = (props: any) => (
  <components.SingleValue {...props}>
    <div className="flex items-center gap-2">
      {props.selectProps.icon}
      {props.data.label}
    </div>
  </components.SingleValue>
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomPlaceholder = (props: any) => (
  <components.Placeholder {...props}>
    <div className="flex items-center gap-2">
      {props.selectProps.icon}
      {props.children}
    </div>
  </components.Placeholder>
);

const CustomAsyncSelect: React.FC<CustomAsyncSelectProps> = ({
  value,
  loadOptions,
  onChange,
  placeholder,
  page,
  debounceTimeout = 300,
  icon,
}) => {
  return (
    <div title={placeholder}>
      <AsyncPaginate
        value={value}
        loadOptions={loadOptions}
        onChange={onChange}
        placeholder={placeholder}
        additional={{page}}
        debounceTimeout={debounceTimeout}
        icon={icon}
        isClearable={true}
        styles={{
          control: (base, state) => ({
            ...base,
            borderRadius: "0px", // rounded-none
            borderWidth: "0px 0px 1px 0px", // border-b
            borderColor: state.isFocused ? "#ce015e" : "#fdd1e3", // light-pink/dark-pink logic
            boxShadow: "none", // shadow-none
            backgroundColor: "transparent", // optional for aesthetic
            ":hover": {
              borderColor: "#ce015e", // consistent hover effect
            },
          }),
          indicatorSeparator: () => ({
            display: "none",
          }),
          dropdownIndicator: base => ({
            ...base,
            color: "#ce015e",
            ":hover": {color: "#ce015e"},
          }),
          option: (base, {isSelected}) => ({
            ...base,
            fontSize: "15px",
            backgroundColor: isSelected ? "#fdd1e3" : "white",
            color: "black",
            ":hover": {
              backgroundColor: "#fdd1e3",
              color: "black",
            },
          }),
          singleValue: base => ({
            ...base,
            color: "black",
          }),
          placeholder: base => ({
            ...base,
            color: "#636569", // Tailwind's text-gray-400
            fontSize: "15px",
            fontFamily: '"Quicksand-Book", sans-serif',
          }),
        }}
        components={{
          SingleValue: CustomSingleValue, // Custom component for selected value
          Placeholder: CustomPlaceholder, // Custom component for placeholder
        }}
      />
    </div>
  );
};

const CustomAsyncSelectMulti: React.FC<CustomAsyncSelectMultiProps> = ({
  value,
  loadOptions,
  onChange,
  placeholder,
  page,
  debounceTimeout = 300,
  icon,
}) => {
  return (
    <div title={placeholder}>
      <AsyncPaginate
        isMulti={true}
        value={value}
        loadOptions={loadOptions}
        onChange={onChange}
        placeholder={placeholder}
        additional={{page: 1}}
        debounceTimeout={debounceTimeout}
        icon={icon}
        isClearable={true}
        styles={{
          control: (base, state) => ({
            ...base,
            borderRadius: "0px", // rounded-none
            borderWidth: "0px 0px 1px 0px", // border-b
            borderColor: state.isFocused ? "#ce015e" : "#fdd1e3", // light-pink/dark-pink logic
            boxShadow: "none", // shadow-none
            backgroundColor: "transparent", // optional for aesthetic
            ":hover": {
              borderColor: "#ce015e", // consistent hover effect
            },
          }),
          indicatorSeparator: () => ({
            display: "none",
          }),
          dropdownIndicator: base => ({
            ...base,
            color: "#ce015e",
            ":hover": {color: "#ce015e"},
          }),
          option: (base, {isSelected}) => ({
            ...base,
            fontSize: "15px",
            backgroundColor: isSelected ? "#fdd1e3" : "white",
            color: isSelected ? "black" : "black",
            ":hover": {
              backgroundColor: "#fdd1e3",
              color: "black",
            },
          }),
          multiValue: base => ({
            ...base,
            backgroundColor: "#ce015e", // Background color of selected items
            color: "white", // Text color inside selected items
            borderRadius: "4px", // Optional: Adjust border radius for selected items
          }),
          multiValueLabel: base => ({
            ...base,
            color: "white", // Color of the text inside the selected item
          }),
          multiValueRemove: base => ({
            ...base,
            color: "white", // Color of the "X" button inside the selected item
            ":hover": {
              backgroundColor: "transparent", // Remove background color on hover
              color: "white", // Change the "X" color when hovered
            },
          }),
          menu: base => ({
            ...base,
            zIndex: 9999, // High z-index to ensure dropdown appears on top
          }),
          menuPortal: base => ({
            ...base,
            zIndex: 9999, // Ensures the dropdown is always visible
          }),
        }}
        menuPortalTarget={document.body} // Ensures dropdown renders above all elements
        components={{
          SingleValue: CustomSingleValue, // Custom component for selected value
          Placeholder: CustomPlaceholder, // Custom component for placeholder
        }}
      />
    </div>
  );
};

export {CustomAsyncSelect, CustomAsyncSelectMulti};
