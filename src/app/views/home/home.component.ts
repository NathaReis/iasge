import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/components/services/auth.service';
import { CodePagesPermissionsService } from 'src/app/components/services/code-pages-permissions.service';
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
    private perfilService: PerfilService,
    private code: CodePagesPermissionsService,
    private headerService: HeaderService) {
      headerService.headerData = {
        title: 'Home',
        icon: 'home',
        routerLink: 'home'
      }
    }

  ngOnInit(): void {
    this.auth.auth_guard();
    this.perfil();
  }

  perfil()
  {
    const sis = this.code.descryptSistema();

    this.perfilService.perfilData = {
      eventos: sis?.includes('Evento') ? true : false,
      escalas: sis?.includes('Escala') ? true : false,
      usuarios: sis?.includes('Usuários') ? true : false,
      igrejas: sis?.includes('Igreja') ? true : false,
      config: sis?.includes('Configurações') ? true : false,
      perfis: sis?.includes('Perfil') ? true : false,
      distritos: sis?.includes('Distrito') ? true : false,
      perfilsistemas: sis?.includes('Perfil Sistemas') ? true : false,
    }
  }
}

