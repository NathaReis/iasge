import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/components/models/usuario';
import { DataService } from 'src/app/components/services/data.service';
import { HeaderService } from 'src/app/components/services/header.service';
import { PerfilService } from 'src/app/components/services/perfil.service';
import { SnackbarService } from 'src/app/components/services/snackbar.service';

@Component({
  selector: 'app-usuarios-edit',
  templateUrl: './usuarios-edit.component.html',
  styleUrls: ['./usuarios-edit.component.css']
})
export class UsuariosEditComponent implements OnInit{

  hide = true;
  
  constructor( 
    private data: DataService,
    private route: ActivatedRoute,
    private snack: SnackbarService,
    private router: Router,
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

  id: string = '';

  ngOnInit(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.data.getAllUsers().subscribe(res =>
      {
        //Mapeia o resultado
        let usuario = res.map((e: any) =>
        {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        })
        .filter(user => user.id == id);

        this.preencher_form(usuario[0], id)
      })

  }

  preencher_form(user: Usuario, id: string)
  {
    this.Nome = user.Nome;
    this.Sobrenome = user.Sobrenome;
    this.Senha = user.Senha;
    this.Perfil = user.Perfil;
    this.Igreja = user.Igreja;
    this.CreatedAt = user.CreatedAt;
    this.UpdatedAt = user.UpdatedAt;
    this.DeletedAt = user.DeletedAt;
    this.id = id;
  }

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

  updateUser()
  {
    const token = localStorage.getItem('token');
    const dados = token?.split('.') ? token.split('.') : '';

    if(this.Nome == '' || this.Sobrenome == '' || this.Senha == '' || this.Perfil == '')
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
      this.userObj.CreatedAt = this.CreatedAt;
      this.userObj.UpdatedAt = `${new Date()}`;
      this.userObj.DeletedAt = this.DeletedAt;
      this.data.updateUser(this.userObj, this.id)
      this.snack.openSnackBar('Atualizado com sucesso!')
      this.router.navigate(['/usuarios'])
    }
  }
}
