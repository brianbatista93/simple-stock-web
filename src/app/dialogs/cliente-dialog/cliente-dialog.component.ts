import { HttpClient, HttpResponse } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente } from 'src/app/models/cliente';
import { PhonePipe } from 'src/app/pipes/phone.pipe';
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
    private http: HttpClient,
    public dialogRef: MatDialogRef<ClienteDialogComponent>,
    private snackBar: MatSnackBar,
    private db: AngularFirestore
  ) {
    this.formCliente = fb.group({
      "nome": new FormControl("", [Validators.required, Validators.maxLength(120)]),
      "tel": new FormControl("", [Validators.required, Validators.minLength(14), Validators.maxLength(15)]),
      "cep": new FormControl("", [Validators.required, Validators.maxLength(8)]),
      "logradouro": new FormControl("", [Validators.required]),
      "numero": new FormControl("", [Validators.required]),
      "bairro": new FormControl("", [Validators.required]),
      "complemento": new FormControl("", [Validators.required]),
      "localidade": new FormControl("", [Validators.required]),
      "uf": new FormControl("", [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  public buscaCEP() {
    let cep = this.formCliente.get("cep").value;
    if (cep.length == 0)
      return;

    this.http.get(`https://viacep.com.br/ws/${cep}/json/`, RestService.HEADER_PURE_JSON).subscribe(
      (result) => {
        this.formCliente.get("logradouro").setValue(result["logradouro"]);
        this.formCliente.get("localidade").setValue(result["localidade"]);
        this.formCliente.get("bairro").setValue(result["bairro"]);
        this.formCliente.get("uf").setValue(result["uf"]);
      }, (error) => {

      }
    );
  }

  public salvar() {
    const request = {
      "nome": this.formCliente.get("nome").value,
      "telefone": new PhonePipe().removePipe(this.telefone),
      "endereco": {
        "cep": this.formCliente.get("cep").value,
        "logradouro": this.formCliente.get("logradouro").value,
        "numero": this.formCliente.get("numero").value,
        "complemento": this.formCliente.get("complemento").value,
        "localidade": this.formCliente.get("localidade").value,
        "uf": this.formCliente.get("uf").value
      }
    }

    this.db.collection("clientes").add(request).then((docRef) => {
      console.log("Cliente salvo com id: ", docRef.id);
      this.snackBar.open("Cliente salvo com sucesso.");
    }).catch((error) => {
      console.error("Nao foi possivel salvar cliente", error);
      this.snackBar.open("Erro ao salvar cliente.");
    })
    this.dialogRef.close();
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
