import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokemonComponent } from './pokemon/pokemon.component';

@Component({
  standalone: true,
  selector: 'pokedex',
  templateUrl: './pokedex-app.component.html',
  styleUrl: './pokedex-app.component.scss',
  imports: [PokemonComponent, RouterOutlet],
})
export class PokedexAppComponent {}
