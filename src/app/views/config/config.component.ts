import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/components/services/auth.service';
import { BodyService } from 'src/app/components/services/body.service';
import { HeaderService } from 'src/app/components/services/header.service';
import { SnackbarService } from 'src/app/components/services/snackbar.service';
import { DialogConfirmationComponent } from 'src/app/components/template/dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit{

  theme: boolean = true;

  constructor(
    private auth : AuthService,
    private dialog: MatDialog,
    private snack: SnackbarService,
    private bodyService: BodyService,
    private headerService: HeaderService) {
      headerService.headerData = {
        title: 'Config.',
        icon: 'settings',
        routerLink: 'config'
      }
    }

  ngOnInit(): void {
    this.auth.auth_guard();
  }

  logout()
  {
    this.auth.logout();
  }

  editPassword()
  {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: 
      {
        passwordBox: true,
      },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result)
      {
        this.snack.openSnackBar('Senha alterada!')
      }
    });
  }

  copiarTexto(num: string) 
  {
    navigator.clipboard.writeText(num)
    .then(() =>
    {
      this.snack.openSnackBar(`Número de suporte ${num} - Nathan copiado!`, 3500);
    })
    .catch(erro =>
      {
        this.snack.openSnackBar(`Erro ao copiar o número de suporte!`, 3000);
        console.log(erro);
      })
  }

  isTheme(type: string)
  {
    localStorage.setItem("theme", type);
    this.bodyService.appTheme = {
      theme: type
    };
    this.theme = type == 'dark-theme' ? true : false;
  }
}
