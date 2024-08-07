import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-all',
  templateUrl: './game-all.component.html',
  styleUrl: './game-all.component.css',
})
export class GameAllComponent implements OnInit {
  constructor(private readonly _route: ActivatedRoute) {}

  public ngOnInit(): void {}
}
