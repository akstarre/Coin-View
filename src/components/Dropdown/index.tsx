"use client";

import { useState, useEffect, useRef } from "react";
import tw from "tailwind-styled-components";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getCurrencySymbol } from "@/utils/formatting";
import { changeCurrency } from "@/app/GlobalRedux/Features/CurrencySlice";
import { RootState } from "@/app/GlobalRedux/store";
import { CurrencyDropdownList } from "../CurrencyDropdownList/index";

type DropdownProps = {};

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
  dark:border-[1px]
  dark:border-d-grey-purple-border
`;

const DropdownButton = tw.button`
  flex
  text-center
  items-center
  cursor-pointer
  text-l-dark-purple-background
  dark:text-white
`;

const DropdownList = tw.div`
  absolute
  top-full
  left-1
  transition
  ease-in
  duration-200
  transform
  opacity-1
`;

const StyledIcon = tw(FontAwesomeIcon)`
  pr-2
`;

export const Dropdown = ({}: DropdownProps) => {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const dispatch = useDispatch();
  const { currency } = useSelector((state: RootState) => state.currency);

  const closedropDown = () => {
    setDropDownOpen(false);
  };

  const updateDropDown = () => {
    setDropDownOpen(!dropDownOpen);
  };

  const handleDropSelection = (selection: string) => {
    console.log(selection);
    dispatch(changeCurrency(selection));
    closedropDown();
  };

  const handleDropBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!dropdownRef.current?.contains(e.relatedTarget)) {
      closedropDown();
    }
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dropDownOpen) {
      dropdownRef.current?.focus();
    }
  }, [dropDownOpen]);

  return (
    <DropdownContainer ref={dropdownRef} onBlur={handleDropBlur}>
      <DropdownButton className="dropdownButton" onClick={updateDropDown}>
        <StyledIcon icon={getCurrencySymbol(currency)} />{" "}
        {currency.toUpperCase()}
      </DropdownButton>
      {dropDownOpen && (
        <DropdownList>
          <CurrencyDropdownList handleDropSelection={handleDropSelection} />
        </DropdownList>
      )}
    </DropdownContainer>
  );
};
