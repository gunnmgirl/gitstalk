import React from "react";
import { useHistory } from "react-router-dom";

function Search() {
  const [input, setInput] = React.useState("");
  const history = useHistory();
  return (
    <form>
      <input
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter Github Username"
      />
      <button onClick={() => history.push(`/${input}`)}>Search</button>
    </form>
  );
}

export default Search;
