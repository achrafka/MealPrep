import { Component, OnInit } from '@angular/core';
import { TweenMax, Expo } from 'gsap/all';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    TweenMax.from('.block', 1.6, {
      delay: 3.5,
      opacity: 0,
      y: 30,
      ease: Expo.easeInOut
      });

    TweenMax.from('.head_', 1.6, {
      delay: 3.6,
      opacity: 0,
      y: 30,
      ease: Expo.easeInOut
      });

    TweenMax.from('.parag_', 1.6, {
      delay: 3.7,
      opacity: 0,
      y: 30,
      ease: Expo.easeInOut
      });

    TweenMax.from('.btns_', 1.6, {
        delay: 3.8,
        opacity: 0,
        y: 30,
        ease: Expo.easeInOut
        });
  }

}
