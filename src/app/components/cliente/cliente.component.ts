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

  private dialogRef: MatDialogRef<ClienteDialogComponent>;

  constructor(
    private dialog: MatDialog,
    private db: AngularFirestore
  ) {
    this.clientes = this.db.collection<Cliente>("clientes").valueChanges();
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

  public selCliente(i) {
    console.log("Selecionou: " + i);
  }

}
