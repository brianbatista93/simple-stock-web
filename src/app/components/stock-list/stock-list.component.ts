import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit {
  @Input() titulo: string;
  @Output() onClick: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public clicked() {
    this.onClick.emit();
  }

}
