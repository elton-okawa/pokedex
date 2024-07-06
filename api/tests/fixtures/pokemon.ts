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

export function getPokemonApiResponse() {
  return {
    id: 1,
    name: "bulbasaur",
    height: 7,
    weight: 69,
    sprites: {
      back_default:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png",
      back_female: null,
      back_shiny:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png",
      back_shiny_female: null,
      front_default:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
      front_female: null,
      front_shiny:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png",
      front_shiny_female: null,
      other: {
        "official-artwork": {
          front_default:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
          front_shiny:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/1.png",
        },
      },
    },
    stats: [
      {
        base_stat: 45,
        effort: 0,
        stat: {
          name: "hp",
          url: "https://pokeapi.co/api/v2/stat/1/",
        },
      },
      {
        base_stat: 49,
        effort: 0,
        stat: {
          name: "attack",
          url: "https://pokeapi.co/api/v2/stat/2/",
        },
      },
      {
        base_stat: 49,
        effort: 0,
        stat: {
          name: "defense",
          url: "https://pokeapi.co/api/v2/stat/3/",
        },
      },
      {
        base_stat: 65,
        effort: 1,
        stat: {
          name: "special-attack",
          url: "https://pokeapi.co/api/v2/stat/4/",
        },
      },
      {
        base_stat: 65,
        effort: 0,
        stat: {
          name: "special-defense",
          url: "https://pokeapi.co/api/v2/stat/5/",
        },
      },
      {
        base_stat: 45,
        effort: 0,
        stat: {
          name: "speed",
          url: "https://pokeapi.co/api/v2/stat/6/",
        },
      },
    ],
    types: [
      {
        slot: 1,
        type: {
          name: "grass",
          url: "https://pokeapi.co/api/v2/type/12/",
        },
      },
      {
        slot: 2,
        type: {
          name: "poison",
          url: "https://pokeapi.co/api/v2/type/4/",
        },
      },
    ],
  };
}

export function getExpectedPokemon() {
  return {
    height: 7,
    id: 1,
    name: "bulbasaur",
    sprites: {
      default: {
        back: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png",
        front:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
      },
    },
    image: {
      default:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
    },
    stats: [
      {
        base: 45,
        name: "hp",
      },
      {
        base: 49,
        name: "attack",
      },
      {
        base: 49,
        name: "defense",
      },
      {
        base: 65,
        name: "special-attack",
      },
      {
        base: 65,
        name: "special-defense",
      },
      {
        base: 45,
        name: "speed",
      },
    ],
    types: ["grass", "poison"],
    weight: 69,
  };
}
