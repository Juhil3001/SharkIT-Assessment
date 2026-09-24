import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly storageKey = 'theme';
  readonly isDark$ = new BehaviorSubject(true);

  init(): void {
    const stored = localStorage.getItem(this.storageKey);
    this.apply(stored === 'light' ? 'light' : 'dark');
  }

  toggle(): void {
    const current = document.documentElement.getAttribute('data-theme');
    this.apply(current === 'light' ? 'dark' : 'light');
  }

  private apply(theme: 'dark' | 'light'): void {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(this.storageKey, theme);
    this.isDark$.next(theme === 'dark');
  }
}
