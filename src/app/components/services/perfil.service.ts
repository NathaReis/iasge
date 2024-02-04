import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService{

  constructor() { }

  _perfilData = new BehaviorSubject<{escalas: boolean, eventos: boolean, usuarios: boolean, igrejas: boolean, config: boolean, perfis: boolean, perfilsistemas: boolean, distritos: boolean}>({
    escalas: false,
    eventos: false,
    usuarios: false,
    config: false,
    
    perfis: false,
    igrejas: false,
    distritos: false,
    perfilsistemas: false,
  });


  // métodos

  get perfilData(): {escalas: boolean, eventos: boolean, usuarios: boolean, igrejas: boolean, config: boolean, perfis: boolean, perfilsistemas: boolean, distritos: boolean} 
  {
    return this._perfilData.value;
  }//Busca

  set perfilData(perfilData: {escalas: boolean, eventos: boolean, usuarios: boolean, igrejas: boolean, config: boolean, perfis: boolean, perfilsistemas: boolean, distritos: boolean})
  {
    this._perfilData.next(perfilData)
  }//Edita
}