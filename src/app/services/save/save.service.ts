import { Teacher } from './../../models/models';
import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SaveService {

  constructor(private db: AngularFirestore) { }


  public addTeacher(payload: Teacher){
    return this.db.collection('teachers').doc(payload.teacherId).set(payload);
  }
}
