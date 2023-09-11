"use client"

import {useState, useEffect, useRef} from "react"
import { CurrencyDropdownList} from "../CurrencyDropdownList/index"

const currencyList = ["usd", "eur", "jpy"]

export const Dropdown = ({ handleSelection, currentCurrency }) => {
    const [dropDownOpen, setDropDownOpen] = useState(false);
  
    const closeDropDown = () => {
      setDropDownOpen(false);
    };
  
    const updateDropDown = () => {
      setDropDownOpen(!dropDownOpen);
    };
  
    const handleDropSelection = (selection) => {
      handleSelection(selection)
      closeDropDown();
    };
  
    const dropdownRef = useRef(null);
  
    useEffect(() => {
      if (dropDownOpen) {
        dropdownRef.current.focus();
      }
    }, [dropDownOpen]);
  
  
    return (
      <div className="dropdownContainer">
        <div className="dropdownButton"
          onClick={updateDropDown}
          ref={dropdownRef}
        >
          {currentCurrency}
        </div>
          {dropDownOpen && (
            <div className="dropdownList"
              onBlur={closeDropDown}
              ref={dropdownRef}
            >
              <CurrencyDropdownList handleDropSelection={handleDropSelection} />
            </div>
          )}
      </div>
    );
  };