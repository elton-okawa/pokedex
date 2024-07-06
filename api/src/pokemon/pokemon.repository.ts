import { Injectable, Logger } from "@nestjs/common";
import { ListParams, PokemonEntity, PokemonList } from "./pokemon.model";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { PokemonApi } from "./pokemon.api";

const ALL_POKEMON_COUNT = 10000;

@Injectable()
export class PokemonRepository {
  private readonly logger = new Logger(PokemonRepository.name);

  constructor(
    @InjectRepository(PokemonEntity)
    private readonly pokemon: Repository<PokemonEntity>,
    private readonly api: PokemonApi
  ) {}

  async list({ limit, offset, name }: ListParams): Promise<PokemonList> {
    const [results, count] = await this.pokemon.findAndCount({
      take: limit,
      skip: offset,
      where: { name: name ? Like(`${name}%`) : undefined },
      order: { id: "ASC" },
    });

    return {
      count,
      results,
    };
  }

  async sync() {
    this.logger.debug("Syncing pokemon...");
    const pokemon = await this.api.listPokemon({
      limit: ALL_POKEMON_COUNT,
      offset: 0,
    });

    await this.pokemon.manager.transaction(async (manager) => {
      await manager.clear(PokemonEntity);
      await manager.save(PokemonEntity, pokemon.results);
    });
    this.logger.debug(`Synched '${pokemon.count}' pokemon successfully!`);
  }
}
