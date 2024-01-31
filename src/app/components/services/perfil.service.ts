import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Perfil } from '../models/perfil';
import { DataService } from './data.service';
import { Pisistemas } from '../models/pisistemas';
import { Sistema } from '../models/sistema';

@Injectable({
  providedIn: 'root'
})
export class PerfilService{

  constructor(private data: DataService) { }

  getPerfilSistema(perfil: string, igreja: string)
  {
    const listSistemas: Sistema[] = [];

    this.data.getPerfilSistemas(perfil, igreja).subscribe((res: any) =>
      {
        const perfilSistemas: Pisistemas = res[0];
        if(perfilSistemas)
        {
          perfilSistemas.Sistemas.forEach(s => {
            this.data.getSistema(s.id).subscribe((res: any) =>
            {
              const register = res.data();
              if(register.Ativo)
              {
                listSistemas.push(register.Sistema);
              }
            })
          })
        }
      })

    this.perfilData = {
      escalas: listSistemas.includes('Escalas') ? true : false,
      eventos: listSistemas.includes('Eventos') ? true : false,
      usuarios: listSistemas.includes('Usuarios') ? true : false,
      igrejas: listSistemas.includes('Igrejas') ? true : false,
      config: listSistemas.includes('Config') ? true : false,
    }
  }

  _perfilData = new BehaviorSubject<any>({
    escalas: false,
    eventos: false,
    usuarios: false,
    igrejas: false,
    config: false,
  });


  // métodos

  get perfilData(): any 
  {
    return this._perfilData.value;
  }//Busca

  set perfilData(perfilData: any)
  {
    this._perfilData.next(perfilData)
  }//Edita
}