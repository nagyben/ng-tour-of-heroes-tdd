import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesComponent } from './messages.component';
import { MessageService } from '../message.service';

describe('MessagesComponent', () => {
  let component: MessagesComponent;
  let fixture: ComponentFixture<MessagesComponent>;
  let messageServiceStub: Partial<MessageService>;

  beforeEach(async(() => {
    messageServiceStub = {
      messages: ["herp", "derp"],
      clear(): void {
        this.messages = [];
      }
    }
    TestBed.configureTestingModule({
      declarations: [ MessagesComponent ],
      providers: [
        { provide: MessageService, useValue: messageServiceStub }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show messages from the MessageService', () => {
    const messageDiv = fixture.nativeElement.querySelector('div');
    messageServiceStub.messages.forEach(message => {
      expect(messageDiv.textContent).toContain(message);
    });
  });

  it('should show a button to clear the messages', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button).toBeTruthy();
  });

  it('should clear the messages when the clear button is pressed', () => {
    const button = fixture.nativeElement.querySelector('button');
    button.dispatchEvent(new Event('click'));
    const messageDiv = fixture.nativeElement.querySelector('div');
    expect(messageDiv.textContent).not.toContain(messageServiceStub.messages[0]);
  });
});
