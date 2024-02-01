import { CodePagesPermissionsService } from 'src/app/components/services/code-pages-permissions.service';
import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../services/header.service';
import { PerfilService } from '../../services/perfil.service';
import { BodyService } from '../../services/body.service';
import { DataService } from '../../services/data.service';
import { Pisistemas } from '../../models/pisistemas';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  constructor(
    private headerService: HeaderService,
    private perfilService: PerfilService,
    private dataService: DataService,
    private codePagesPermissions: CodePagesPermissionsService,
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
    const token = localStorage.getItem('token');
    const dados = token?.split('.') ? token.split('.') : '';

    if(token)
    {
      this.dataService.getPerfilSistemas(dados[1],dados[2]).subscribe((res: any) =>
      {
        this.perfilSave(res[0]);
      }, err => 
      {
        //Mensagem de erro
        console.log(`Erro de busca: ${err}`);
      })
    }

    if(localStorage.getItem("theme") != 'dark-theme')
    {
      this.isTheme('');
    }
    else 
    {
      this.isTheme('dark-theme');
    }
  }

  perfilSave(dados: Pisistemas)
  {
    dados.Sistemas.forEach((element: any) =>
      {
        this.dataService.getPerfil(element.sistema).subscribe((res: any) =>
        {
          if(res[0].Ativo && element.visualizar)
          {
            const dados = this.codePagesPermissions.encryptPage(element);
            if(localStorage.getItem('sis'))
            {
              localStorage.setItem('sis', localStorage.getItem('sis') + '.' + dados);
            }
            else 
            {
              localStorage.setItem('sis', dados);
            }
          }
        })
      })

      const sis = this.codePagesPermissions.descryptSistema();

      this.perfilService.perfilData = {
        eventos: sis?.includes('Evento') ? true : false,
        escalas: sis?.includes('Escala') ? true : false,
        usuarios: sis?.includes('Usuários') ? true : false,
        igrejas: sis?.includes('Igreja') ? true : false,
        config: sis?.includes('Configurações') ? true : false,
        perfil: sis?.includes('Perfil') ? true : false,
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
