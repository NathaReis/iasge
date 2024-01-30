import { Component, OnInit } from '@angular/core';
import { Perfil } from 'src/app/components/models/perfil';
import { AuthService } from 'src/app/components/services/auth.service';
import { DataService } from 'src/app/components/services/data.service';
import { HeaderService } from 'src/app/components/services/header.service';
import { PerfilService } from 'src/app/components/services/perfil.service';

@Component({
  selector: 'app-associados',
  templateUrl: './associados.component.html',
  styleUrls: ['./associados.component.css']
})
export class AssociadosComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private data: DataService,
    private perfil: PerfilService,
    private headerService: HeaderService) {
      headerService.headerData = {
        title: 'Associados',
        icon: 'people',
        routerLink: 'associados'
      }
    }

  ngOnInit(): void {
    this.auth.auth_guard();
    this.perfilSave();
  }

  perfilSave()
  {
    // this.perfil.perfilData = {
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
}
