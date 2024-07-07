import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { PokemonDetails } from '../pokemon';
import { Observable } from 'rxjs';
import { HttpResponse } from '../../http-response';
import { CommonModule } from '@angular/common';
import { toCapitalCase } from '../../string.helper';
import { PokemonTypeComponent } from '../pokemon-type/pokemon-type.component';

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [CommonModule, PokemonTypeComponent],
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.scss',
})
export class PokemonDetailsComponent {
  route = inject(ActivatedRoute);
  pokemonService = inject(PokemonService);
  result: HttpResponse<PokemonDetails> = {
    data: null,
    error: null,
    loading: false,
  };

  constructor() {
    const pokemonId = Number(this.route.snapshot.params['id']);
    this.pokemonService
      .getPokemonById(pokemonId)
      .subscribe((res) => (this.result = res));
  }

  get paddedNumber() {
    return this.result.data?.id.toString().padStart(4, '0');
  }

  get capitalizedName() {
    const pokemon = this.result.data;
    if (!pokemon) {
      return '';
    }

    return toCapitalCase(pokemon.name);
  }

  get weight() {
    const pokemon = this.result.data;
    if (!pokemon) return '';

    return `${(pokemon.weight / 10).toFixed(2)} kg`;
  }

  get height() {
    const pokemon = this.result.data;
    if (!pokemon) return '';

    return `${(pokemon.height / 10).toFixed(2)} m`;
  }

  formatStatus(status: string) {
    return status.split('-').map(toCapitalCase).join(' ');
  }
}
