import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Hero } from '../../@types';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [CommonModule, HeroDetailComponent],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css',
})
export class HeroesComponent {
  selectedHero?: Hero;
  heroes?: Hero[];

  constructor(private heroService: HeroService, private messageService: MessageService) {}

  // ngOnInit is a component life cycle function that triggers when the component is initialized
  ngOnInit(): void {
    this.getHeroes();
  }

  // In real life applications the data querying is asynchronous. For this Angular uses "Observable", it's a key class of RxJS
  getHeroes(): void {
    /**
     * Observable.subscribe(callback: (observable_result) => void)
     * allows us to pass a Callback that gets executed as soon as the Observable resolves
     *  */ 
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes)
  }

  OnSelect(selectedHero: Hero) {
    this.selectedHero = selectedHero;
    this.messageService.add(`HeroesComponent: Selected hero id=${selectedHero.id}`);
  }
}
