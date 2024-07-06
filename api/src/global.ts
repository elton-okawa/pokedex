import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { pokedexConfig, PokedexConfig, PokedexConfigKey } from "./config";
import { Pokemon } from "./pokemon";

export const GlobalTypeOrm = TypeOrmModule.forRootAsync({
  imports: [ConfigModule.forFeature(pokedexConfig)],
  useFactory: (config: PokedexConfig) => ({
    type: config.database.driver as any,
    host: config.database.host,
    port: config.database.port,
    username: config.database.username,
    password: config.database.password,
    database: config.database.name,
    entities: [Pokemon],
    synchronize: config.database.synchronize,
  }),
  inject: [PokedexConfigKey],
});

export default [GlobalTypeOrm];
