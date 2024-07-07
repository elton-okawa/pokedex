import { bootstrapApplication } from '@angular/platform-browser';
import { PokedexAppComponent } from './app/pokedex-app.component';
import { pokedexAppConfig } from './app/pokedex-app.config';

bootstrapApplication(PokedexAppComponent, pokedexAppConfig).catch((e) =>
  console.error(e)
);
