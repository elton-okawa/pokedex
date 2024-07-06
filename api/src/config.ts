import { ConfigType, registerAs } from "@nestjs/config";

export const pokedexConfig = registerAs("pokedex", () => ({
  database: {
    driver: process.env.DATABASE_DRIVER ?? "sqlite",
    name: process.env.DATABASE_NAME ?? "",
    host: process.env.DATABASE_HOST ?? "",
    port: process.env.DATABASE_PORT
      ? parseInt(process.env.DATABASE_PORT)
      : undefined,
    username: process.env.DATABASE_USERNAME ?? "",
    password: process.env.DATABASE_PASSWORD ?? "",
    synchronize: process.env.DATABASE_SYNC === "true",
  },
}));

export type PokedexConfig = ConfigType<typeof pokedexConfig>;
export const PokedexConfigKey = pokedexConfig.KEY;
