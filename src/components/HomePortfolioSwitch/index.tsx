import tw from "tailwind-styled-components";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faLayerGroup } from "@fortawesome/free-solid-svg-icons";

type TextLogoContainerProps = {
  $selected: string;
  $selection: string;
};

const SwitchContainer = tw.div`
    flex
    w-60
    h-full
    justify-between
    text-l-dark-purple-background
    text-xl
`;

const TextLogoButton = tw.div<TextLogoContainerProps>`
    w-1/2
    cursor-pointer
    ${(props) => props.$selection !== props.$selected && `opacity-50`}
`;

const StyledSpan = tw.span`
`;

export const HomePortfolioSwitch = () => {
  const [selected, setSelected] = useState("home");

  const [home, portfolio] = ["home", "portfolio"];

  const handleSelection = () => {
    if (selected === home) {
      setSelected(portfolio);
    } else {
      setSelected(home);
    }
  };

  return (
    <SwitchContainer>
      <TextLogoButton
        onClick={handleSelection}
        $selection={home}
        $selected={selected}
      >
        <FontAwesomeIcon icon={faHouse} />
        <StyledSpan>Home</StyledSpan>
      </TextLogoButton>
      <TextLogoButton
        onClick={handleSelection}
        $selection={portfolio}
        $selected={selected}
      >
        <FontAwesomeIcon icon={faLayerGroup} />
        <StyledSpan>Portfolio</StyledSpan>
      </TextLogoButton>
    </SwitchContainer>
  );
};
