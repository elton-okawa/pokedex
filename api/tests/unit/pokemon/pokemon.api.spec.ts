import { TestBed } from "@automock/jest";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { of } from "rxjs";
import { pokemonConfig, PokemonConfigKey, PokemonApi } from "src/pokemon";
import { fixtures } from "tests/fixtures";

describe("PokemonApi - unit tests", () => {
  let api: PokemonApi;
  let httpMock: jest.Mocked<HttpService>;
  const config = pokemonConfig();

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(PokemonApi)
      .mock(PokemonConfigKey)
      .using(config)
      .compile();

    api = unit;
    httpMock = unitRef.get(HttpService);
  });

  describe("listPokemon", () => {
    it("should list pokemon correctly", async () => {
      httpMock.get.mockImplementationOnce(() =>
        of({ data: fixtures.pokemon.listApiResponse() } as AxiosResponse)
      );

      const list = await api.listPokemon({ limit: 10, offset: 5 });

      expect(list).toStrictEqual({
        count: 1302,
        results: [
          { id: 1, name: "bulbasaur" },
          { id: 2, name: "ivysaur" },
        ],
      });
      expect(httpMock.get).toHaveBeenCalledTimes(1);
      expect(httpMock.get).toHaveBeenCalledWith(
        "/api/v2/pokemon?limit=10&offset=5",
        { baseURL: config.url }
      );
    });
  });

  describe("getPokemon", () => {
    it("should get pokemon correctly", async () => {
      httpMock.get.mockImplementationOnce(() =>
        of({ data: fixtures.pokemon.getPokemonApiResponse() } as AxiosResponse)
      );

      const pokemon = await api.getPokemon(1);

      expect(pokemon).toStrictEqual({
        height: 7,
        id: 1,
        name: "bulbasaur",
        sprites: {
          default: {
            back: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png",
            front:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
          },
        },
        image: {
          default:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
        },
        stats: [
          {
            base: 45,
            name: "hp",
          },
          {
            base: 49,
            name: "attack",
          },
          {
            base: 49,
            name: "defense",
          },
          {
            base: 65,
            name: "special-attack",
          },
          {
            base: 65,
            name: "special-defense",
          },
          {
            base: 45,
            name: "speed",
          },
        ],
        types: ["grass", "poison"],
        weight: 69,
      });
      expect(httpMock.get).toHaveBeenCalledTimes(1);
      expect(httpMock.get).toHaveBeenCalledWith("/api/v2/pokemon/1", {
        baseURL: config.url,
      });
    });
  });
});
