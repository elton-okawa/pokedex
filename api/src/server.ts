import { INestApplication, ValidationPipe } from "@nestjs/common";

export function setupApp(app: INestApplication) {
  app.setGlobalPrefix("api");
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    })
  );
}
