"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import tw from "tailwind-styled-components";
import { changeCurrency } from "@/app/GlobalRedux/Features/CurrencySlice";
import { AppDispatch, RootState } from "@/app/GlobalRedux/store";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "@/components/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CoinViewLogo } from "../../../public/svg";
import { NavbarCoinInfo } from "../NavbarCoinInfo/index";
import { ThemeToggle } from "../ThemeToggle/index";
import { HomePortfolioSwitch } from "../HomePortfolioSwitch";
import { CoinConverterSwitch } from "../CoinConverterSwitch/index";
import { SearchBar } from "../SearchBar";

type NavbarProps = {};

const LogoContainer = tw.div`
  flex
  items-center
  m-0
  h-1/2
`;

const MainNavbarContainer = tw.div`
  flex 
  justify-center
  items-center  
  w-full  
`;

const MainNavbarInnerContainer = tw.div`
  flex 
  justify-between
  items-center  
  w-[75vw]
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

const NavbarContainer = tw.div`
  m-0
  p-0
  w-[100vw]
  bg-l-light-grey-background
  dark:bg-d-black-purple
`;

const CoinConverterSwitchContainer = tw.div`
  flex
  justify-center  
  w-full
`;

export const Navbar: React.FC<NavbarProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currency } = useSelector((state: RootState) => state.currency);

  const handleCurrencySelection = (selection: string) => {
    dispatch(changeCurrency(selection.toLowerCase()));
  };

  return (
    <NavbarContainer>
      <MainNavbarContainer>
        <MainNavbarInnerContainer>
          <LogoContainer>
            <CoinViewLogo className="h-36 w-60" />
          </LogoContainer>
          <HomePortfolioSwitch />
          <RightNavbarContainer>
            <SearchBar />
            <RoundedDropdown
              handleSelection={handleCurrencySelection}
              currentCurrency={currency}
            />
            <ThemeToggle />
          </RightNavbarContainer>
        </MainNavbarInnerContainer>
      </MainNavbarContainer>
      <CoinConverterSwitchContainer>
        <CoinConverterSwitch />
      </CoinConverterSwitchContainer>
    </NavbarContainer>
  );
};
