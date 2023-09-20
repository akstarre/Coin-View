"use client";

import { useState, useEffect, useRef } from "react";
import { CurrencyDropdownList } from "../CurrencyDropdownList/index";

type DropdownProps = {
  handleSelection: (currency: string) => void;
  currentCurrency: string;
};

const currencyList = ["usd", "eur", "jpy"];

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
    <div className="dropdownContainer">
      <div
        className="dropdownButton"
        onClick={updateDropDown}
        ref={dropdownRef}
      >
        {currentCurrency}
      </div>
      {dropDownOpen && (
        <div className="dropdownList" onBlur={closeDropDown} ref={dropdownRef}>
          <CurrencyDropdownList handleDropSelection={handleDropSelection} />
        </div>
      )}
    </div>
  );
};
