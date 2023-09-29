import { useState } from "react";
import {
  SwitchContainer,
  ButtonSwitch,
  SwitchButton,
} from "../../styles/CoinPortfolioSwitchStyles/index";

export const CoinPortfolioSwitch: React.FC = () => {
  const [selected, setSelected] = useState("coins");

  const [coins, portfolio] = ["coins", "portfolio"];

  const handleCoinsSelection = () => {
    setSelected("coins");
  };

  const handlePorfolioSelection = () => {
    setSelected("portfolio");
  };
  return (
    <SwitchContainer>
      <ButtonSwitch selected={selected} />
      <SwitchButton
        selected={selected}
        buttonposition={coins}
        onClick={handleCoinsSelection}
      >
        Coins
      </SwitchButton>
      <SwitchButton
        selected={selected}
        buttonposition={portfolio}
        onClick={handlePorfolioSelection}
      >
        Portfolio
      </SwitchButton>
    </SwitchContainer>
  );
};
