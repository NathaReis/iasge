import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './data.service';
import { SnackbarService } from './snackbar.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Usuario } from '../models/usuario';
import { Igreja } from '../models/igreja';
import { Perfil } from '../models/perfil';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router : Router,
    private snack: SnackbarService,
    private data : DataService,
    private afs : AngularFirestore
    ) { }
  
  // login metodo
  login(user_name: string, password: string)
  {
    // A expressão regular para validar o formato "nome.sobrenome"
    const regex = /^[a-zA-Z]+[.][a-zA-Z]+$/;
    if(user_name.match(regex))
    {
      // this.data.login(user_name, password).subscribe(res =>
      //   {
      //     //Mapeia o resultado
      //     let usersList = res.map((e: any) =>
      //       {
      //         const data = e.payload.doc.data();
      //         return data;
      //       })
      //   }
      this.data.getAllUsers().subscribe(res =>
        {
          let usersList = res.map((e: any) =>
            {
              const data = e.payload.doc.data();
              data.id = e.payload.doc.id;
              return data;
            })

          const usuario = (usersList.filter(element => element.Nome == user_name.split('.')[0] && element.Sobrenome == user_name.split('.')[1] && element.Senha == password))[0];

          if(usuario)
          {
            const Igreja: string = usuario.Igreja;
            const Perfil: string = usuario.Perfil;
            this.data.getIgreja(Igreja).subscribe((res) => 
            {
              const igreja: Igreja | any = res.data();
              if(igreja)
              {
                this.data.getPerfil(Perfil).subscribe((res) => 
                {
                  const perfil: Perfil | any = res.data();
                  if(perfil)
                  {
                    //LOGAR
                    this.logar([usuario,perfil.Nome,Igreja]);
                  }
                  else
                  {
                    this.snack.openSnackBar('Usuário não possui um perfil!', 2000);
                  }
                })//Buscar a Perfil
              }
              else 
              {
                this.snack.openSnackBar('Usuário não possui uma igreja!', 2000);
              }
            })//Buscar a Igreja
          }
          else 
          {
            this.snack.openSnackBar('Usuário não existe!', 2000);
          }
        })//Buscar usuário
    }
    else 
    {
      this.snack.openSnackBar('O usuário deve ser nome.sobrenome!', 2000);
    }
  }

  // Logout
  logout() 
  {
    localStorage.removeItem('token')
    this.router.navigate(['login']);
  }
  // Login
  logar(dados: any) 
  {
    let token = '';

    //IdUser
    token = `${dados[0].id}.`;
    
    //7 dígitos do perfil
    switch(dados[1])
    {
      case 'Administrador':
        token += '7832456.';
        break;
      case 'Comunicador':
        token += '5698214.';
        break;
      case 'Diretor':
        token += '4789562.';
        break;
      default:
        token += '6547891.';
    }

    //IdIgreja
    token += `${dados[2]}.`;

    //IdMasck
    token += `${dados[0].id}`

    localStorage.setItem('token', token);
    this.router.navigate(['home']);
  }

  // Segurança
  auth_guard()
  {
    if(!localStorage.getItem('token'))
    {
      this.router.navigate(['login']);
    }
  }
  // Login
  isLogin()
  {
    if(localStorage.getItem('token'))
    {
      this.router.navigate(['home'])
    }
  }
}
