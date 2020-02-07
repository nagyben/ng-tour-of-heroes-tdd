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

  // it('should show an input box to change the hero name', () => {
  //   const input = fixture.nativeElement.querySelector('input');
  //   expect(input).toBeTruthy();

  //   // simulate name change
  //   input.value = "herpo";
  //   input.dispatchEvent(new Event('input')); // dispatch input event change
  //   fixture.detectChanges(); // update fixture

  //   const h2 = fixture.nativeElement.querySelector('h2.hero-name');
  //   expect(h2.textContent).toEqual("HERPO");
  // });
});
