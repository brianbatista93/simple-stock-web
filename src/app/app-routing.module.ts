import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteComponent } from './components/cliente/cliente.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { ProdutoComponent } from './components/produto/produto.component';
import { VendaComponent } from './components/venda/venda.component';

const routes: Routes = [
  { path: "", component: MainMenuComponent },
  { path: "vendas", component: VendaComponent },
  { path: "produtos", component: ProdutoComponent },
  { path: "clientes", component: ClienteComponent },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
