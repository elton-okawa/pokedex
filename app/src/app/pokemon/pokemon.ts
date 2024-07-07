export interface PokemonSummary {
  id: number;
  name: string;
}

export interface PokemonQuery {
  count: number;
  results: PokemonSummary[];
}

export interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  stats: {
    base: number;
    name: string;
  }[];
  types: string[];
  image: {
    default: string;
  };
}
