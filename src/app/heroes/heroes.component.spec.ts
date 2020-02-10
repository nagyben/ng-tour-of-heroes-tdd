import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HeroesComponent } from "./heroes.component";
import { FormsModule } from "@angular/forms";
import { Hero } from "../hero";
import { HeroService } from '../hero.service';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { Component, Input } from '@angular/core';

@Component({selector: 'app-hero-detail', template: ''})
class HeroDetailComponentStub {
  @Input() hero: Hero;
}

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

// See https://angular.io/guide/testing#testing-with-a-spy
const heroServiceStub: jasmine.SpyObj<HeroService> = jasmine.createSpyObj('HeroService', ['getHeroes']);

describe("HeroesComponent", () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeroesComponent, HeroDetailComponentStub],
      providers: [
        { provide: HeroService, useValue: heroServiceStub }
      ],
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

  it("should get the heroes", () => {
    component.getHeroes();
    expect(heroServiceStub.getHeroes.calls.count()).toBe(1);
  });
});
