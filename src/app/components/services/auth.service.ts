import { Sistema } from './../models/sistema';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './data.service';
import { SnackbarService } from './snackbar.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Usuario } from '../models/usuario';
import { Igreja } from '../models/igreja';
import { Perfil } from '../models/perfil';
import { PerfilService } from './perfil.service';
import { CodePagesPermissionsService } from './code-pages-permissions.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router : Router,
    private snack: SnackbarService,
    private data : DataService,
    private code: CodePagesPermissionsService,
    private perfil: PerfilService,
    private afs : AngularFirestore
    ) { }
  
  // login metodo
  login(user_name: string, password: string)
  {
    // A expressão regular para validar o formato "nome.sobrenome"
    const regex = /^[a-zA-Z]+[.][a-zA-Z]+$/;
    if(user_name.match(regex))
    {
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
            this.logar([usuario.id,Perfil,Igreja]);
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
    localStorage.removeItem('token');
    localStorage.removeItem('sis');
    this.perfil.perfilData = {
      eventos: false,
      escalas: false,
      usuarios: false,
      igrejas: false,
      config: false,
      perfis: false,
      distritos: false,
      perfilsistemas: false,
    }
    this.router.navigate(['login']);
  }
  // Login
  logar(dadosParams: any) 
  {
    let start = 0;
    let end = 0;
    this.data.getPerfilSistemas(dadosParams[1],dadosParams[2]).subscribe((res: any) =>
    {
      end = res[0].Sistemas.length;

      res[0].Sistemas.forEach((element: any) =>
      {
        this.data.getPerfil(element.sistema).subscribe((res: any) =>
        {
          start++;
          if(res[0].Ativo && element.visualizar)
          {
            const dados = this.code.encryptPage(element);
            if(localStorage.getItem('sis'))
            {
              localStorage.setItem('sis', localStorage.getItem('sis') + '.' + dados);
            }
            else 
            {
              localStorage.setItem('sis', dados);
            }//Salva no localStorage
            if(start == end)
            {
              this.entrar(dadosParams);
            }
          }//Valida se a página está ativa e pode ser visualizada
        })//Passa pelo registro para ver se está ativo
      })//Passa por cada sistema
    }, err => 
    {
      //Mensagem de erro
      console.log(`Erro de busca: ${err}`);
    })//Pesquisa do perfiligrejasistemas usando perfil/igreja
  }

  entrar(dados: any)
  {
    let token = '';
    //IdUser 0
    token = `${dados[0]}.`;
    //IdPerfil 1
    token += `${dados[1]}.`
    //IdIgreja 2
    token += `${dados[2]}`;
    // //IdMasck 3
    // token += `${dados[0]}`
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
