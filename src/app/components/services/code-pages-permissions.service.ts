import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CodePagesPermissionsService {

  constructor() { }

  res: string = '';

  isStringNumeric(input: string): boolean 
  {
    return !isNaN(+input);
  }

  encryptPage(dados: any)
  {
    this.res = '';
    this.encryptSistema(dados.sistema);
    this.encryptPermissions(dados.criar, dados.visualizar, dados.excluir);
    return this.res;
  }

  encryptSistema(sis: string)
  {
    switch(sis)
    {
      case 'Perfil':
        this.res += '104';
        break;
      case 'Igreja':
        this.res += '297';
        break;
      case 'Perfil Sistemas':
        this.res += '359';
        break;
      case 'Usuários':
        this.res += '427';
        break;
      case 'Configurações':
        this.res += '510';
        break;
      case 'Evento':
        this.res += '626';
        break;
      case 'Escala':
        this.res += '728';
        break;
    }
  }

  encryptPermissions(criar: boolean, visualizar: boolean, excluir: boolean)
  {

    if(!criar && !excluir)
    {
      this.res += '102';
    }//Nenhum
    else if(criar && excluir)
    {
      this.res += '402';
    }//Todos
    else if(criar && !excluir)
    {
      this.res += '510';
    }//C
    else if(!criar && excluir)
    {
      this.res += '464';
    }//E

    this.res += ''
  }

  async descryptSistema(): Promise<any>
  {
    setTimeout(() => 
    {
      this.res = '';
      let blackList: string[] = [];
      let dados = localStorage.getItem('sis');
      let list = dados?.split('.');
      list?.forEach(li => {
        const sistema = this.descryptSistemaCode(String(li.match(/[0-9]{3}/)?.map(el => el)[0]));
        blackList.includes(sistema) ? null : blackList.push(sistema);
      })
      return blackList;
    }, 2000)
  }

  descryptSistemaCode(sis: string)
  {
    this.res = '';
    switch(sis)
    {
      case '104':
        this.res += 'Perfil';
        break;
      case '297':
        this.res += 'Igreja';
        break;
      case '359':
        this.res += 'Perfil Sistemas';
        break;
      case '427':
        this.res += 'Usuários';
        break;
      case '510':
        this.res += 'Configurações';
        break;
      case '626':
        this.res += 'Evento';
        break;
      case '728':
        this.res += 'Escala';
        break;
    }
    return this.res;
  }

  descryptPermissions(sistema: string): {criar: boolean, excluir: boolean}
  {
    this.res = ''; // Limpa o res (Var Global)
    let retorno: {criar: boolean, excluir: boolean} = {criar: false, excluir: false}; //Declara o retorno
    let permissionCode = '';//Código da permissão

    this.encryptSistema(sistema); // Res recebe o valor do código do sistema

    let dados = localStorage.getItem('sis'); //Dados do localStorage
    let list = dados?.split('.'); //Divisão dos sistemas em blocos
    list?.forEach(li => {
      const sistemaCode = li.replace(/([0-9]{3})([0-9]{3})/,'$1')//Separa o sistema da permissão e pega somente o code do sistema
      const valid = !sistemaCode.replace(this.res,'') // Se o sistema atual menos o sistema pesquisado for null, retorna verdadeiro, pois isso significa que esse é o sistema buscado
      if(valid)
      {
        permissionCode = li.replace(this.res,''); // Pega o código da permissão
      }
    })// Leitura de cada sistema
    switch(permissionCode)
    {
      case '102':
        retorno = {criar: false, excluir: false};
        break;
      case '402':
        retorno = {criar: true, excluir: true};
        break;
      case '510':
        retorno = {criar: true, excluir: false};
        break;
      case '464':
        retorno = {criar: false, excluir: true};
        break;
    }
    return retorno;
  }
}
