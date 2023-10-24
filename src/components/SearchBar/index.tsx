import React, { useState, useRef, useEffect } from "react";
import tw from "tailwind-styled-components";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppSelector } from "@/app/GlobalRedux/store";
import { SearchCoinList } from "../SearchCoinList";
import { CoinListData } from "@/app/GlobalRedux/Features/GlobalSlice";

const InputContainer = tw.div`
  relative
  w-72
  bg-l-light-purple-background
  dark:bg-d-grey-purple-1
  dark:border-[1px]
  dark:border-d-grey-purple-border
  rounded-[10px]
`;

const StyledIcon = tw(FontAwesomeIcon)`
  absolute
  left-3
  top-1/2
  transform -translate-y-1/2
`;

const StyledInput = tw.input`
  relative
  pl-8
  py-2
  w-full
  bg-transparent
  focus:outline-none
  ::placeholder {
    text-l-dark-purple
    dark:text-white
  }
`;

const StyledList = tw.div`
  absolute
  top-full
  left-1
  w-full
  max-h-[200px]
  overflow-y-auto
  bg-white
  shadow-md
  dark:bg-d-grey-purple-1
  dark:shadow-light
  rounded-[10px]
  transition
  ease-in
  duration-200
  transform
  opacity-1
`;

export const SearchBar = () => {
  const [input, setInput] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { coinList } = useAppSelector((state) => state.globalData);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputChange = "";

    if (e.currentTarget) {
      inputChange = e.currentTarget.value;
    }

    setInput(inputChange);
    if (inputChange.length > 0) {
      setDropdownOpen(true);
    } else {
      closedropDown();
    }
  };

  const closedropDown = () => {
    setDropdownOpen(false);
  };

  const handleDropBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!dropdownRef.current?.contains(e.relatedTarget)) {
      closedropDown();
    }
  };

  const handleSelection = (selection: string) => {
    closedropDown();
    //Fetch request will go here, this comment is intentionally left for PR.
  };

  let filteredCoinList =
    coinList?.filter((coin) =>
      coin.name.toLowerCase().includes(input.toLowerCase())
    ) || null;

  return (
    <InputContainer ref={dropdownRef} onBlur={handleDropBlur} tabIndex={0}>
      <StyledIcon icon={faMagnifyingGlass} />
      <StyledInput onChange={handleChange} placeholder="Search" />
      <StyledList>
        {dropdownOpen && (
          <SearchCoinList
            coinList={filteredCoinList}
            handleSelection={handleSelection}
          />
        )}
      </StyledList>
    </InputContainer>
  );
};
