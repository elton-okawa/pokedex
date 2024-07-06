import { NestFactory } from "@nestjs/core";
import { PokedexApiModule } from "./pokedex-api.module";
import { setupApp } from "./server";

async function bootstrap() {
  const app = await NestFactory.create(PokedexApiModule);
  setupApp(app);
  await app.listen(3000);
}

bootstrap();
