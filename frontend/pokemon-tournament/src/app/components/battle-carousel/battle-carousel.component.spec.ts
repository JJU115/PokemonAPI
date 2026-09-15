import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleCarouselComponent } from './battle-carousel.component';

describe('BattleCarouselComponent', () => {
  let component: BattleCarouselComponent;
  let fixture: ComponentFixture<BattleCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BattleCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BattleCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
