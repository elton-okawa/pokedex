import { TestBed } from "@automock/jest";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { of } from "rxjs";
import {
  pokemonConfig,
  PokemonConfigKey,
  PokemonRepository,
} from "src/pokemon";
import { fixtures } from "tests/fixtures";

describe("PokemonRepository - unit tests", () => {
  let repository: PokemonRepository;
  let httpMock: jest.Mocked<HttpService>;
  const config = pokemonConfig();

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(PokemonRepository)
      .mock(PokemonConfigKey)
      .using(config)
      .compile();

    repository = unit;
    httpMock = unitRef.get(HttpService);
  });

  describe("list", () => {
    it("should list pokemon correctly", async () => {
      httpMock.get.mockImplementationOnce(() =>
        of({ data: fixtures.pokemon.listApiResponse() } as AxiosResponse)
      );

      const list = await repository.list({ limit: 10, offset: 5 });

      expect(list).toStrictEqual({
        count: 1302,
        results: [
          { id: "1", name: "bulbasaur" },
          { id: "2", name: "ivysaur" },
        ],
      });
      expect(httpMock.get).toHaveBeenCalledTimes(1);
      expect(httpMock.get).toHaveBeenCalledWith(
        "/api/v2/pokemon?limit=10&offset=5",
        { baseURL: config.url }
      );
    });
  });
});
