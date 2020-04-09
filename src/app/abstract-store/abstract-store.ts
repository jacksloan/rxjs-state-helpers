import {BehaviorSubject, Observable} from 'rxjs';
import {delay, shareReplay} from 'rxjs/operators';

export abstract class Store<S> {
  protected constructor(initialState: S) {
    this.$state$ = new BehaviorSubject<S>(initialState);

    this.state$ = this.$state$.pipe(delay(0), shareReplay(1));
  }

  private $state$: BehaviorSubject<S>;

  public readonly state$: Observable<S>;

  setState(updateFn: (state: S) => S) {
    this.$state$.next(updateFn(this.$state$.value));
  }
}
