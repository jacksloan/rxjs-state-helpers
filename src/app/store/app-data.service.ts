import {Injectable} from '@angular/core';
import {random} from 'faker';

@Injectable({providedIn: 'root'})
export class AppDataService {

  // in a real world app we would be using HttpClient to call an API
  mockFetch(): Promise<string> {
    return new Promise(resolve =>
      setTimeout(_ => resolve(random.word()), 2000));
  }

}
