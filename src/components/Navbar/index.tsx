"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import tw from "tailwind-styled-components";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "@/components/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CoinViewLogo } from "../../../public/svg";
import { HomePortfolioSwitch } from "../HomePortfolioSwitch";
import { CoinConverterSwitch } from "../CoinConverterSwitch/index";
import { SearchBar } from "../SearchBar";
import { ThemeToggle } from "../ThemeToggle";
import { AppDispatch, RootState } from "@/app/GlobalRedux/store";

type NavbarProps = {};

type isOpenProp = {
  $isOpen: boolean;
};

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
  w-[90vw] md:w-[75vw]
`;

const RightNavbarContainer = tw.div<isOpenProp>`
  absolute top-0 left-0 
  px-8
  flex 
  items-center 
  space-x-4
  transform -translate-x-full
  transition-transform duration-300
  ${(props) =>
    props.$isOpen ? "translate-x-0" : ""} md:translate-x-0 md:relative md:flex
`;

const HideOnMenuOpen = tw.div<isOpenProp>`
  ${(props) => (props.$isOpen ? "hidden" : "flex")} md:flex
`;

const ResponsiveLogo = tw(CoinViewLogo)`
  w-40 md:w-60
  h-24 md:h-36
`;

const ResponsiveHomePortfolioSwitch = tw(HomePortfolioSwitch)`
  text-xs md:text-base
`;

const RoundedButton = tw.button`
  w-[40px]
  h-[40px]
  rounded-[10px]
  focus:outline-none
`;

const HamburgerButton = tw(RoundedButton)`
  md:hidden
  w-8
  h-8
  z-10
`;

const RoundedDropdown = tw(Dropdown)`
  w-[40px]
  h-[40px]
  rounded-[10px]
`;

const NavbarContainer = tw.div`
  m-0
  p-0
  w-full
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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <NavbarContainer>
      <MainNavbarContainer>
        <HamburgerButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <FontAwesomeIcon icon={faBars} />
        </HamburgerButton>
        <MainNavbarInnerContainer>
          <HideOnMenuOpen $isOpen={isMenuOpen}>
            <LogoContainer>
              <ResponsiveLogo />
            </LogoContainer>
            <ResponsiveHomePortfolioSwitch />
          </HideOnMenuOpen>
          <RightNavbarContainer $isOpen={isMenuOpen}>
            <SearchBar />
            <RoundedDropdown />
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
