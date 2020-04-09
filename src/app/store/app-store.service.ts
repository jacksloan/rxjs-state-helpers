import {Injectable} from '@angular/core';
import {Store} from './abstract-store';
import {AppState, initialAppState} from './model';


@Injectable({providedIn: 'root'})
export class AppStoreService extends Store<AppState> {
  constructor() {
    super(initialAppState);
  }

  setLoading(wordsLoading: boolean) {
    this.setState(state => ({...state, wordsLoading}));
  }

  setError(wordsError: string | null) {
    this.setState(state => ({...state, wordsError}));
  }

  addWords(word: string) {
    this.setState(state => ({...state, words: state.words.concat(word)}));
  }
}
