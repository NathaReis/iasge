import { Component, OnInit } from '@angular/core';
import { Pisistemas } from 'src/app/components/models/pisistemas';
import { AuthService } from 'src/app/components/services/auth.service';
import { DataService } from 'src/app/components/services/data.service';
import { HeaderService } from 'src/app/components/services/header.service';
import { PerfilService } from 'src/app/components/services/perfil.service';
import { SnackbarService } from 'src/app/components/services/snackbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private data: DataService,
    private snack: SnackbarService,
    private perfil: PerfilService,
    private headerService: HeaderService) {
      headerService.headerData = {
        title: 'Home',
        icon: 'home',
        routerLink: 'home'
      }
    }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const dados = token?.split('.') ? token.split('.') : '';

    this.auth.auth_guard();
    this.data.getPerfilSistemas(dados[1],dados[2]).subscribe((res: any) =>
      {
        this.perfilSave(res[0]);
      }, err => 
      {
        //Mensagem de erro
        this.snack.openSnackBar(`Erro de busca: ${err}`);
      })
  }

  perfilSave(dados: Pisistemas)
  {
    dados.Sistemas.forEach((element: any) =>
      {
        console.log(element.sistema)
        this.data.getPerfil(element.sistema).subscribe((res: any) =>
        {
          if(res[0].Ativo)
          {
            if(localStorage.getItem('sis'))
            {
              localStorage.setItem('sis', localStorage.getItem('sis') + '.' + element.sistema);
            }
            else 
            {
              localStorage.setItem('sis', element.sistema);
            }
          }
        })
      })

    const sis = localStorage.getItem('sis')?.split('.');

    this.perfil.perfilData = {
      eventos: sis?.includes('Evento') ? true : false,
      escalas: sis?.includes('Escala') ? true : false,
      usuarios: sis?.includes('Usuários') ? true : false,
      igrejas: sis?.includes('Igreja') ? true : false,
      config: sis?.includes('Configurações') ? true : false,
      perfil: sis?.includes('Perfil') ? true : false,
      perfilsistemas: sis?.includes('Perfil Sistemas') ? true : false,
    }
  }
}

