import { Injectable } from "@nestjs/common";
import { PaginationParams, PokemonRepository } from "./pokemon.repository";

@Injectable()
export class PokemonService {
  constructor(private readonly repository: PokemonRepository) {}

  list(pagination: PaginationParams) {
    return this.repository.list(pagination);
  }
}
