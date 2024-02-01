import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService{

  constructor() { }

  _perfilData = new BehaviorSubject<{escalas: boolean, eventos: boolean, usuarios: boolean, igrejas: boolean, config: boolean, perfil: boolean, perfilsistemas: boolean}>({
    escalas: false,
    eventos: false,
    usuarios: false,
    igrejas: false,
    config: false,

    perfil: false,
    perfilsistemas: false,
  });


  // métodos

  get perfilData(): {escalas: boolean, eventos: boolean, usuarios: boolean, igrejas: boolean, config: boolean, perfil: boolean, perfilsistemas: boolean} 
  {
    return this._perfilData.value;
  }//Busca

  set perfilData(perfilData: {escalas: boolean, eventos: boolean, usuarios: boolean, igrejas: boolean, config: boolean, perfil: boolean, perfilsistemas: boolean})
  {
    this._perfilData.next(perfilData)
  }//Edita
}