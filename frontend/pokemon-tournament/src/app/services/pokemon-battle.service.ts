import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonBattleService {

  readonly BASE_URL = 'http://localhost:5234';

  constructor(private http: HttpClient) { }


  fetchBattleData(sortBy: string, sortOrder: string = 'asc'): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(`${this.BASE_URL}/pokemon/tournament/statistics?sortBy=${sortBy}&sortOrder=${sortOrder}`);
  }
}
