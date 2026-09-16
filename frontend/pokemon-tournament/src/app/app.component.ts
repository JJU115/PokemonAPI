import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { BattleCarouselComponent } from './components/battle-carousel/battle-carousel.component';
import {Pokemon} from './models/pokemon.model';
import {MatCardModule} from '@angular/material/card';
import { PokemonBattleService } from './services/pokemon-battle.service';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, ReactiveFormsModule} from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BattleCarouselComponent, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
  pokemonBattleCards: WritableSignal<Pokemon[]> = signal([]);

  sortByControl = new FormControl<keyof Pokemon>('wins');
  sortDirectionControl = new FormControl<'asc' | 'desc'>('asc');

  constructor(private battleService: PokemonBattleService) {}


  ngOnInit(): void {
    this.battleService.fetchBattleData('wins').subscribe((battleData: Pokemon[]) => {
      console.log(battleData);
      this.pokemonBattleCards.set(battleData);
    })

    this.sortByControl.valueChanges.subscribe(sortBy => 
      this.pokemonBattleCards.update(pkmn => this.sortByProperty(pkmn, sortBy!, this.sortDirectionControl.value!)));

    this.sortDirectionControl.valueChanges.subscribe(sortOrder => 
      this.pokemonBattleCards.update(pkmn => this.sortByProperty(pkmn, this.sortByControl.value!, sortOrder!)));
    
  }


  sortByProperty(pkmn: Pokemon[], key: keyof Pokemon, order: 'asc' | 'desc' = 'asc'): Pokemon[] {
    return [...pkmn].sort((a, b) => {
      const valA = a[key];
      const valB = b[key];

      if (typeof valA === 'string' && typeof valB === 'string') {
        return order === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }

      if (typeof valA === 'number' && typeof valB === 'number') {
        return order === 'asc' ? valA - valB : valB - valA;
      }
      
      return 0; 
  });
}



}
