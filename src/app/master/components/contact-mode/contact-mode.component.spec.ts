import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactModeComponent } from './contact-mode.component';

describe('ContactModeComponent', () => {
  let component: ContactModeComponent;
  let fixture: ComponentFixture<ContactModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
