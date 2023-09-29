import tw from "tailwind-styled-components";

export const SwitchContainer = tw.div`
p-8
  relative
  w-48
  h-12
  bg-white
  dark:bg-d-grey-purple-1
  rounded-[5px]
  overflow-hidden
`;

export const ButtonSwitch = tw.button<{ selected: string }>`
  absolute
  top-0
  left-0
  w-1/2
  h-full
  bg-l-light-purple-highlight
  dark:bg-d-purple-highlight
  focus:outline-none
  transition-transform
  duration-300
  ease-in-out
  rounded-[10px]
  ${(props) => props.selected === "portfolio" && "transform translate-x-full"}
`;

export const SwitchButton = tw.button<{
  buttonposition: string;
  selected: string;
}>`
  absolute
  top-0
  w-1/2
  h-full
  flex
  items-center
  justify-center
  text-l-dark-purple
  dark:text-white
  ${(props) => (props.buttonposition === "coins" ? "left-0" : "left-1/2")}
  ${(props) => props.selected === props.buttonposition && "text-white"}
`;
