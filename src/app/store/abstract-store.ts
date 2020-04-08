import { BehaviorSubject, Observable } from 'rxjs';
import { delay, shareReplay } from 'rxjs/operators';

/**
 * @example: An example of using the store/query classes

 interface AppState {
        loaded: boolean;
        error: any;
        data: string[];
 }

 //@Injectable({providedIn: 'root'})
 export class StoreService extends Store<AppState> {

        public static INITIAL_STATE = {
            loaded: false,
            error: null,
            data: []
        };

        constructor() {
            super(StoreService.INITIAL_STATE);
        }

        setLoaded(loaded: boolean) {
            this.setState(state => ({...state, loaded}));
        }

        setError(error) {
            this.setState(state => ({...state, error}));
        }

        setData(data: string[]) {
            this.setState(state => ({...state, data}));
        }
 }

 //@Injectable({providedIn: 'root'})
 export class QueryService extends Query<AppState> {

        constructor(public store: StoreService) {
            super(store);
        }

        data$ = this.select(state => state.data);
        error$ = this.select(state => state.error);
        loaded$ = this.select(state => state.loaded);
 }
*/
export abstract class Store<S> {
  protected constructor(initialState: S) {
    this._$state = new BehaviorSubject<S>(initialState);
    this.$state = this._$state.pipe(delay(0), shareReplay(1));
  }

  private _$state: BehaviorSubject<S>;

  public readonly $state: Observable<S>;

  setState(updateFn: (state: S) => S) {
    this._$state.next(updateFn(this._$state.value));
  }
}
