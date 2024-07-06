import { Inject, Injectable, Logger } from "@nestjs/common";
import { PaginationParams, Pokemon, PokemonList } from "./pokemon.model";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PokemonApi } from "./pokemon.api";

const ALL_POKEMON_COUNT = 10000;

@Injectable()
export class PokemonRepository {
  private readonly logger = new Logger(PokemonRepository.name);

  constructor(
    @InjectRepository(Pokemon) private readonly pokemon: Repository<Pokemon>,
    private readonly api: PokemonApi
  ) {}

  async list(pagination: PaginationParams): Promise<PokemonList> {
    const [results, count] = await this.pokemon.findAndCount({
      take: pagination.limit,
      skip: pagination.offset,
      order: { id: "ASC" },
    });

    return {
      count,
      results,
    };
  }

  async filter({
    limit,
    name,
  }: {
    limit: number;
    name: string;
  }): Promise<PokemonList> {
    return { count: 0, results: [] };
  }

  async sync() {
    this.logger.debug("Syncing pokemon...");
    const pokemon = await this.api.listPokemon({
      limit: ALL_POKEMON_COUNT,
      offset: 0,
    });

    await this.pokemon.manager.transaction(async (manager) => {
      await manager.clear(Pokemon);
      await manager.save(Pokemon, pokemon.results);
    });
    this.logger.debug(`Synched '${pokemon.count}' pokemon successfully!`);
  }
}
