import {async, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {instance, mock, when} from 'ts-mockito';
import {AppDataService} from './store/app-data.service';
import {take} from 'rxjs/operators';


describe('AppComponent', () => {

  const mockDataService: AppDataService = mock(AppDataService);

  when(mockDataService.mockFetch())
    .thenReturn(new Promise<string>(resolve => resolve('first')))
    .thenReturn(new Promise<string>(resolve => resolve('second')))
    .thenReturn(new Promise<string>(resolve => resolve('third')))
  ;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        {
          provide: AppDataService,
          useValue: instance(mockDataService)
        }
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Dead Simple State Management'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Dead Simple State Management');
  });

  it(`should render 'Word Count: 3' after 3 button clicks`, fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const select = (selector) => fixture.nativeElement.querySelector(selector);

    const button = select('button');

    button.click();
    button.click();
    button.click();

    tick();
    fixture.detectChanges();
    expect(select('.container h5').textContent).toContain('Word Count: 3');
  }));

  it(`should start with a word count of 0`, async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(await app.wordCount$.pipe(take(1)).toPromise()).toEqual(0);
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.container h5').textContent).toContain('Word Count');
  });
});
