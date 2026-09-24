import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DealCardComponent } from '../../components/deal-card/deal-card.component';
import { DealFilter, FilterPillsComponent } from '../../components/filter-pills/filter-pills.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { PostAskModalComponent } from '../../components/post-ask-modal/post-ask-modal.component';
import { Deal } from '../../models/deal.model';
import { DealsService } from '../../services/deals.service';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FilterPillsComponent, DealCardComponent, PostAskModalComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
})
export class FeedComponent implements OnInit {
  deals: Deal[] = [];
  activeFilter: DealFilter = 'all';
  loading = true;
  modalOpen = false;

  constructor(private dealsService: DealsService) {}

  ngOnInit(): void {
    this.dealsService.getDeals().subscribe({
      next: (deals) => {
        this.deals = deals;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  get filteredDeals(): Deal[] {
    if (this.activeFilter === 'all') {
      return this.deals;
    }
    return this.deals.filter((deal) => deal.type === this.activeFilter);
  }

  onFilter(filter: DealFilter): void {
    this.activeFilter = filter;
  }

  openModal(): void {
    this.modalOpen = true;
  }

  closeModal(): void {
    this.modalOpen = false;
  }

  onDealCreated(deal: Deal): void {
    this.deals = [deal, ...this.deals];
    this.modalOpen = false;
  }

  trackById(_index: number, deal: Deal): number {
    return deal.id;
  }
}
