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
                    this.logar([usuario,Igreja,perfil.Nome]);
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
    localStorage.removeItem("all_view");
    localStorage.removeItem('usermask_id');
    localStorage.removeItem('usermask_name');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_id');
    localStorage.removeItem('logado');

    //PAGES
    localStorage.removeItem("departamentos"),
    localStorage.removeItem("associados"),
    localStorage.removeItem("eventos"),
    localStorage.removeItem("all_view"),

    //Is Editor de Escalas
    localStorage.removeItem('isEditor');
    
    this.router.navigate(['login']);
  }
  // Login
  logar(dados: any) 
  {
    let token = '';
    
    //7 dígitos do perfil
    switch(dados[2])
    {
      case 'Administrador':
        token = '7832456';
        break;
      case 'Comunicador':
        token = '5698214';
        break;
      case 'Diretor':
        token = '4789562';
        break;
      default:
        token = '6547891';
    }


    

    // localStorage.setItem('usermask_id', dados[0].uid)
    // localStorage.setItem('usermask_name', dados[0].Nome);
    // localStorage.setItem('user_name', dados[0].Nome)
    // localStorage.setItem('user_id', dados[0].uid)
    // localStorage.setItem('igreja', dados[1]);
    // this.router.navigate(['home']);
  }

  // Segurança
  auth_guard()
  {
    if(!localStorage.getItem('logado'))
    {
      this.router.navigate(['login']);
    }
  }
  // Login
  isLogin()
  {
    if(localStorage.getItem('logado'))
    {
      this.router.navigate(['home'])
    }
  }
}
