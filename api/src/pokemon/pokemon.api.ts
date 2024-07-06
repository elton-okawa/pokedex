import { Inject, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { PokemonConfig, PokemonConfigKey } from "./pokemon.config";
import { lastValueFrom } from "rxjs";
import { Pokemon, PokemonList } from "./pokemon.model";

type PokemonListApiResponse = {
  count: number;
  results: { name: string; url: string }[];
};

type PokemonListParams = {
  limit: number;
  offset: number;
};

type PokemonResponse = {
  id: number;
  name: string;
  height: number;
  weight: number;
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  types: {
    type: {
      name: string;
    };
  }[];
  sprites: {
    front_default: string;
    back_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
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

  async getPokemon(id: number): Promise<Pokemon> {
    const { data } = await lastValueFrom(
      this.http.get<PokemonResponse>(`/api/v2/pokemon/${id}`, {
        baseURL: this.config.url,
      })
    );

    return {
      id: data.id,
      name: data.name,
      height: data.height,
      weight: data.weight,
      stats: data.stats.map((stat) => ({
        base: stat.base_stat,
        name: stat.stat.name,
      })),
      types: data.types.map((type) => type.type.name),
      sprites: {
        default: {
          front: data.sprites.front_default,
          back: data.sprites.back_default,
        },
      },
      image: {
        default: data.sprites.other["official-artwork"].front_default,
      },
    };
  }
}
