export interface PokemonSummary {
  id: number;
  name: string;
}

export interface PokemonQuery {
  count: number;
  results: PokemonSummary[];
}
