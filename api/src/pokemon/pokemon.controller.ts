import { Controller, Get, Query } from "@nestjs/common";
import { PokemonService } from "./pokemon.service";
import { ListPokemonQuery } from "./pokemon.dto";

const DEFAULT_LIMIT = 10;

@Controller("pokemon")
export class PokemonController {
  constructor(private readonly service: PokemonService) {}

  @Get()
  list(@Query() { offset = 0, limit = DEFAULT_LIMIT, name }: ListPokemonQuery) {
    return this.service.list({ offset, limit, name });
  }
}
