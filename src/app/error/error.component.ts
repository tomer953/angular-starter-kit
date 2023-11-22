import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { injectNavigationEnd } from 'ngxtension/navigation-end';
import { filter } from 'rxjs';
@Component({
  selector: 'app-error',
  template: `<h3>Something went wrong...</h3>`,
  styles: [],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent {
  router = inject(Router);

  constructor() {
    // handle route refresh
    injectNavigationEnd()
      .pipe(filter(this.isRefreshEvent), takeUntilDestroyed())
      .subscribe(() => this.router.navigate(['/']));
  }

  // determine if a navigation event is a refresh event (ie pressing F5 on the same page)
  isRefreshEvent(event: NavigationEnd) {
    return event.id === 1 && event.url === event.urlAfterRedirects;
  }
}
