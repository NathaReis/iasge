import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Materiais
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatTreeModule } from '@angular/material/tree';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { HeaderComponent } from './components/template/header/header.component';
import { BodyComponent } from './components/template/body/body.component';

import { EscalasComponent } from './views/escalas/escalas.component';
import { EscalasReadComponent } from './components/pages/escalas/escalas-read/escalas-read.component';
import { EscalasCreateComponent } from './components/pages/escalas/escalas-create/escalas-create.component';

import { EventosComponent } from './views/eventos/eventos.component';
import { EventosCreateComponent } from './components/pages/eventos/eventos-create/eventos-create.component';
import { EventosReadComponent } from './components/pages/eventos/eventos-read/eventos-read.component';

import { UsuariosComponent } from './views/usuarios/usuarios.component';
import { UsuariosReadComponent } from './components/pages/usuarios/usuarios-read/usuarios-read.component';
import { UsuariosEditComponent } from './components/pages/usuarios/usuarios-edit/usuarios-edit.component';
import { UsuariosCreateComponent } from './components/pages/usuarios/usuarios-create/usuarios-create.component';

import { AssociadosComponent } from './views/associados/associados.component';
import { AssociadosReadComponent } from './components/pages/associados/associados-read/associados-read.component';
import { AssociadosEditComponent } from './components/pages/associados/associados-edit/associados-edit.component';
import { AssociadosCreateComponent } from './components/pages/associados/associados-create/associados-create.component';
import { AssociadosMyreadComponent } from './components/pages/associados/associados-myread/associados-myread.component';

import { LoginComponent } from './components/pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { ConfigComponent } from './views/config/config.component';

import { DialogConfirmationComponent } from './components/template/dialog-confirmation/dialog-confirmation.component';

//Fire
import { AngularFireModule } from '@angular/fire/compat';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { ambiente } from 'src/ambiente/ambiente';
import { FormEventComponent } from './components/template/form-event/form-event.component';
import { EventosEditComponent } from './components/pages/eventos/eventos-edit/eventos-edit.component';
import { EscalasEditComponent } from './components/pages/escalas/escalas-edit/escalas-edit.component';
import { FormEscalaComponent } from './components/template/form-escala/form-escala.component';
import { PerfilComponent } from './components/pages/perfil/perfil.component';
import { IgrejaComponent } from './components/pages/igreja/igreja.component';
import { DistritoComponent } from './components/pages/distrito/distrito.component';
import { PerfiligrejasistemasComponent } from './views/perfiligrejasistemas/perfiligrejasistemas.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EventosComponent,
    EscalasComponent,
    EventosCreateComponent,
    EscalasCreateComponent,
    LoginComponent,
    ConfigComponent,
    HeaderComponent,
    BodyComponent,
    DialogConfirmationComponent,
    AssociadosComponent,
    AssociadosReadComponent,
    AssociadosEditComponent,
    AssociadosCreateComponent,
    AssociadosMyreadComponent,
    EventosReadComponent,
    EscalasReadComponent,
    FormEventComponent,
    EventosEditComponent,
    EscalasEditComponent,
    FormEscalaComponent,
    UsuariosComponent,
    UsuariosReadComponent,
    UsuariosEditComponent,
    UsuariosCreateComponent,
    PerfilComponent,
    IgrejaComponent,
    DistritoComponent,
    PerfiligrejasistemasComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(ambiente.firebaseConfig),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    FullCalendarModule,
    MatRadioModule,
    MatCardModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatTreeModule,
    provideFirebaseApp(() => initializeApp({"projectId":"iasgestao","appId":"1:634292682476:web:38ff865f29151abb53efc9","storageBucket":"iasgestao.appspot.com","apiKey":"AIzaSyDM_8ffyG8YjOvCh2mtu9bO8iYYMBqIpk0","authDomain":"iasgestao.firebaseapp.com","messagingSenderId":"634292682476"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
