import { Injectable } from "@nestjs/common";
import { PokemonRepository } from "./pokemon.repository";
import { PaginationParams } from "./pokemon.model";

@Injectable()
export class PokemonService {
  constructor(private readonly repository: PokemonRepository) {}

  list(pagination: PaginationParams) {
    return this.repository.list(pagination);
  }

  sync() {
    return this.repository.sync();
  }
}
