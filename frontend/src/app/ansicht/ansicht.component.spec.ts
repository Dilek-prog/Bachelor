import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnsichtComponent } from './ansicht.component';

describe('AnsichtComponent', () => {
  let component: AnsichtComponent;
  let fixture: ComponentFixture<AnsichtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnsichtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnsichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
