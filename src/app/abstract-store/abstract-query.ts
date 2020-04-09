import {Observable} from 'rxjs';
import {distinctUntilChanged, map} from 'rxjs/operators';
import {Store} from './abstract-store';

export abstract class Query<S> {

  protected constructor(private store: Store<S>) {
  }

  select<T>(selector: (state: S) => T, comparator?: (a: T, b: T) => boolean): Observable<T> {
    return this.store.state$.pipe(
      map(selector),
      distinctUntilChanged(comparator)
    );
  }
}
