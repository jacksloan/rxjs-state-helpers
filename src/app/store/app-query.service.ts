import {Query} from './abstract-query';
import {AppState} from './model';
import {Injectable} from '@angular/core';
import {AppStoreService} from './app-store.service';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AppQueryService extends Query<AppState> {

  constructor(store: AppStoreService) {
    super(store);
  }

  state$ = this.select(state => state);

  words$ = this.select(state => state.words);
  error$ = this.select(state => state.wordsError);
  loading$ = this.select(state => state.wordsLoading);

  sentence$ = this.words$.pipe(map(it => it.join(' ') + '.'));
  wordCount$ = this.words$.pipe(map(it => it.length));

}
