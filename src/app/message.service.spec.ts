import { TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add and clear messages', () => {
    service.add("herp");
    expect(service.messages).toEqual(["herp"]);
    service.add("herp");
    expect(service.messages).toEqual(["herp", "herp"]);
    service.clear();
    expect(service.messages).toEqual([]);
  });
});
