"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeCurrency } from "@/app/GlobalRedux/Features/CurrencySlice";
import { AppDispatch, RootState } from "@/app/GlobalRedux/store";
import { Logoipsum } from "../../../public/svg";
import { NavbarCoinInfo } from "../NavbarCoinInfo/index";
import { ThemeToggle } from "../ThemeToggle/index";
import { CoinPortfolioSwitch } from "../CoinPortfolioSwitch";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {
  NavbarContainer,
  LogoContainer,
  MainNavbarContainer,
  RightNavbarContainer,
  RoundedButton,
  RoundedDropdown,
  InputContainer,
  StyledIcon,
  StyledInput,
} from "../../styles/NavbarStyles/index";

export const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currency } = useSelector((state: RootState) => state.currency);

  const handleCurrencySelection = (selection: string) => {
    dispatch(changeCurrency(selection));
  };

  return (
    <NavbarContainer>
      <NavbarCoinInfo currency={currency} />
      <MainNavbarContainer>
        <LogoContainer>
          <Logoipsum className="h-20 w-40" />
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
