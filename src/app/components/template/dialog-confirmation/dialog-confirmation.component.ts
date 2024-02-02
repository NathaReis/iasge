import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Dialog } from '../../models/dialog';
import { DataService } from '../../services/data.service';
import { SnackbarService } from '../../services/snackbar.service';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-dialog-confirmation',
  templateUrl: './dialog-confirmation.component.html',
  styleUrls: ['./dialog-confirmation.component.css']
})
export class DialogConfirmationComponent implements OnInit{

  constructor(
    public dialogRef: MatDialogRef<DialogConfirmationComponent>,
    private dataService: DataService,
    private snack: SnackbarService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: Dialog,
  ) {}

  ngOnInit(): void {

    if(this.data.passwordBox)
    {
      this.getUser();
    }
  }

  //Resultado dos confirms
  onConfirm(result: boolean): void {
    this.dialogRef.close(result);
  }

  deleteCampo(campos: Array<{id: number, hour: string, categoria: string, pessoa: string}>, id: number) {
    // Verificar se a posição fornecida é válida
    this.dialogRef.close(campos.filter(campo => campo.id != id));
  }

  //Password
  userObj: Usuario = {
    Nome: '',
    Sobrenome: '',
    Senha: 'igest',
    Perfil: '',
    Igreja: '',
    CreatedAt: '',
    UpdatedAt: '',
    DeletedAt: '',
  }
  Id: string = '';
  Nome: string = '';
  SenhaAtual: string = '';
  Senha: string = '';
  NovaSenha: string = '';
  ConfirmarSenha: string = '';
  hide = true;
  hideNew = true;
  hideConfirm = true;

  getUser()
  {
    this.dataService.getAllUsers().subscribe(res =>
      {
        if(res)
        {
          const token = localStorage.getItem('token');
          const dados = token?.split('.') ? token.split('.') : '';
  
          //Mapeia o resultado
          let usuarios = res.map((e: any) =>
            {
              const data = e.payload.doc.data();
              data.id = e.payload.doc.id;
              return data;
            })
          usuarios = usuarios.filter(user => user.id == dados[0]);
          const usuario = usuarios[0];
          this.Nome = usuario.Nome;
          this.SenhaAtual = usuario.Senha;
          this.Id = dados[0];
          this.userObj = usuario;
        }
        else 
        {
          this.onConfirm(false);
        }
      })
  }

  salvePassword()
  {
    if(this.Senha == this.SenhaAtual)
    {
      if(this.NovaSenha == this.ConfirmarSenha)
      {
        this.userObj.Senha = this.NovaSenha;
        this.dataService.updateUser(this.userObj, this.Id);
        this.onConfirm(true);
      }
      else 
      {
        this.snack.openSnackBar('Senhas diferentes!')
      }
    }
    else 
    {
      this.snack.openSnackBar('Senha atual incorreta!');
    }
  }

  copy()
  {
    const dados = this.data.escalaView;
    let str = ''
    dados.forEach(dado => 
      {
        str += `*${dado.hour}* - ${dado.categoria}\n\tPessoa: ${dado.pessoa}\n\tobs.: ${dado.descricao}\n`
      })
    navigator.clipboard.writeText(str)
    .then(() => {
      this.snack.openSnackBar('Escala copiada!');
    })
    .catch(err => {
      this.snack.openSnackBar('Erro ao copiar escala!');
    });
  }
}
