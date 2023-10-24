import React, {useState} from "react";
import tw from "tailwind-styled-components";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppSelector } from "@/app/GlobalRedux/store";


const InputContainer = tw.div`
  relative
  w-72
  bg-l-light-purple-background
  dark:bg-d-grey-purple-1
  dark:border-[1px]
  dark:border-d-grey-purple-border
  rounded-[10px]
`;

const StyledIcon = tw(FontAwesomeIcon)`
  absolute
  left-3
  top-1/2
  transform -translate-y-1/2
`;

const StyledInput = tw.input`
  relative
  pl-8
  py-2
  w-full
  bg-transparent
  focus:outline-none
  ::placeholder {
    text-l-dark-purple
    dark:text-white
  }
`;

const StyledList = tw.div`
  absolute
 
`;

export const SearchBar = () => {
    const [input, setInput] = useState('');
    const { coinList } = useAppSelector((state) => state.globalData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputChange = "";
    
    if (e.currentTarget) {
        inputChange = e.currentTarget.value;
    }
    
    setInput(inputChange); 
}

const filteredCoinList = coinList?.filter((coin)=> {
    coin.name.includes(input)
})


    return(
        <InputContainer>
              <StyledIcon icon={faMagnifyingGlass} />
              <StyledInput onChange={handleChange} placeholder="Search" />
              <StyledList>{input && filteredCoinList</div>
              })}</StyledList>
        </InputContainer>
    )
}
