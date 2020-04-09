import {Component, OnInit} from '@angular/core';
import {AppQueryService} from './store/app-query.service';
import {AppService} from './store/app.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">

      <h1>
        {{title}}
      </h1>

      <button
        (click)="getNewWord()"
        [disabled]="loading$ | async"
      >
        {{buttonText$ | async}}
      </button>

      <h5>Word Count: {{wordCount$ | async}}</h5>
      <p>{{sentence$ | async}}</p>

    </div>
  `,
  styles: [`
    :host {
      width: 100%;
      height: 100%;
    }

    .container {
      max-width: 980px;
      margin: 0 auto;
      padding: 24px;
    }
  `]
})
export class AppComponent implements OnInit {

  constructor(
    private query: AppQueryService,
    private service: AppService
  ) {
  }

  title = 'Dead Simple State Management';

  wordCount$ = this.query.wordCount$;
  sentence$ = this.query.sentence$;
  loading$ = this.query.loading$;
  buttonText$ = this.loading$.pipe(map(it => it === true ? 'Loading...' : 'Add Word'));
  error$ = this.query.error$;


  getNewWord() {
    this.service.fetchData();
  }

  ngOnInit(): void {
    this.query.state$.subscribe(console.log);
  }
}
