import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { PokemonController } from "./pokemon.controller";
import { PokemonService } from "./pokemon.service";
import { ConfigModule } from "@nestjs/config";
import { pokemonConfig } from "./pokemon.config";
import { PokemonRepository } from "./pokemon.repository";

@Module({
  imports: [HttpModule, ConfigModule.forFeature(pokemonConfig)],
  controllers: [PokemonController],
  providers: [PokemonService, PokemonRepository],
})
export class PokemonModule {}
