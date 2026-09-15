import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { BattleCarouselComponent } from './components/battle-carousel/battle-carousel.component';
import {Pokemon} from './models/pokemon.model';
import { PokemonBattleService } from './services/pokemon-battle.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BattleCarouselComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
  pokemonBattleCards: WritableSignal<Pokemon[]> = signal([]);


  constructor(private battleService: PokemonBattleService) {}


  ngOnInit(): void {

    this.battleService.fetchBattleData('wins').subscribe((battleData: Pokemon[]) => {
      console.log(battleData);
    })

    let demo: Pokemon[] = [];
    for (let t=0; t<10; t++){
      demo.push({id: t, name: "", type:"", wins:t, losses:t, ties:t});
    }
    
    this.pokemonBattleCards.set(demo);
  }



}
