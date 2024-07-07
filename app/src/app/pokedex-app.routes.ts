import { Routes } from '@angular/router';
import { PokemonDetailsComponent } from './pokemon/pokemon-details/pokemon-details.component';
import { PokemonComponent } from './pokemon/pokemon.component';

export const routes: Routes = [
  {
    path: '',
    component: PokemonComponent,
    title: 'Pokedex',
  },
  {
    path: 'pokemon/:id',
    component: PokemonDetailsComponent,
    title: 'Pokemon',
  },
];
