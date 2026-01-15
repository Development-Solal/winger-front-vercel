import React from "react";
import ReactSelect, {components} from "react-select";

interface CustomSelectProps {
  options: {value: string; label: string}[];
  value: {value: string; label: string} | null;
  onChange: (selected: {value: string; label: string} | null) => void;
  placeholder?: string;
  icon?: React.ReactNode;
}

interface CustomSelectMultiProps {
  name?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectRef?: React.Ref<any>;
  options: {value: string; label: string}[];
  value: {value: string; label: string}[] | null; // Updated to handle an array of selected values for multi-select
  onChange: (selected: {value: string; label: string}[] | null) => void; // OnChange needs to handle an array
  placeholder?: string;
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

// Main CustomSelect component
const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  icon,
}) => {
  return (
    <div title={placeholder}>
      <ReactSelect
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        isClearable
        components={{SingleValue: CustomSingleValue, Placeholder: CustomPlaceholder}}
        icon={icon}
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
          indicatorSeparator: () => ({display: "none"}),
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
        }}
      />
    </div>
  );
};

const CustomSelectMulti: React.FC<CustomSelectMultiProps> = ({
  options,
  name = "",
  selectRef,
  value,
  onChange,
  placeholder = "Select an option",
  icon,
}) => {
  return (
    <div title={placeholder}>
      <ReactSelect
        name={name}
        ref={selectRef}
        isMulti={true} // Enable multi-select
        options={options}
        value={value} // Ensure value is an array of selected options
        onChange={onChange} // Pass the selected items as an array
        placeholder={placeholder}
        isClearable
        components={{SingleValue: CustomSingleValue, Placeholder: CustomPlaceholder}}
        icon={icon}
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
          indicatorSeparator: () => ({display: "none"}),
          dropdownIndicator: base => ({
            ...base,
            color: "#ce015e",
            ":hover": {color: "#ce015e"},
          }),
          option: (base, {isSelected}) => ({
            ...base,
            fontSize: "14px",
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
      />
    </div>
  );
};

export {CustomSelect, CustomSelectMulti};
