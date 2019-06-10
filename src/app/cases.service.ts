import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, combineLatest } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { Cases, Kiosk, Feed } from '../app/app.module';
import { DatePipe } from '@angular/common';
import {NgPipesModule} from 'ngx-pipes';
@Injectable({
  providedIn: 'root',
})


export class CasesService {
  forEach(arg0: (value: any) => void) {
    throw new Error("Method not implemented.");
  }
  CasesCollection: AngularFirestoreCollection<Cases>;
  feedItem: Observable<Feed[]>;
  constructor(private firestore: AngularFirestore) { }


  collectionInitialization() {
    this.CasesCollection = this.firestore.collection('cases');
    this.feedItem = this.CasesCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(change => {
        const data = change.payload.doc.data();
        const kiosk_id = data.kiosk_id;
        const datetime = data.datetime;
        return this.firestore.doc('kiosk/' + kiosk_id).valueChanges().pipe(map((KioskData: Kiosk) => {
          return Object.assign(
            { Address: KioskData.Address, name: KioskData.name, kiosk_id: kiosk_id, datetime: datetime });
        }
        ));
      });
    }), flatMap(feeds => combineLatest(feeds)));
  }

  sellectAllNews() {
    this.collectionInitialization();
    return this.feedItem;
    // console.log(this.feedItem);
  }





  //   getObjectById(id) { 
  //     return this.firestore.collection('case_details').doc(id).valueChanges()
  // }

  getCases() {
    return this.firestore.collection("cases").snapshotChanges();
  }

  getCasesCount() {
    return this.firestore.collection("cases").valueChanges();
  }


}  
