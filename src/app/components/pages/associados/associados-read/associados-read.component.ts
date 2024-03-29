import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { user } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/components/models/usuario';
import { DataService } from 'src/app/components/services/data.service';
import { HeaderService } from 'src/app/components/services/header.service';
import { SnackbarService } from 'src/app/components/services/snackbar.service';
import { DialogConfirmationComponent } from 'src/app/components/template/dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-associados-read',
  templateUrl: './associados-read.component.html',
  styleUrls: ['./associados-read.component.css']
})
export class AssociadosReadComponent implements AfterViewInit, OnInit{

  constructor(
    private data: DataService,
    private snack: SnackbarService,
    private dialog: MatDialog,
    private headerService: HeaderService) {
    headerService.headerData = {
      title: 'Associados',
      icon: 'people',
      routerLink: 'associados'
    }
  }

  //TABLE CONFIG
  displayedColumns: string[] = ['id', 'first_name', 'actions'];
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  dataSource = new MatTableDataSource<Usuario>();

  //USER LIST
  usersList: Usuario[] = [];  
  ngOnInit(): void {
    // this.getAllUsers()
  }

  // getAllUsers()
  // {
  //   //Consulta o serviço correspondente
  //   this.data.getAllUsers().subscribe(res =>
  //     {
  //       //Mapeia o resultado
  //       this.usersList = res.map((e: any) =>
  //         {
  //           const data = e.payload.doc.data();
  //           data.id = e.payload.doc.id;
  //           return data;
  //         })
  //         this.usersList = this.usersList.filter(this.isPerfilAssociado)
  //         this.usersList = this.notMyAssociado(this.usersList)
  //         //Passa a lista para o data usado na table
  //       this.dataSource = new MatTableDataSource<User>(this.usersList);
  //     }, err => 
  //     {
  //       //Mensagem de erro
  //       this.snack.openSnackBar(`Erro de busca: ${err}`)
  //     })
  // }

  // isPerfilAssociado(user: any)
  // {
  //   return user.perfil == 'associado'
  // }

  // notMyAssociado(users: User[])
  // {
  //   let newList: User[] = [];
  //   users.forEach(user =>
  //     {
  //       if(user.departamentos)
  //       {
  //         let notMyDepartamento = user.departamentos.replace(`${localStorage.getItem('usermask_id')}`,'');
  //         if(user.departamentos == notMyDepartamento)
  //         {
  //           newList.push(user)
  //         }
  //       }
  //     })
  //   return newList;
  // }

  // deleteUser(id: string, name: string = '')
  // {
  //   const dialogRef = this.dialog.open(DialogConfirmationComponent, {
  //     data: {title: `Deseja excluir ${name}?`, confirm: true},
  //   });

  //   dialogRef.afterClosed().subscribe((result: boolean) => {
  //     if(result)
  //     {
  //       this.data.deleteUser(id);
  //     }
  //   });
  // }

  // addAssociadoEquipe(user: User)
  // {
  //   if(user.departamentos)
  //   {
  //     user.departamentos += user.departamentos.length <= 0
  //       ? `${localStorage.getItem('usermask_id')},${localStorage.getItem('usermask_name')},false`
  //       : `/${localStorage.getItem('usermask_id')},${localStorage.getItem('usermask_name')},false`;
  //   }
  //   else 
  //   {
  //     user.departamentos = `${localStorage.getItem('usermask_id')},${localStorage.getItem('usermask_name')},false`;
  //   }

  //   const dialogRef = this.dialog.open(DialogConfirmationComponent, {
  //     data: {title: `Deseja adicionar ${user.user_name} a equipe?`, confirm: true},
  //   });

  //   dialogRef.afterClosed().subscribe((result: boolean) => {
  //     if(result)
  //     {
  //       this.data.updateUser(user, String(user.id));
  //     }
  //   });
  // }
}