import { MatDialog } from '@angular/material/dialog';
import { Usuario } from '../../../models/usuario';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HeaderService } from 'src/app/components/services/header.service';
import { DialogConfirmationComponent } from 'src/app/components/template/dialog-confirmation/dialog-confirmation.component';
import { SnackbarService } from 'src/app/components/services/snackbar.service';
import { DataService } from 'src/app/components/services/data.service';

@Component({
  selector: 'app-usuarios-read',
  templateUrl: './usuarios-read.component.html',
  styleUrls: ['./usuarios-read.component.css']
})
export class UsuariosReadComponent implements AfterViewInit, OnInit{

  constructor(
    private data: DataService,
    private snack: SnackbarService,
    private dialog: MatDialog,
    private headerService: HeaderService) {
    headerService.headerData = {
      title: 'Usuários',
      icon: 'house',
      routerLink: 'usuarios'
    }
  }

  //TABLE CONFIG
  displayedColumns: string[] = ['Nome', 'Sobrenome', 'actions'];
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  dataSource = new MatTableDataSource<Usuario>();

  //USER LIST
  usersList: Usuario[] = [];
  ngOnInit(): void {
    this.getAllUsers()
  }

  getAllUsers()
  {
    //Consulta o serviço correspondente
    this.data.getAllUsers().subscribe(res =>
      {
        const token = localStorage.getItem('token');
        const dados = token?.split('.') ? token.split('.') : '';

        //Mapeia o resultado
        this.usersList = res.map((e: any) =>
          {
            const data = e.payload.doc.data();
            data.id = e.payload.doc.id;
            return data;
          })
        this.usersList = this.usersList.filter(user => user.Igreja == dados[2] && !user.DeletedAt); //Da minha Igreja e Não Excluido
        const comunicador = this.usersList.filter(user => user.Perfil == 'ZUI4ZeBuafPlyYRKQIqV');
        const diretor = this.usersList.filter(user => user.Perfil == '7m3EhRYDiAIK7IuF2Ba5');
        const associado = this.usersList.filter(user => user.Perfil == 'aBT94LdeklllCbeSKDrg');
        this.usersList = comunicador.concat(diretor.concat(associado));//Ordernar a lista em Comunicador/Diretor/Associado cima para baixo
        //Passa a lista para o data usado na table
        this.dataSource = new MatTableDataSource<Usuario>(this.usersList);
      }, err => 
      {
        //Mensagem de erro
        this.snack.openSnackBar(`Erro de busca: ${err}`)
      })
  }

  delete(usuario: Usuario, id: string)
  {
    usuario.DeletedAt = `${new Date()}`;
    this.data.deleteUser(usuario, id).finally(() => {
      location.reload();
    })
  }

  buscarUser(id: string)
  {
    let usuario: any;
    this.data.getAllUsers().subscribe(res =>
      {
        //Mapeia o resultado
        usuario = res.map((e: any) =>
        {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        })

        usuario = usuario.filter((user: any) => user.id == id);
        this.delete(usuario[0], id);
      })
  }

  deleteUser(id: string, name: string)
  {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: {title: `Deseja excluir ${name}?`, confirm: true},
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result)
      {
        this.buscarUser(id);
      }
    });
  }
}
