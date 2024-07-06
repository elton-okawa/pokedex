import { Injectable } from "@nestjs/common";
import { PokemonRepository } from "./pokemon.repository";
import { ListParams } from "./pokemon.model";

@Injectable()
export class PokemonService {
  constructor(private readonly repository: PokemonRepository) {}

  list(params: ListParams) {
    return this.repository.list(params);
  }

  sync() {
    return this.repository.sync();
  }
}
