import { Component } from '@angular/core';
import { Usuario } from 'src/app/components/models/usuario';
import { DataService } from 'src/app/components/services/data.service';
import { HeaderService } from 'src/app/components/services/header.service';
import { PerfilService } from 'src/app/components/services/perfil.service';
import { SnackbarService } from 'src/app/components/services/snackbar.service';

@Component({
  selector: 'app-usuarios-create',
  templateUrl: './usuarios-create.component.html',
  styleUrls: ['./usuarios-create.component.css']
})
export class UsuariosCreateComponent {
  hide = true;

  constructor( 
    private data : DataService,
    private snack: SnackbarService,
    private headerService: HeaderService) {
    headerService.headerData = {
      title: 'Usuários',
      icon: 'house',
      routerLink: 'usuarios'
    }
  }
  userObj: Usuario = {
    Nome: '',
    Sobrenome: '',
    Senha: 'igest',
    Perfil: '',
    Igreja: '',
    CreatedAt: '',
    UpdatedAt: '',
    DeletedAt: '',
  }
  Nome: string = '';
  Sobrenome: string = '';
  Senha: string = 'igest';
  Perfil: string = '';
  Igreja: string = '';
  CreatedAt: string = '';
  UpdatedAt: string = '';
  DeletedAt: string = '';

  resetForm()
  {
    this.Nome = '';
    this.Sobrenome = '';
    this.Perfil = '';
    this.Igreja = '';
    this.CreatedAt = '';
    this.UpdatedAt = '';
    this.DeletedAt = '';
  }

  addUser()
  {
    const token = localStorage.getItem('token');
    const dados = token?.split('.') ? token.split('.') : '';

    if(this.Nome == '' || this.Sobrenome == '' || this.Perfil == '')
    {
      this.snack.openSnackBar('Preencha todos os campos', 2000);
    }
    else 
    {
      this.userObj.Nome = this.Nome;
      this.userObj.Sobrenome = this.Sobrenome;
      this.userObj.Senha = this.Senha;
      this.userObj.Perfil = this.Perfil;

      this.userObj.Igreja = dados[2];
      this.userObj.CreatedAt = `${new Date()}`;
      this.userObj.UpdatedAt = `${new Date()}`;
      this.userObj.DeletedAt = '';

      this.data.addUser(this.userObj)
      this.resetForm()
      this.snack.openSnackBar('Criado com sucesso!')
    }
  }

}
