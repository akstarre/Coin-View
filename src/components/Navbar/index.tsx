"use client";

import { Dropdown } from "../Dropdown";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import tw from "tailwind-styled-components";
import { changeCurrency } from "@/app/GlobalRedux/Features/CurrencySlice";
import { AppDispatch, RootState } from "@/app/GlobalRedux/store";
import tw from "tailwind-styled-components";
import { Logoipsum } from "../../../public/svg";
import { NavbarCoinInfo } from "../NavbarCoinInfo/index";
import { ThemeToggle } from "../ThemeToggle/index";

const LogoContainer = tw.div`
  flex
  items-center
  h-[40px]
  w-[100px]
  m-0
`;

const MiddleNavBarContainer = tw.div`
  flex 
  justify-between
  items-center  
  w-full  
  p-4   
`;

const RightNavbarContainer = tw.div`
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

export const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currency } = useSelector((state: RootState) => state.currency);

  const handleCurrencySelection = (selection: string) => {
    dispatch(changeCurrency(selection));
  };

  const NavBarContainer = tw.div`
    m-0
    p-0
    w-[100vw]
`;
  return (
    <MiddleNavBarContainer>
      <LogoContainer>
        <Logoipsum className="h-20 w-40" />
      </LogoContainer>
      <RightNavbarContainer>
        <input placeholder="Search" className="rounded p-2" />
        <RoundedDropdown
          handleSelection={handleCurrencySelection}
          currentCurrency={currency}
        />
        <RoundedButton>🌙</RoundedButton>
      </RightNavbarContainer>
    </MiddleNavBarContainer>
  );
};
