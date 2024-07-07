import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PokemonComponent } from './pokemon/pokemon.component';
import { SearchComponent } from './search/search.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'pokedex',
  templateUrl: './pokedex-app.component.html',
  styleUrl: './pokedex-app.component.scss',
  imports: [CommonModule, PokemonComponent, SearchComponent, RouterModule],
})
export class PokedexAppComponent {}
