import tw from "tailwind-styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const NavBarCoinInfoContainer = tw.div`
  h-[50px]
  w-[100vw]
  p-0
  m-0
  flex
  justify-center
  space-x-4
  border-b
  border-[#353048]
  bg-l-dark-purple-background
  text-white
  dark:bg-d-dark-purple
  
 
`;

export const CoinInfo = tw.div`
  flex
  justify-center
  space-x-4
  min-w-[100px]
  max-w-[200px]
  items-center
  text-xs
`;

export const Icon = tw(FontAwesomeIcon)`
  p-2
  text-white
`;

export const Caret = tw(FontAwesomeIcon)`
  p-2
  text-green-change
`;

export const LogoContainer = tw.div`
  h-[50px]
  w-[50px]
  flex
  items-center
  p-2
`;
