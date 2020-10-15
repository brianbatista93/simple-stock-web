import { HttpResponse } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente } from 'src/app/models/cliente';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-cliente-dialog',
  templateUrl: './cliente-dialog.component.html',
  styleUrls: ['./cliente-dialog.component.scss']
})
export class ClienteDialogComponent implements OnInit {

  public formCliente: FormGroup;
  public telefone: string;

  constructor(
    private fb: FormBuilder,
    private rest: RestService,
    public dialogRef: MatDialogRef<ClienteDialogComponent>,
    private snackBar: MatSnackBar
  ) {
    this.formCliente = fb.group({
      "nome": new FormControl("", [Validators.required, Validators.maxLength(120)]),
      "tel": new FormControl("", [Validators.required, Validators.minLength(14), Validators.maxLength(15)])
    });
  }

  ngOnInit(): void {
  }

  public salvar() {
    const request = {
      "nome": this.formCliente.get("nome").value,
      "telefone": this.telefone
    }

    this.rest.postRequestSign("clientes.json", request)
      .subscribe((response: HttpResponse<any>) => {
        console.log(response);
        this.snackBar.open(`${request.nome} salvo com sucesso.`)
        this.dialogRef.close();
      }, (error: HttpResponse<any>) => {
        console.error(error);
        this.snackBar.open(`Erro ao salvar ${request.nome}.`)
      })
  }

  public cancelar() { this.dialogRef.close("Cadastro de cliente cancelado"); }

  public verificaForms() {
    return this.formCliente.valid;
  }

  public getErrorMessageNome() {
    return this.formCliente.get("nome").hasError("required") ? "Insira o nome da tela" :
      this.formCliente.get("nome").hasError("maxlength") ? "Nome da tela permite até 100 caracteres" :
        "";
  }
}
