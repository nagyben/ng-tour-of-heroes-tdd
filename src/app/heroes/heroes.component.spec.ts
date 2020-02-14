import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HeroesComponent } from "./heroes.component";
import { FormsModule } from "@angular/forms";
import { Hero } from "../hero";
import { HeroService } from '../hero.service';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { Component, Input } from '@angular/core';
import { of, Observable } from 'rxjs';
import { MessageService } from '../message.service';

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

describe("HeroesComponent", () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;

  // See https://angular.io/guide/testing#testing-with-a-spy
  let messageServiceSpy: jasmine.SpyObj<MessageService>;
  let heroServiceSpy: jasmine.SpyObj<HeroService>;
  let getHeroesSpy: any;

  beforeEach(async(() => {
    messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);
    heroServiceSpy = jasmine.createSpyObj('HeroService', ['getHeroes']);
    TestBed.configureTestingModule({
      declarations: [HeroesComponent, HeroDetailComponentStub],
      providers: [
        { provide: HeroService, useValue: heroServiceSpy },
        { provide: MessageService, useValue: messageServiceSpy }
      ],
      imports: [FormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    getHeroesSpy = heroServiceSpy.getHeroes.and.returnValue( of(heroes) );
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

  it("should get the heroes when it is initialized", () => {
    fixture.detectChanges();
    expect(getHeroesSpy.calls.count()).toBe(1, 'getHeroes not called when component initialized');
  });

  it("should send a message when a hero is selected", () => {
    messageServiceSpy.add.calls.reset();
    const li = fixture.nativeElement.querySelector("li");
    li.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(messageServiceSpy.add.calls.any()).toBe(true, 'message not sent when hero is selected');
  });
});
