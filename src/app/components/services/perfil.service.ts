import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Perfil } from '../models/perfil';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class PerfilService{

  constructor(private data: DataService) { }

  getPerfilSistema(perfil: string, igreja: string)
  {
    this.data.getPerfilSistemas(perfil, igreja).subscribe(res =>
      {
        console.log(res);
      })
  }

  _perfilData = new BehaviorSubject<Perfil>({
    // type: '',
    // eventos: false,
    // departamentos: false,
    // associados: false,
    // all_view: false,
    // escalas: false,
    // config: false,
    // home: false
  });


  // métodos

  get perfilData(): Perfil 
  {
    return this._perfilData.value;
  }//Busca

  set perfilData(perfilData: Perfil)
  {
    this._perfilData.next(perfilData)
  }//Edita
}