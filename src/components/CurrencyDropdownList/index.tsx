"use client"

const currencyList = ["usd", "eur", "jpy"];

export const CurrencyDropdownList = ({handleDropSelection}) => {

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
