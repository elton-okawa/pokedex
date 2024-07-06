import { Module } from "@nestjs/common";
import { Pokemon, PokemonModule } from "./pokemon";
import { GlobalTypeOrm } from "./global";

@Module({
  imports: [PokemonModule, GlobalTypeOrm],
})
export class PokedexApiModule {}
