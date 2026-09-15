import { Component, Input } from '@angular/core';
import { Pokemon } from '../../models/pokemon.model';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-battle-carousel',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './battle-carousel.component.html',
  styleUrl: './battle-carousel.component.css'
})
export class BattleCarouselComponent {

    @Input() pokemonLineup: Pokemon[] = [];
}
