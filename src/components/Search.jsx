import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { useState } from "react";
import InputSearch from "../ui/InputSearch";
import InputContainer from "../ui/InputSearchContainer";
// npm i react-icons

function Search() {
  const [searchTitle, setSearchTitle] = useState("");
  return (
    <InputContainer>
      <HiMiniMagnifyingGlass style={{ color: "#444444" }} />
      <InputSearch
        placeholder="Search for restaurants"
        value={searchTitle}
        onChange={(e) => setSearchTitle(e.target.value)}
      />
    </InputContainer>
  );
}

export default Search;
