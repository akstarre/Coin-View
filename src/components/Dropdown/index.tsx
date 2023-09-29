"use client";

import { useState, useEffect, useRef } from "react";
import { CurrencyDropdownList } from "../CurrencyDropdownList/index";
import tw from "tailwind-styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getCurrencySymbol } from "@/utils/formatting";

type DropdownProps = {
  handleSelection: (currency: string) => void;
  currentCurrency: string;
};

const currencyList = ["USD", "EUR", "JPY"];

const DropdownContainer = tw.div`
  flex
  items-center
  justify-center
  relative
  w-20
  h-10
  rounded-[10px]
  bg-l-light-purple-background
  dark:bg-d-grey-purple-1
`;

const DropdownButton = tw.div`
  flex
  text-center
  items-center
  cursor-pointer
`;

const DropdownList = tw.div`
  absolute
  top-10
`;

const StyledIcon = tw(FontAwesomeIcon)`
pr-2
`;

export const Dropdown = ({
  handleSelection,
  currentCurrency,
}: DropdownProps) => {
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const closeDropDown = () => {
    setDropDownOpen(false);
  };

  const updateDropDown = () => {
    setDropDownOpen(!dropDownOpen);
  };

  const handleDropSelection = (selection: string) => {
    handleSelection(selection);
    closeDropDown();
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dropDownOpen && dropdownRef.current !== null) {
      dropdownRef.current.focus();
    }
  }, [dropDownOpen]);

  return (
    <DropdownContainer>
      <DropdownButton
        className="dropdownButton"
        onClick={updateDropDown}
        ref={dropdownRef}
      >
        <StyledIcon icon={getCurrencySymbol(currentCurrency)} />{" "}
        {currentCurrency.toUpperCase()}
      </DropdownButton>
      {dropDownOpen && (
        <DropdownList onBlur={closeDropDown} ref={dropdownRef}>
          <CurrencyDropdownList handleDropSelection={handleDropSelection} />
        </DropdownList>
      )}
    </DropdownContainer>
  );
};
