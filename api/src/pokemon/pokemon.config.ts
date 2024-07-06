import { ConfigType, registerAs } from "@nestjs/config";

export const pokemonConfig = registerAs("pokemon", () => ({
  url: process.env.POKEMON_SERVICE_URL ?? "",
}));

export type PokemonConfig = ConfigType<typeof pokemonConfig>;
export const PokemonConfigKey = pokemonConfig.KEY;
