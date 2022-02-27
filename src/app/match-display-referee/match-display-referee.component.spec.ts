import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchDisplayRefereeComponent } from './match-display-referee.component';

describe('MatchDisplayRefereeComponent', () => {
  let component: MatchDisplayRefereeComponent;
  let fixture: ComponentFixture<MatchDisplayRefereeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchDisplayRefereeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchDisplayRefereeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
