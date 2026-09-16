import { Component, computed, Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { Pokemon } from '../../models/pokemon.model';

@Component({
  selector: 'app-pokemon-battle-card',
  standalone: true,
  imports: [MatCardModule, MatProgressBarModule],
  templateUrl: './pokemon-battle-card.component.html',
  styleUrl: './pokemon-battle-card.component.css'
})
export class PokemonBattleCardComponent {

    @Input() pokemon!: Pokemon;

    public spriteUrl: string;
    public battleCryUrl: string;

    constructor() {
      this.spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.pokemon.id}.png`;
      this.battleCryUrl = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${this.pokemon.id}.ogg`;
    }
}
