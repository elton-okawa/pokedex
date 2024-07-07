import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { PokemonQuery } from './pokemon';
import { SearchComponent } from '../search/search.component';
import { PokemonService, SearchParams } from './pokemon.service';
import { PokemonSummaryComponent } from './pokemon-summary/pokemon-summary.component';
import { CommonModule } from '@angular/common';
import { HttpResponse } from '../http-response';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [CommonModule, SearchComponent, PokemonSummaryComponent],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.scss',
})
export class PokemonComponent implements OnInit, OnDestroy {
  @Input() limit = 6;

  private pokemonService = inject(PokemonService);
  private offset = 0;
  private searchName = '';

  private searchParamsSource = new Subject<SearchParams>();
  private searchParamsRef: Subscription | null = null;

  private pokemonQuerySource = new BehaviorSubject<HttpResponse<PokemonQuery>>({
    loading: false,
    data: null,
    error: null,
  });
  pokemonQuery$ = this.pokemonQuerySource.asObservable();

  get disableLoadMore() {
    const hasMore =
      !!this.pokemonQuerySource.value.data &&
      this.pokemonQuerySource.value.data.count >
        this.pokemonQuerySource.value.data.results.length;

    return (
      !hasMore ||
      this.pokemonQuerySource.value.loading ||
      this.pokemonQuerySource.value.error
    );
  }

  ngOnInit(): void {
    this.searchParamsRef = this.pokemonService
      .searchPokemon(this.searchParamsSource)
      .subscribe((result) => this.pokemonQuerySource.next(result));

    this.search({ append: false });
  }

  ngOnDestroy(): void {
    this.searchParamsRef?.unsubscribe();
  }

  onSearch(value: string) {
    this.searchName = value;
    this.offset = 0;
    this.search({ append: false });
  }

  onLoadMore() {
    this.offset += this.limit;
    this.search({ append: true });
  }

  private search({ append }: { append: boolean }) {
    this.searchParamsSource.next({
      search: {
        name: this.searchName,
        offset: this.offset,
        limit: this.limit,
      },
      append,
      prev: this.pokemonQuerySource.value,
    });
  }
}
