import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument  } from '@angular/fire/firestore';
import { Observable, combineLatest } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { Cases, Kiosk, Feed } from '../app/app.module';
import { DatePipe } from '@angular/common';
import {NgPipesModule} from 'ngx-pipes';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class CasesService {
  id: any;
  items: Observable<Cases[]>;
  case_id: any;
  currentMessage: any;
  // forEach(arg0: (value: any) => void) {
  //   throw new Error("Method not implemented.");
  // }
  CasesCollection: AngularFirestoreCollection<Cases>;
  feedItem: Observable<Feed[]>;

  CasesCollection1: AngularFirestoreCollection<Cases>;
  feedItem1: Observable<Feed[]>;

  constructor(private firestore: AngularFirestore,private httpClient:HttpClient) { }
  collectionInitialization() {
    // this.CasesCollection = this.firestore.collection('cases');    
    this.CasesCollection = this.firestore.collection('cases',ref=>ref.orderBy('datetime','desc'));
    this.feedItem = this.CasesCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(change => {
        const data = change.payload.doc.data();
        this.id =change.payload.doc.id;
        const orderCollection=this.firestore.collection('cases');
        const kiosk_id = data.kiosk_id;
        const datetime = data.datetime;
        const id=this.id;
        return this.firestore.doc('kiosk/' + kiosk_id).valueChanges().pipe(map((KioskData: Kiosk) => {
          return Object.assign(
            { Address: KioskData.Address,case_id:id,name: KioskData.name,kiosk_id: kiosk_id,datetime: datetime });
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


  collectionInitialization1(case_id) {
  
    this.CasesCollection = this.firestore.collection('cases');
    console.log(this.CasesCollection);
  //  this.CasesCollection1 = this.firestore.collection('cases');
  //   this.feedItem1 = this.CasesCollection1.snapshotChanges().pipe(map(changes => {
  //     return changes.map(change => {
  //       const data = change.payload.doc.data();
  //       this.id =change.payload.doc.id;
  //       const orderCollection=this.firestore.collection('cases');
  //       const kiosk_id = data.kiosk_id;
  //       const datetime = data.datetime;
  //       const id=this.id;
  //       return this.firestore.doc('kiosk/' + kiosk_id).valueChanges().pipe(map((KioskData: Kiosk) => {
  //         return Object.assign(
  //           { Address: KioskData.Address,case_id:id, name: KioskData.name, kiosk_id: kiosk_id, datetime: datetime });
  //       }
  //       ));
  //     });
  //   }), flatMap(feeds => combineLatest(feeds)));
  }

  sellectAllNews1(id) {
   return this.firestore.collection('cases').doc(id).valueChanges();

  }

  sellectAllNews2(kiosk_id) {
    return this.firestore.collection('kiosk').doc(kiosk_id).valueChanges();
 
   }

    getObjectById(id) { 
      return this.firestore.collection('cases').doc(id).valueChanges();
  }

  hospital_list(hospital_lat,hospital_lng)
  {
    return this.httpClient.get('http://kodwell.co.uk/KIOSK_API/KIOSK_SUPPORT/kiosk/getListWithDataHospital?lat=19.9975&lng=73.7898&count=5&case_type=2&pagetoken=') ;

  }
  police_list(police_lat,police_lng)
  {    
    
    return this.httpClient.get('http://kodwell.co.uk/KIOSK_API/KIOSK_SUPPORT/kiosk/getListWithDataPolice?lat='+police_lat+'&lng='+police_lng+'&count=5&case_type=2&pagetoken=');

  }


  // getCases() {
  //   return this.firestore.collection("cases").snapshotChanges();
  // }

  // getCasesCount() {
  //   return this.firestore.collection("cases").valueChanges();
  // }


}  
