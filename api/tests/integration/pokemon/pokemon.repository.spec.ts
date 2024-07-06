import { Test } from "@nestjs/testing";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import {
  Pokemon,
  PokemonApi,
  PokemonModule,
  PokemonRepository,
} from "src/pokemon";
import { Repository } from "typeorm";
import { fixtures } from "tests/fixtures";
import globals from "src/global";
import { getRepositoryToken } from "@nestjs/typeorm";

describe("PokemonRepository - integration tests", () => {
  let apiMock: DeepMocked<PokemonApi>;
  let pokemon: Repository<Pokemon>;
  let repository: PokemonRepository;

  beforeEach(async () => {
    apiMock = createMock(PokemonApi as any);
    const module = await Test.createTestingModule({
      imports: [PokemonModule, ...globals],
    })
      .overrideProvider(PokemonApi)
      .useValue(apiMock)
      .compile();

    pokemon = module.get(getRepositoryToken(Pokemon));
    repository = module.get(PokemonRepository);
  });

  afterEach(async () => {
    await pokemon.clear();
  });

  describe("sync", () => {
    it("should save new entries correctly", async () => {
      apiMock.listPokemon.mockResolvedValue(
        fixtures.pokemon.listPokemon({ count: 2 })
      );
      await repository.sync();

      const saved = await pokemon.find();
      expect(saved).toStrictEqual(
        [
          { id: 1, name: "bulbasaur" },
          { id: 2, name: "ivysaur" },
        ].map((data) => pokemon.create(data))
      );
    });

    it("should update entries correctly", async () => {
      await pokemon.save([
        { id: 1, name: "old-bulbasaur" },
        { id: 2, name: "ivysaur" },
      ]);

      apiMock.listPokemon.mockResolvedValue(
        fixtures.pokemon.listPokemon({ count: 2 })
      );
      await repository.sync();

      const saved = await pokemon.find();
      expect(saved).toStrictEqual(
        [
          { id: 1, name: "bulbasaur" },
          { id: 2, name: "ivysaur" },
        ].map((data) => pokemon.create(data))
      );
    });

    it("should remove entries correctly", async () => {
      await pokemon.save([
        { id: 1, name: "bulbasaur" },
        { id: 2, name: "ivysaur" },
      ]);

      apiMock.listPokemon.mockResolvedValue(
        fixtures.pokemon.listPokemon({ count: 1 })
      );
      await repository.sync();

      const saved = await pokemon.find();
      expect(saved).toStrictEqual(
        [{ id: 1, name: "bulbasaur" }].map((data) => pokemon.create(data))
      );
    });
  });
});
