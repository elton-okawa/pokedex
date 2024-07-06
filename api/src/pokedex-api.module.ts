import { Module } from "@nestjs/common";
import { PokemonModule } from "./pokemon";

@Module({
  imports: [PokemonModule],
})
export class PokedexApiModule {}
