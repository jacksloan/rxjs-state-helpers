import {Injectable} from '@angular/core';
import {AppStoreService} from './app-store.service';
import {random} from 'faker';

@Injectable({providedIn: 'root'})
export class AppService {
  constructor(private store: AppStoreService) {
  }

  async fetchData(): Promise<void> {
    this.store.setLoading(true);
    this.store.addWords(await this.mockFetch());
    this.store.setLoading(false);
  }

  private mockFetch(): Promise<string> {
    return new Promise(resolve =>
      setTimeout(_ => resolve(random.word()), 2000));
  }

}
