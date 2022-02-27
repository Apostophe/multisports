import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchDisplayFinishComponent } from './match-display-finish.component';

describe('MatchDisplayFinishComponent', () => {
  let component: MatchDisplayFinishComponent;
  let fixture: ComponentFixture<MatchDisplayFinishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchDisplayFinishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchDisplayFinishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
