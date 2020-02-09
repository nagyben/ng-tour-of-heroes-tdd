import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroDetailComponent } from "./hero-detail.component";
import { Hero } from "../hero";

describe("HeroDetailComponent", () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  const hero: Hero = {
    id: 1,
    name: "Windstorm"
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeroDetailComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    component.hero = hero; // inject mock hero
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("shows the details of a hero", () => {
    const heroDetailDiv = fixture.nativeElement.querySelector("div#hero-details");
    expect(heroDetailDiv).toBeTruthy();
    expect(heroDetailDiv.querySelector('h2').textContent).toContain(hero.name)
    expect(heroDetailDiv.querySelector('input')).toBeTruthy();
    expect(heroDetailDiv.textContent).toMatch(`.*${hero.name}.*id:.*${hero.id}.*`)
  });
});
