import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Usuario } from '../models/usuario';
import { Event } from '../models/event';
import { Escala } from '../models/escala';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs : AngularFirestore) { }

  //Usuarios
  // PESQUISA
  getAllUsers()
  {
    const token = localStorage.getItem('token');
    const dados = token?.split('.') ? token.split('.') : '';

    return this.afs.collection('/usuario').snapshotChanges();
    // MAIS VIÁVEL 
    // return this.afs.collection('sistemas', ref => {
    //   return ref
    //   .where('Igreja', '==', dados[2])
    // }).valueChanges();  
  }
  // get one usuario
  getUser(id?: string)
  {
    // return this.afs.doc(`/igreja/${id}`).get();
    return this.afs.collection('usuario', ref => {
      return ref
      .where('Uid', '==', id)
    }).valueChanges();
  }
  // FUNÇÕES
  // add 
  addUser(user: Usuario)
  {
    return this.afs.collection('/usuario').add(user);
  }
  // delete 
  deleteUser(user: Usuario, id: string)
  {
    return this.afs.doc(`/usuario/${id}`).update(user);
  }
  // update 
  updateUser(user: Usuario, id: string)
  {
    return this.afs.doc(`/usuario/${id}`).update(user);
  }

  //Perfil
  getPerfil(sistema: string)
  {
    return this.afs.collection('sistemas', ref => {
      return ref
      .where('Sistema', '==', sistema)
    }).valueChanges();  
  }

  //PerfilSistemas
  getPerfilSistemas(perfil: string, igreja: string)
  {
    return this.afs.collection('perfiligrejasistemas', ref => {
      return ref
      .where('Perfil', '==', perfil)
      .where('Igreja', '==', igreja)
    }).valueChanges();
  }

  //EVENT
  // add user
  async addEvent(event: Event): Promise<any>
  {
    event.id = this.afs.createId();
    return this.afs.collection('/events').add(event);
  }
  // get all events
  getAllEvents()
  {
    return this.afs.collection('/events').snapshotChanges();
  }
  // get one users
  getEvent(id: string)
  {
    return this.afs.doc(`/events/${id}`).get();
  }
  // delete user
  async deleteEvent(id: string): Promise<any>
  {
    return this.afs.doc(`/events/${id}`).delete();
  }
  // update user
  async updateEvent(event: Event, id: string): Promise<any>
  {
    return this.afs.doc(`events/${id}`).update(event);
  }

  //ESCALAS
  // add escala
  addEscala(escala: Escala)
  {
    escala.id = this.afs.createId();
    return this.afs.collection('/escalas').add(escala);
  }
  // get all escalas
  getAllEscalas()
  {
    return this.afs.collection('/escalas').snapshotChanges();
  }
  // get one escala
  getEscala(id: string)
  {
    return this.afs.doc(`/escalas/${id}`).get();
  }
  // delete escala
  deleteEscala(id: string)
  {
    return this.afs.doc(`/escalas/${id}`).delete();
  }
  // update escala
  updateEscala(escala: Escala, id: string)
  {
    this.afs.doc(`escalas/${id}`).update(escala);
  }
}
