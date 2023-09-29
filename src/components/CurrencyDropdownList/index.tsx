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
`;

const CurrencyListItem = tw.div`
    cursor-pointer
    hover:bg-l-light-purple-highlight
    dark:hover:bg-d-purple-highlight
`;

const CurrencySpan = tw.span`
p-4
`;

const StyledIcon = tw(FontAwesomeIcon)`

`;

export const CurrencyDropdownList = ({ handleDropSelection }: Props) => {
  return (
    <CurrencyListContainer>
      {currencyList.map((currency) => (
        <CurrencyListItem key={currency}>
          <CurrencySpan onClick={() => handleDropSelection(currency)}>
            <StyledIcon icon={getCurrencySymbol(currency)} />
            {currency.toUpperCase()}
          </CurrencySpan>
        </CurrencyListItem>
      ))}
    </CurrencyListContainer>
  );
};
