import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HeroesComponent } from "./heroes.component";
import { FormsModule } from "@angular/forms";
import { Hero } from "../hero";

describe("HeroesComponent", () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  const heroes: Hero[] = [
    {
      id: 1,
      name: "Windstorm"
    },
    {
      id: 2,
      name: "Earthdump"
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeroesComponent],
      imports: [FormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    component.heroes = heroes; // inject mock heroes
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should show the heroes as a list", () => {
    const lis = fixture.nativeElement.querySelectorAll("li");
    expect(lis.length).toEqual(heroes.length);

    for (let i = 0; i < lis.length; i++) {
      const li = lis[i];
      expect(li.textContent).toContain(heroes[i].name);
    }
  });

  it("should show the HeroDetail component when a hero is selected", () => {
    const heroDetailComponent = fixture.nativeElement.querySelector('app-hero-detail')
    const li = fixture.nativeElement.querySelector("li");
    li.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(heroDetailComponent).toBeTruthy();
  });
});
