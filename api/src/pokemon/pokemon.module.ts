import { HttpModule } from "@nestjs/axios";
import { Module, OnModuleInit } from "@nestjs/common";
import { PokemonController } from "./pokemon.controller";
import { PokemonService } from "./pokemon.service";
import { ConfigModule } from "@nestjs/config";
import { pokemonConfig } from "./pokemon.config";
import { PokemonRepository } from "./pokemon.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Pokemon } from "./pokemon.model";
import { PokemonApi } from "./pokemon.api";

@Module({
  imports: [
    HttpModule,
    ConfigModule.forFeature(pokemonConfig),
    TypeOrmModule.forFeature([Pokemon]),
  ],
  controllers: [PokemonController],
  providers: [PokemonService, PokemonRepository, PokemonApi],
})
export class PokemonModule implements OnModuleInit {
  constructor(private readonly service: PokemonService) {}

  async onModuleInit() {
    await this.service.sync();
  }
}
