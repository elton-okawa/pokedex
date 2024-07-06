import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from "@nestjs/common";
import { PokemonService } from "./pokemon.service";
import { GetPokemonParams, ListPokemonQuery } from "./pokemon.dto";

const DEFAULT_LIMIT = 10;

@Controller("pokemon")
export class PokemonController {
  constructor(private readonly service: PokemonService) {}

  @Get()
  list(@Query() { offset = 0, limit = DEFAULT_LIMIT, name }: ListPokemonQuery) {
    return this.service.list({ offset, limit, name });
  }

  @Get(":id")
  async get(@Param() { id }: GetPokemonParams) {
    const pokemon = await this.service.get(id);
    if (!pokemon) {
      throw new NotFoundException("Pokemon not found");
    }

    return pokemon;
  }
}
