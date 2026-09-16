import { Component, Input, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { Pokemon } from '../../models/pokemon.model';
import { DecimalPipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-pokemon-battle-card',
  standalone: true,
  imports: [MatCardModule, MatProgressBarModule, DecimalPipe, TitleCasePipe],
  templateUrl: './pokemon-battle-card.component.html',
  styleUrl: './pokemon-battle-card.component.css'
})
export class PokemonBattleCardComponent implements OnInit {

    @Input() pokemon: Pokemon = new Pokemon();

    public spriteUrl: string = '';
    public battleCryUrl: string = '';

    public winRate: number = 0;


    public ngOnInit(): void {
      let dec = this.pokemon.wins / (this.pokemon.wins + this.pokemon.ties + this.pokemon.losses);
      this.winRate = Math.round(dec * 100);
      this.spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.pokemon.id}.png`;
      this.battleCryUrl = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${this.pokemon.id}.ogg`;
    }

}
