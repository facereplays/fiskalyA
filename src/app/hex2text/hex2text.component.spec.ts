import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hex2textComponent } from './hex2text.component';

describe('Hex2textComponent', () => {
  let component: Hex2textComponent;
  let fixture: ComponentFixture<Hex2textComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Hex2textComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Hex2textComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
