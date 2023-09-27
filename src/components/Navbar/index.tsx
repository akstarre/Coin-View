"use client";

import { Dropdown } from "../Dropdown";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import tw from "tailwind-styled-components";
import { changeCurrency } from "@/app/GlobalRedux/Features/CurrencySlice";
import { AppDispatch, RootState } from "@/app/GlobalRedux/store";
import { NavbarCoinInfo } from "../NavbarCoinInfo/index";
import { ThemeToggle } from "../ThemeToggle/index";

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
    <NavBarContainer>
      <NavbarCoinInfo currency={currency} />
      <div className="flex justify-between">
        <div
          className="flex flex-row justify-between"
          style={{ flexBasis: "16%" }}
        >
          <div>
            <button>Coins</button>
          </div>
          <div>
            <button>Portfolio</button>
          </div>
        </div>
        <div
          className="flex flex-row justify-between"
          style={{ flexBasis: "33%" }}
        >
          <div>
            <input placeholder="Search"></input>
          </div>
          <div>
            <Dropdown
              handleSelection={handleCurrencySelection}
              currentCurrency={currency}
            />
          </div>
          <ThemeToggle />
        </div>
      </div>
    </NavBarContainer>
  );
};
