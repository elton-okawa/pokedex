export function listApiResponse({ count }: { count: number } = { count: 2 }) {
  const allResults = [
    {
      name: "bulbasaur",
      url: "https://pokeapi.co/api/v2/pokemon/1/",
    },
    {
      name: "ivysaur",
      url: "https://pokeapi.co/api/v2/pokemon/2/",
    },
    {
      name: "venusaur",
      url: "https://pokeapi.co/api/v2/pokemon/3/",
    },
    {
      name: "charmander",
      url: "https://pokeapi.co/api/v2/pokemon/4/",
    },
    {
      name: "charmeleon",
      url: "https://pokeapi.co/api/v2/pokemon/5/",
    },
    {
      name: "charizard",
      url: "https://pokeapi.co/api/v2/pokemon/6/",
    },
  ];

  return {
    count: 1302,
    next: "https://pokeapi.co/api/v2/pokemon?offset=0&limit=2",
    previous: null,
    results: allResults.slice(0, count),
  };
}

export function listPokemon({ count }: { count: number }) {
  const allResults = [
    {
      id: 1,
      name: "bulbasaur",
    },
    {
      id: 2,
      name: "ivysaur",
    },
    {
      id: 3,
      name: "venusaur",
    },
    {
      id: 4,
      name: "charmander",
    },
    {
      id: 5,
      name: "charmeleon",
    },
    {
      id: 6,
      name: "charizard",
    },
  ];

  return {
    count: 1302,
    results: allResults.slice(0, count),
  };
}
