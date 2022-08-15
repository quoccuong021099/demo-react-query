import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";

// "characters": "https://rickandmortyapi.com/api/character",
// "locations": "https://rickandmortyapi.com/api/location",
// "episodes": "https://rickandmortyapi.com/api/episode"
const getListUser = async ({ queryKey }) => {
  const res = await axios.get(
    `https://rickandmortyapi.com/api/character?page=${queryKey[1]}`
  );
  console.log("res", res);
  return res.data;
};

const Character = () => {
  const [page, setPage] = useState(1);
  const { status, data } = useQuery(["Characters", page], getListUser, {
    keepPreviousData: true,
  });
  const listCharacters = data?.results;

  if (status === "loading") {
    return (
      <div className="loading">
        <div className="loader" />
      </div>
    );
  }

  if (status === "error") {
    return <div>Error</div>;
  }
  return (
    <div className="characters">
      {listCharacters.map((character, index) => (
        <div className="card" key={index}>
          <img src={character.image} alt="" />
          <div className="text-container">
            <h3>{character.name}</h3>
            <p className="status">
              {character.status} - {character.species}
            </p>
            <p className="title">Last seen on</p>
            <p>{character.location.name}</p>
          </div>
        </div>
      ))}
      <div>
        <button
          onClick={() => {
            setPage((prev) => prev - 1);
          }}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          onClick={() => {
            setPage((prev) => prev + 1);
          }}
          disabled={!data.info.next}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Character;
