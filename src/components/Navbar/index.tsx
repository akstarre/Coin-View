"use client";

import { Dropdown } from "../Dropdown";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeCurrency } from "@/app/GlobalRedux/Features/CurrencySlice";
import { AppDispatch, RootState } from "@/app/GlobalRedux/store";
import tw from "tailwind-styled-components";
import { Logoipsum } from "../../../public/svg";

export const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currency } = useSelector((state: RootState) => state.currency);

  const handleCurrencySelection = (selection: string) => {
    dispatch(changeCurrency(selection));
  };

  const LogoContainer = tw.div`
    h-[50px]
    w-[100px]
    <p-0>m-0</p-0>

  `;

  const MiddleNavBarContainer = tw.div`
    flex 
    justify-between
  `;

  const MiddleRightNavbarContainer = tw.div`
    flex 
    flex-row 
    justify-between
    basis-33
  `;

  const MiddleLeftNavbarContainer = tw.div`
  basis-16
  `;

  return (
    <MiddleNavBarContainer>
      <MiddleLeftNavbarContainer>
        <LogoContainer>
          <Logoipsum className="h-20 w-40" />
        </LogoContainer>
      </MiddleLeftNavbarContainer>
      <MiddleRightNavbarContainer>
        <input placeholder="Search"></input>

        <Dropdown
          handleSelection={handleCurrencySelection}
          currentCurrency={currency}
        />
        <button>DarkMode</button>
      </MiddleRightNavbarContainer>
    </MiddleNavBarContainer>
  );
};
