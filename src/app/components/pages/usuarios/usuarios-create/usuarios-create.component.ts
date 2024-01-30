import { Component } from '@angular/core';
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
    private perfilService: PerfilService,
    private headerService: HeaderService) {
    headerService.headerData = {
      title: 'Usuários',
      icon: 'house',
      routerLink: 'usuarios'
    }
    // perfilService.perfilData = {
    //   departamentos: localStorage.getItem("departamentos") ? true : false,
    //   associados: localStorage.getItem("associados") ? true : false,
    //   eventos: localStorage.getItem("eventos") ? true : false,
    //   type: String(localStorage.getItem("logado")),
    //   all_view: localStorage.getItem("all_view") ? true : false,
    //   escalas: true,
    //   config: true,
    //   home: true
    // }
  }
  userObj = {
    id: '',
    first_name: '',
    last_name: '',
    password: '',
    perfil: '',
    user_name: '',
  }
  id: string = '';
  first_name: string = '';
  last_name: string = '';
  password: string = '';
  perfil: string = '';
  user_name: string = '';

  resetForm()
  {
    this.id = '';
    this.first_name = '';
    this.last_name = '';
    this.password = '';
    this.perfil = '';
    this.user_name = '';
  }

  addUser()
  {
    if(this.first_name == '' || this.last_name == '' || this.password == '' || this.perfil == '')
    {
      this.snack.openSnackBar('Preencha todos os campos', 2000);
    }
    else 
    {
      this.userObj.id = '';
      this.userObj.first_name = this.first_name;
      this.userObj.last_name = this.last_name;
      this.userObj.password = this.password;
      this.userObj.perfil = this.perfil;
      this.userObj.user_name = `${this.first_name.toLowerCase()}.${this.last_name.toLowerCase()}`;
      // this.data.addUser(this.userObj)
      this.resetForm()
      this.snack.openSnackBar('Criado com sucesso!')
    }
  }

}
