"use client"

type Props = {
    handleDropSelection: (selection: string) => void
}

const currencyList = ["usd", "eur", "jpy"];

export const CurrencyDropdownList = ({handleDropSelection} : Props) => {

    return (
        <div>
            {currencyList.map((currency) => (
                <div key={currency}>
                    <span onClick={() => handleDropSelection(currency)}>{currency}</span>
                </div>
            ))}
        </div>
    );
};
