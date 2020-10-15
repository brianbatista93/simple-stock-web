import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  public clientes: Cliente[] = [
    { nome: 'Brenda Fedida', telefone: '(34) 9 9231-2010' },
    { nome: 'Brian Lindo', telefone: '(34) 9 9217-7207' },
    { nome: 'Ximix Belui', telefone: '(au) a auau-auau' },
    { nome: 'Bels Celsius', telefone: '(au) a auau-auau' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
