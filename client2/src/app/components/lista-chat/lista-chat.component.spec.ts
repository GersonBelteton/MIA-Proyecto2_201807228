import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaChatComponent } from './lista-chat.component';

describe('ListaChatComponent', () => {
  let component: ListaChatComponent;
  let fixture: ComponentFixture<ListaChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
