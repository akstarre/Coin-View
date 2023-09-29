import tw from "tailwind-styled-components";
import { Dropdown } from "@/components/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export const LogoContainer = tw.div`
  flex
  items-center
  h-[40px]
  w-[100px]
  m-0
`;

export const MainNavbarContainer = tw.div`
  flex 
  justify-between
  items-center  
  w-full  
  p-4
  bg-white
  dark:bg-d-black-purple
`;

export const RightNavbarContainer = tw.div`
  px-8
  flex 
  items-center 
  space-x-4  
`;

export const RoundedButton = tw.button`
  w-[40px]
  h-[40px]
  rounded-[10px]
  focus:outline-none
`;

export const RoundedDropdown = tw(Dropdown)`
  w-[40px]
  h-[40px]
  rounded-[10px]
`;

export const InputContainer = tw.div`
  relative
  bg-l-light-purple-background
  dark:bg-d-grey-purple-1
  rounded
`;

export const StyledIcon = tw(FontAwesomeIcon)`
  absolute
  left-3
  top-1/2
  transform -translate-y-1/2
`;

export const StyledInput = tw.input`
  pl-8
  w-full
  bg-transparent
  ::placeholder {
    text-l-dark-purple
    dark:text-white
  }
`;

export const NavbarContainer = tw.div`
  m-0
  p-0
  w-[100vw]
`;
