import { Component, Input, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { Pokemon } from '../../models/pokemon.model';
import { DecimalPipe, TitleCasePipe } from '@angular/common';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-pokemon-battle-card',
  standalone: true,
  imports: [MatCardModule, MatProgressBarModule, DecimalPipe, MatButtonModule, TitleCasePipe, MatChipsModule, MatIconModule],
  templateUrl: './pokemon-battle-card.component.html',
  styleUrl: './pokemon-battle-card.component.css'
})
export class PokemonBattleCardComponent implements OnInit {

    TYPE_COLORS: Record<string, string> = {
        normal:   '#A8A878',
        fire:     '#F08030',
        water:    '#6890F0',
        electric: '#F8D030',
        grass:    '#78C850',
        ice:      '#98D8D8',
        fighting: '#C03028',
        poison:   '#A040A0',
        ground:   '#E0C068',
        flying:   '#A890F0',
        psychic:  '#F85888',
        bug:      '#A8B820',
        rock:     '#B8A038',
        ghost:    '#705898',
        dragon:   '#7038F8',
        dark:     '#705848',
        steel:    '#B8B8D0',
        fairy:    '#EE99AC',
      };

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
