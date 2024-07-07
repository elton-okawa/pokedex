import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon/pokemon.service';
import { PokemonSummary } from '../pokemon/pokemon-summary';

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.scss',
})
export class PokemonDetailsComponent {
  route = inject(ActivatedRoute);
  pokemonService = inject(PokemonService);
  pokemon: PokemonSummary | undefined;

  constructor() {
    const pokemonId = Number(this.route.snapshot.params['id']);
    this.pokemon = this.pokemonService.getPokemonById(pokemonId);
  }
}
