import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { PokemonDetails } from '../pokemon';
import { Observable } from 'rxjs';
import { HttpResponse } from '../../http-response';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.scss',
})
export class PokemonDetailsComponent {
  route = inject(ActivatedRoute);
  pokemonService = inject(PokemonService);
  pokemon$: Observable<HttpResponse<PokemonDetails>>;

  constructor() {
    const pokemonId = Number(this.route.snapshot.params['id']);
    this.pokemon$ = this.pokemonService.getPokemonById(pokemonId);
  }
}
