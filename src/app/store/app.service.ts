import {Injectable} from '@angular/core';
import {AppStoreService} from './app-store.service';
import {AppDataService} from './app-data.service';

@Injectable({providedIn: 'root'})
export class AppService {
  constructor(
    private store: AppStoreService,
    private dataService: AppDataService
  ) {
  }

  async fetchData(): Promise<void> {
    this.store.setLoading(true);
    this.store.addWords(await this.dataService.mockFetch());
    this.store.setLoading(false);
  }

}
