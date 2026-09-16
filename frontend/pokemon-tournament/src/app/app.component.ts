import { Component, computed, OnInit, Signal, signal, ViewEncapsulation, WritableSignal } from '@angular/core';
import { BattleCarouselComponent } from './components/battle-carousel/battle-carousel.component';
import {Pokemon} from './models/pokemon.model';
import {MatCardModule} from '@angular/material/card';
import { PokemonBattleService } from './services/pokemon-battle.service';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {PageEvent, MatPaginatorModule} from '@angular/material/paginator';
import {MatChipsModule} from '@angular/material/chips';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BattleCarouselComponent, MatChipsModule, MatPaginatorModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  
  allBattleCards: WritableSignal<Pokemon[]> = signal([]);

  sortByControl = new FormControl<keyof Pokemon>('wins');
  sortDirectionControl = new FormControl<'asc' | 'desc'>('asc');

  //Paginator data — signals so the template stays in sync with page changes
  pageSize: WritableSignal<number> = signal(16);
  pageIndex: WritableSignal<number> = signal(0);
  pageSizeOptions: number[] = [4, 8, 12, 16];

  // Total number of items, drives the paginator's [length]
  totalItems: Signal<number> = computed(() => this.allBattleCards().length);

  // The slice of the sorted list that belongs on the current page
  pokemonBattleCards: Signal<Pokemon[]> = computed(() => {

    const start = this.pageIndex() * this.pageSize();

    return this.allBattleCards().slice(start, start + this.pageSize());

  });



  constructor(private battleService: PokemonBattleService) {}


  ngOnInit(): void {
    this.battleService.fetchBattleData('wins').subscribe((battleData: Pokemon[]) => {
      console.log(battleData);
      this.allBattleCards.set(battleData);
    })

    this.sortByControl.valueChanges.subscribe(sortBy => {
      this.allBattleCards.update(pkmn => this.sortByProperty(pkmn, sortBy!, this.sortDirectionControl.value!))
      this.pageIndex.set(0);
    });

    this.sortDirectionControl.valueChanges.subscribe(sortOrder => {
      this.allBattleCards.update(pkmn => this.sortByProperty(pkmn, this.sortByControl.value!, sortOrder!));
      this.pageIndex.set(0);
    });
    
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


 handlePageEvent(e: PageEvent) {
    this.pageSize.set(e.pageSize);
    this.pageIndex.set(e.pageIndex);
  }



}
