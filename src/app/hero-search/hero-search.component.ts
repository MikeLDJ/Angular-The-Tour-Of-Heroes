import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'

import 'rxjs/add/observable/of'

import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/distinctUntilChanged'

import { HeroSearchService } from '../hero-search.service'
import { Hero } from '../hero'

@Component({
  selector: 'hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss'],
  providers: [HeroSearchService]
})
export class HeroSearchComponent implements OnInit {
  heroes: Observable<Hero[]>
  private searchTerms = new Subject<string>()

  constructor(
    private HeroSearchService: HeroSearchService,
    private router: Router
  ) { }

  search(term: string): void {
    this.searchTerms.next(term)
  }

  ngOnInit(): void {
    this.heroes = this.searchTerms
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => term
        ? this.HeroSearchService.search(term)
        : Observable.of<Hero[]>([]))
      .catch(error => {
        console.log(error)
        return Observable.of<Hero[]>([])
      })
  }

  gotoDetail(hero: Hero): void {
    let link = ['/detail', hero.id]
    this.router.navigate(link)
  }

}
