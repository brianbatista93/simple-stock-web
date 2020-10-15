import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ClienteDialogComponent } from 'src/app/dialogs/cliente-dialog/cliente-dialog.component';
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  clientes: Observable<Cliente[]>;

  /*public clientes: Cliente[] = [
    { nome: 'Brenda Fedida', telefone: '(34) 9 9231-2010' },
    { nome: 'Brian Lindo', telefone: '(34) 9 9217-7207' },
    { nome: 'Ximix Belui', telefone: '(au) a auau-auau' },
    { nome: 'Bels Celsius', telefone: '(au) a auau-auau' }
  ];*/

  private dialogRef: MatDialogRef<ClienteDialogComponent>;

  constructor(
    private dialog: MatDialog,
    private db: AngularFireDatabase
  ) {
    this.clientes = this.db.list<Cliente>("clientes").valueChanges();
  }

  ngOnInit(): void {
  }

  public addCliente() {
    this.dialogRef = this.dialog.open(ClienteDialogComponent, {
      disableClose: true
    });

    this.dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    })
  }

}
