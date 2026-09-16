import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonBattleService {

  private readonly baseUrl = `${environment.apiUrl}/pokemon`;
  constructor(private http: HttpClient) { }


  fetchBattleData(sortBy: string, sortOrder: string = 'asc'): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(`${this.baseUrl}/pokemon/tournament/statistics?sortBy=${sortBy}&sortOrder=${sortOrder}`);
  }
}
