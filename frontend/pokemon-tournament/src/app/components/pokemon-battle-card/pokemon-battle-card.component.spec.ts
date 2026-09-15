import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonBattleCardComponent } from './pokemon-battle-card.component';

describe('PokemonBattleCardComponent', () => {
  let component: PokemonBattleCardComponent;
  let fixture: ComponentFixture<PokemonBattleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonBattleCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonBattleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
