import { Component, Input } from '@angular/core';
import { PokemonSummary } from '../pokemon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-summary',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './pokemon-summary.component.html',
  styleUrl: './pokemon-summary.component.scss',
})
export class PokemonSummaryComponent {
  @Input() pokemon!: PokemonSummary;

  get paddedNumber() {
    return this.pokemon.id.toString().padStart(4, '0');
  }

  get capitalizedName() {
    return (
      this.pokemon.name.slice(0, 1).toUpperCase() + this.pokemon.name.slice(1)
    );
  }

  // TODO this value should come from backend
  get imageUrl() {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.pokemon.id}.png`;
  }
}
