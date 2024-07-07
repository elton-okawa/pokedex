import { Component, Input } from '@angular/core';
import { PokemonSummary } from '../pokemon-summary';
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
}
