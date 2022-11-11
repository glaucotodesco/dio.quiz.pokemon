import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  pokemons: Pokemon[]= [];
  correct?: Pokemon | undefined;
  success: boolean = false;
  fail: boolean = false;
  
  score: number = 0;
  times: number = 0;

  constructor(private quizService:QuizService) { }

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons() : void {
    this.times++;
    this.success = false;
    this.fail = false;
    this.quizService.generateNextQuiz().subscribe(p => {
        this.pokemons = p;
        this.correct = p[Math.floor(Math.random()*4)];
    } );

    
  }

  onSelect(option:number){
    this.success = false;
    this.fail = false;
    if(option === this.correct?.id ){
        this.success = true;
        this.score++;
    }
    else{
      this.fail = true;
    }
  }

  getImage():string {
    let id = this.correct?.id.toString().padStart(3,"0")
    return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`;
  }
}
