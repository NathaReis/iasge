import { CodePagesPermissionsService } from 'src/app/components/services/code-pages-permissions.service';
import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../services/header.service';
import { PerfilService } from '../../services/perfil.service';
import { BodyService } from '../../services/body.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  constructor(
    private headerService: HeaderService,
    private perfilService: PerfilService,
    private code: CodePagesPermissionsService,
    private bodyService: BodyService) {}

  get title(): string
  {
    return String(this.headerService.headerData.title).toUpperCase();
  }
  get icon(): string
  {
    return this.headerService.headerData.icon;
  }
  get routerLink(): string
  {
    return this.headerService.headerData.routerLink;
  }

  //Perfil
  get eventos(): boolean
  {
    return this.perfilService.perfilData.eventos;
  }
  get usuarios(): boolean
  {
    return this.perfilService.perfilData.usuarios;
  }
  get config(): boolean
  {
    return this.perfilService.perfilData.config;
  }
  get escalas(): boolean
  {
    return this.perfilService.perfilData.escalas;
  }
  get igrejas(): boolean
  {
    return this.perfilService.perfilData.igrejas;
  }
  get distritos(): boolean
  {
    return this.perfilService.perfilData.distritos;
  }
  get perfis(): boolean
  {
    return this.perfilService.perfilData.perfis;
  }
  get perfilsistemas(): boolean
  {
    return this.perfilService.perfilData.perfilsistemas;
  }

  //Body
  get theme(): boolean 
  {
    return this.bodyService.appTheme.theme != 'dark-theme' ? false : true;
  }

  isTheme(type: string)
  {
    localStorage.setItem("theme", type);
    this.bodyService.appTheme = {
      theme: type
    };
  }

  ngOnInit(): void {
    this.perfil();
    if(localStorage.getItem("theme") != 'dark-theme')
    {
      this.isTheme('');
    }
    else 
    {
      this.isTheme('dark-theme');
    }
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

  navMenu(): void {
    const nav = document.querySelector(".nav");
    nav?.classList.toggle("active");
  }

  back(): void {
    history.back();
  }
}
