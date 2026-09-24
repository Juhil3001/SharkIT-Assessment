import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Deal } from '../../models/deal.model';
import { DealsService } from '../../services/deals.service';

@Component({
  selector: 'app-post-ask-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './post-ask-modal.component.html',
  styleUrl: './post-ask-modal.component.scss',
})
export class PostAskModalComponent implements OnDestroy {
  @Output() close = new EventEmitter<void>();
  @Output() created = new EventEmitter<Deal>();

  submitting = false;
  serverError = '';
  private typeSub: Subscription;

  form = this.fb.group({
    company: ['', [Validators.required, Validators.maxLength(100)]],
    founder: ['', [Validators.required, Validators.maxLength(100)]],
    sector: ['', [Validators.required, Validators.maxLength(80)]],
    pitch: ['', [Validators.required, Validators.maxLength(120)]],
    type: ['equity', Validators.required],
    amount: [null as number | null, [Validators.required, Validators.min(1000)]],
    equity_pct: [null as number | null, [Validators.required, Validators.min(0), Validators.max(100)]],
  });

  constructor(
    private fb: FormBuilder,
    private deals: DealsService,
  ) {
    this.typeSub = this.form.controls.type.valueChanges.subscribe((type) => {
      const equity = this.form.controls.equity_pct;
      if (type === 'equity') {
        equity.setValidators([Validators.required, Validators.min(0), Validators.max(100)]);
      } else {
        equity.clearValidators();
        equity.setValue(null);
      }
      equity.updateValueAndValidity();
    });
  }

  get equityError(): string {
    const equity = this.form.controls.equity_pct;
    const started = Boolean(this.form.controls.company.value);
    if (this.form.controls.type.value === 'equity' && equity.invalid && (equity.touched || started)) {
      return 'equity_pct is required for equity deals';
    }
    return '';
  }

  ngOnDestroy(): void {
    this.typeSub.unsubscribe();
  }

  onOverlayClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close.emit();
    }
  }

  onSubmit(): void {
    if (this.form.invalid || this.submitting) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting = true;
    this.serverError = '';
    const value = this.form.getRawValue();
    this.deals
      .createDeal({
        company: value.company ?? '',
        founder: value.founder ?? '',
        sector: value.sector ?? '',
        pitch: value.pitch ?? '',
        type: (value.type ?? 'equity') as Deal['type'],
        amount: Number(value.amount),
        equity_pct: value.type === 'equity' ? Number(value.equity_pct) : undefined,
      })
      .subscribe({
        next: (deal) => {
          this.submitting = false;
          this.created.emit(deal);
          this.close.emit();
        },
        error: (err) => {
          this.submitting = false;
          this.serverError = this.readError(err);
        },
      });
  }

  private readError(err: { error?: { detail?: unknown } }): string {
    const detail = err.error?.detail;
    if (typeof detail === 'string') {
      return detail;
    }
    if (Array.isArray(detail) && detail.length > 0) {
      const first = detail[0] as { msg?: string };
      return first.msg ?? 'Could not post this deal';
    }
    return 'Could not post this deal';
  }
}
