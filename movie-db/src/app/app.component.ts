import { Component, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { AppLoadingService } from './core/app-loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewChecked {
  title = 'movie-db';

  constructor(
    public appLoadingService: AppLoadingService,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }
}
