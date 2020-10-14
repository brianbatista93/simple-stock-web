import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit {
  @Input() titulo: string;

  constructor() { }

  ngOnInit(): void {
  }

}
