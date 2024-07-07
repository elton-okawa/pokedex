import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { PokemonSummary } from './pokemon-summary';
import { SearchComponent } from '../search/search.component';
import { PokemonService } from './pokemon.service';
import { PokemonSummaryComponent } from './pokemon-summary/pokemon-summary.component';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

type RequestState = 'idle' | 'loading' | 'error';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [CommonModule, SearchComponent, PokemonSummaryComponent],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.scss',
})
export class PokemonComponent implements OnInit, OnDestroy {
  @Input() limit = 6;

  pokemonQuery: { count: number; results: PokemonSummary[] } = {
    count: 0,
    results: [],
  };
  private pokemonService = inject(PokemonService);
  private requestState: RequestState = 'idle';
  private requestStateSubscription: Subscription | null = null;
  private pokemonQuerySubscription: Subscription | null = null;
  private offset = 0;
  private searchName = '';

  get isLoading() {
    return this.requestState === 'loading';
  }

  get isError() {
    return this.requestState === 'error';
  }

  get hasMore() {
    return this.pokemonQuery.count > this.pokemonQuery.results.length;
  }

  ngOnInit(): void {
    this.requestStateSubscription = this.pokemonService.requestState$.subscribe(
      (state) => (this.requestState = state)
    );

    this.pokemonQuerySubscription = this.pokemonService.pokemonQuery$.subscribe(
      (query) => (this.pokemonQuery = query)
    );

    this.onSearch('');
  }

  ngOnDestroy(): void {
    this.requestStateSubscription?.unsubscribe();
    this.pokemonQuerySubscription?.unsubscribe();
  }

  onSearch(value: string) {
    this.searchName = value;
    this.offset = 0;
    this.pokemonService.search({
      name: this.searchName,
      offset: this.offset,
      limit: this.limit,
    });
  }

  onLoadMore() {
    this.offset += this.limit;
    this.pokemonService.loadMore({
      name: this.searchName,
      offset: this.offset,
      limit: this.limit,
    });
  }
}
