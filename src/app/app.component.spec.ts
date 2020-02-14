import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';

const PAGE_TITLE = 'Tour of Heroes';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  beforeAll(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title ${PAGE_TITLE}`, () => {
    expect(app.title).toEqual(PAGE_TITLE);
  });

  it('should render title', () => {
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1.textContent).toContain(PAGE_TITLE);
  });

  it('should show the HeroComponent', () => {
    const heroComponent = fixture.nativeElement.querySelector('app-heroes');
    expect(heroComponent).toBeTruthy();
  });

  it('should show the MessagesComponent', () => {
    const messagesComponent = fixture.nativeElement.querySelector('app-messages');
    expect(messagesComponent).toBeTruthy();
  });
});
