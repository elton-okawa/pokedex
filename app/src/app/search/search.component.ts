import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit, OnDestroy {
  @Input() placeholder = '';
  @Output() valueChanged = new EventEmitter<string>();

  private subject = new Subject<string>();

  ngOnInit(): void {
    this.subject.subscribe((value) => this.valueChanged.emit(value));
  }

  ngOnDestroy(): void {
    this.subject.complete();
  }

  onSearch(value: string) {
    this.subject.next(value);
  }

  getEventValue(event: Event) {
    return (event.target as HTMLInputElement).value;
  }
}
