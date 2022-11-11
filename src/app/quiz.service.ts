import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of, forkJoin } from 'rxjs';
import {tap} from "rxjs/operators"
import { Pokemon } from './pokemon';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  baseURL: string = ""
  pokemons: Pokemon[] = []; 
  
  constructor(private http: HttpClient) {
    this.baseURL = environment.pokeApi
  }

  generateNextQuiz():Observable<Pokemon[]>{
    var arr = [];

    while (arr.length < 4) {
      var r = Math.floor(Math.random() * 905);
      if (arr.indexOf(r) === -1)
        arr.push(r);
    }
    this.http.get<Pokemon>(`${this.baseURL}${arr[0]}`).subscribe(p => console.log(p));

    return forkJoin([
      this.http.get<Pokemon>(`${this.baseURL}${arr[0]}`).pipe(tap(p => console.log(p))),
      this.http.get<Pokemon>(`${this.baseURL}${arr[1]}`),
      this.http.get<Pokemon>(`${this.baseURL}${arr[2]}`),
      this.http.get<Pokemon>(`${this.baseURL}${arr[3]}`)
    ]);
  }


}
