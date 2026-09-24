import { Component, EventEmitter, Output } from '@angular/core';

export type DealFilter = 'all' | 'equity' | 'loan' | 'grant';

@Component({
  selector: 'app-filter-pills',
  standalone: true,
  imports: [],
  templateUrl: './filter-pills.component.html',
  styleUrl: './filter-pills.component.scss',
})
export class FilterPillsComponent {
  active: DealFilter = 'all';
  @Output() filterChange = new EventEmitter<DealFilter>();

  select(filter: DealFilter): void {
    this.active = filter;
    this.filterChange.emit(filter);
  }
}
