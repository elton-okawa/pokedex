import { Inject, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { PokemonConfig, PokemonConfigKey } from "./pokemon.config";
import { lastValueFrom } from "rxjs";

export type PaginationParams = {
  limit: number;
  offset: number;
};

type PokemonListApiResponse = {
  count: number;
  results: { name: string; url: string }[];
};

@Injectable()
export class PokemonRepository {
  constructor(
    @Inject(PokemonConfigKey) private readonly config: PokemonConfig,
    private readonly http: HttpService
  ) {}

  async list({ limit, offset }: PaginationParams) {
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
        id: item.url.split("/")[6],
        name: item.name,
      })),
    };
  }
}
