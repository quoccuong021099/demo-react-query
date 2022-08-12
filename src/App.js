import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import "./App.css";

// "characters": "https://rickandmortyapi.com/api/character",
// "locations": "https://rickandmortyapi.com/api/location",
// "episodes": "https://rickandmortyapi.com/api/episode"
const getListUser = async (params) => {
  const res = await axios.get(params.queryKey[0]);
  console.log("res", res);
  return res.data;
};

function App() {
  const { status, error, data } = useQuery(
    ["https://rickandmortyapi.com/api/character"],
    getListUser
  );
  console.log("status", status, error);
  return <div className="App">a</div>;
}

export default App;
