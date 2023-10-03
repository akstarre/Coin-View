"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeCurrency } from "@/app/GlobalRedux/Features/CurrencySlice";
import { AppDispatch, RootState } from "@/app/GlobalRedux/store";
import { CoinViewLogo } from "../../../public/svg";
import { NavbarCoinInfo } from "../NavbarCoinInfo/index";
import { ThemeToggle } from "../ThemeToggle/index";
import { CoinConverterSwitch } from "../CoinConverterSwitch/index";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import tw from "tailwind-styled-components";
import { Dropdown } from "@/components/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LogoContainer = tw.div`
  flex
  items-center
  m-0
  h-1/2
`;

const MainNavbarContainer = tw.div`
  flex 
  justify-between
  items-center  
  w-full  
  p-4
  bg-white
  dark:bg-d-black-purple
`;

const RightNavbarContainer = tw.div`
  px-8
  flex 
  items-center 
  space-x-4  
`;

const RoundedButton = tw.button`
  w-[40px]
  h-[40px]
  rounded-[10px]
  focus:outline-none
`;

const RoundedDropdown = tw(Dropdown)`
  w-[40px]
  h-[40px]
  rounded-[10px]
`;

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

const NavbarContainer = tw.div`
  m-0
  p-0
  w-[100vw]
`;

export const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currency } = useSelector((state: RootState) => state.currency);

  const handleCurrencySelection = (selection: string) => {
    dispatch(changeCurrency(selection.toLowerCase()));
  };

  return (
    <NavbarContainer>
      <NavbarCoinInfo currency={currency} />
      <MainNavbarContainer>
        <LogoContainer>
          <CoinViewLogo className="h-36 w-60" />
        </LogoContainer>
        <RightNavbarContainer>
          <InputContainer>
            <StyledIcon icon={faMagnifyingGlass} />
            <StyledInput placeholder="Search" />
          </InputContainer>
          <RoundedDropdown
            handleSelection={handleCurrencySelection}
            currentCurrency={currency}
          />
          <ThemeToggle />
        </RightNavbarContainer>
      </MainNavbarContainer>
      <CoinPortfolioSwitch />
    </NavbarContainer>
  );
};
