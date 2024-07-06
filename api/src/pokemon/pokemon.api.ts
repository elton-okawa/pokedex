import { Inject, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { PokemonConfig, PokemonConfigKey } from "./pokemon.config";
import { lastValueFrom } from "rxjs";
import { PokemonList } from "./pokemon.model";

type PokemonListApiResponse = {
  count: number;
  results: { name: string; url: string }[];
};

type PokemonListParams = {
  limit: number;
  offset: number;
};

@Injectable()
export class PokemonApi {
  constructor(
    @Inject(PokemonConfigKey) private readonly config: PokemonConfig,
    private readonly http: HttpService
  ) {}

  async listPokemon({
    limit,
    offset,
  }: PokemonListParams): Promise<PokemonList> {
    const { data } = await lastValueFrom(
      this.http.get<PokemonListApiResponse>(
        `/api/v2/pokemon?limit=${limit}&offset=${offset}`,
        {
          baseURL: this.config.url,
        }
      )
    );

    return {
      count: data.count,
      results: data.results.map((item) => ({
        id: parseInt(item.url.split("/")[6]),
        name: item.name,
      })),
    };
  }
}
