import { TestBed } from '@angular/core/testing';

import { HeroService } from './hero.service';
import { MessageService } from './message.service';

const messageServiceSpy: jasmine.SpyObj<MessageService> = jasmine.createSpyObj('MessageService', ['add']);

describe('HeroService', () => {
  let service: HeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: MessageService, useValue: messageServiceSpy }
      ],
    });
    service = TestBed.inject(HeroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the heroes', () => {
    const heroes = service.getHeroes();
    expect(heroes).toBeTruthy();
  });

  it('should send a message to the MessageService when the heroes are got', () => {
    messageServiceSpy.add.calls.reset();
    service.getHeroes();
    expect(messageServiceSpy.add.calls.count()).toBe(1);
  });
});
