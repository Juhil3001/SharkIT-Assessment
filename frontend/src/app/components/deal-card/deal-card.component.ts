import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Deal } from '../../models/deal.model';

@Component({
  selector: 'app-deal-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './deal-card.component.html',
  styleUrl: './deal-card.component.scss',
})
export class DealCardComponent {
  @Input({ required: true }) deal!: Deal;

  get initials(): string {
    return this.deal.company.slice(0, 2).toUpperCase();
  }

  get formattedAmount(): string {
    const amount = this.deal.amount;
    if (amount >= 10_000_000) {
      return `₹${this.trimNumber(amount / 10_000_000)} Cr`;
    }
    if (amount >= 100_000) {
      return `₹${this.trimNumber(amount / 100_000)} L`;
    }
    return `₹${amount.toLocaleString('en-IN')}`;
  }

  get timeAgo(): string {
    const seconds = Math.max(0, Math.floor((Date.now() - new Date(this.deal.created_at).getTime()) / 1000));
    if (seconds < 60) {
      return 'just now';
    }
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return `${minutes}m ago`;
    }
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return `${hours}h ago`;
    }
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  }

  private trimNumber(value: number): string {
    return value.toFixed(1).replace(/\.0$/, '');
  }
}
