"use client";

import tw from "tailwind-styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getCurrencySymbol } from "../../utils/formatting";

type Props = {
  handleDropSelection: (selection: string) => void;
};

const currencyList = ["usd", "eur", "jpy"];

const CurrencyListContainer = tw.div`
  w-20
  h-full
  rounded-[10px]
  bg-l-light-purple-background
  dark:bg-d-grey-purple-1
  text-right
  overflow-hidden
  dark:border-[1px]
  dark:border-d-grey-purple-border
`;

const CurrencyListItem = tw.div`
  cursor-pointer
  hover:bg-l-light-purple-highlight
  dark:hover:bg-d-purple-highlight
  flex
  text-center
  justify-center
  items-center
  h-6
  text-l-dark-purple-background
  dark:text-white
`;

const CurrencyButton = tw.button`

`;

const StyledIcon = tw(FontAwesomeIcon)`
  pr-2
`;

export const CurrencyDropdownList = ({ handleDropSelection }: Props) => {
  return (
    <CurrencyListContainer>
      {currencyList.map((currency) => (
        <CurrencyListItem key={currency}>
          <CurrencyButton
            onClick={() => {
              console.log("clicked");
              handleDropSelection(currency);
            }}
          >
            <StyledIcon icon={getCurrencySymbol(currency)} />
            {currency.toUpperCase()}
          </CurrencyButton>
        </CurrencyListItem>
      ))}
    </CurrencyListContainer>
  );
};
