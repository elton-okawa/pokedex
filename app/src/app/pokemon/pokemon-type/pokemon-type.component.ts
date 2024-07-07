import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { toCapitalCase } from '../../string.helper';

@Component({
  selector: 'app-pokemon-type',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-type.component.html',
  styleUrl: './pokemon-type.component.scss',
})
export class PokemonTypeComponent {
  @Input() type: string = 'none';

  get typeClass() {
    return `type type-${this.type}`;
  }

  get formattedType() {
    return toCapitalCase(this.type);
  }
}
