import request from "supertest";
import nock from "nock";
import { Test } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { PokedexApiModule } from "src/pokedex-api.module";
import { PokemonConfig, PokemonConfigKey } from "src/pokemon";
import { fixtures } from "tests/fixtures";
import { setupApp } from "src/server";

describe("Pokemon - e2e tests", () => {
  let app: INestApplication;
  let config: PokemonConfig;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [PokedexApiModule],
    }).compile();

    app = moduleRef.createNestApplication();
    setupApp(app);

    config = moduleRef.get(PokemonConfigKey);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe(`GET /api/pokemon`, () => {
    it("should return pokemon list correctly", async () => {
      nock(config.url)
        .get("/api/v2/pokemon?limit=10&offset=0")
        .reply(200, fixtures.pokemon.listApiResponse());

      await request(app.getHttpServer())
        .get("/api/pokemon")
        .expect(200)
        .expect({
          count: 1302,
          results: [
            { id: "1", name: "bulbasaur" },
            { id: "2", name: "ivysaur" },
          ],
        });
      expect(nock.isDone()).toBe(true);
    });

    it("should accept limit and offset params", async () => {
      nock(config.url)
        .get("/api/v2/pokemon?limit=30&offset=10")
        .reply(200, fixtures.pokemon.listApiResponse());

      await request(app.getHttpServer())
        .get("/api/pokemon?limit=30&offset=10")
        .expect(200);

      expect(nock.isDone()).toBe(true);
    });

    it("should return error on invalid query", async () => {
      await request(app.getHttpServer())
        .get("/api/pokemon?limit=-1&offset=not")
        .expect(400)
        .expect({
          message: [
            "limit must not be less than 1",
            "offset must not be less than 0",
            "offset must be a number conforming to the specified constraints",
          ],
          error: "Bad Request",
          statusCode: 400,
        });
    });
  });
});
