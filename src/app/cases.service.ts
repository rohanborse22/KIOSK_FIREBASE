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
   this.firestore.collection('cases').valueChanges();
    //  console.log(this.CasesCollection);
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

  case_list(){
    return this.firestore.collection('cases').valueChanges({idField:'customIdName'});
  }

  sellectAllNews1(id) {
   return this.firestore.collection('cases').doc(id).valueChanges();
  }

  sellectAllNews2(kiosk_id) {
    return this.firestore.collection('kiosk').doc(kiosk_id).valueChanges();
   }

  //  volunteer_list(kiosk_id){
  //   return this.firestore.collection('volunteer', ref => ref.where('kiosk_id', '==', kiosk_id)).valueChanges();
  //  }
  
  volunteer_list(){
    return this.firestore.collection('volunteer').valueChanges();
   }

   update_case_sms(_id: string, _value: string) {
     console.log(_id + _value);
    this.firestore.collection('cases').doc(_id).update({sms:_value});
    // let doc = this.firestore.collection('cases', ref => ref.where('datetime', '==', _id));
    // doc.snapshotChanges().subscribe((res: any) => {
    //   let id = res[0].payload.doc.id;
    //   this.firestore.collection('cases').doc(id).update({sms:_value});
    // });
  }

    getObjectById(id) { 
      return this.firestore.collection('cases').valueChanges();
  }

  hospital_list(hospital_lat,hospital_lng)
  {
    return this.httpClient.get('http://kodwell.co.uk/KIOSK_API/KIOSK_SUPPORT/kiosk/getListWithDataHospital?lat='+hospital_lat+'&lng='+hospital_lng+'&count=5&case_type=2&pagetoken=') ;

  }
  police_list(police_lat,police_lng)
  {    
    
    return this.httpClient.get('http://kodwell.co.uk/KIOSK_API/KIOSK_SUPPORT/kiosk/getListWithDataPolice?lat='+police_lat+'&lng='+police_lng+'&count=5&case_type=2&pagetoken=');

  }

  send_kiosk_sms(number)
  {
    // link for twilio - return this.httpClient.get('http://kodwell.co.uk/kios_volunteer_sms/myfile.php?phone='+number+'&msg=KIOSK Emergency Alert - CITY CENTER MALL!LIVE VIDEO : https://youtu.be/nSUOchCqpm8');
   
    // link for textlocal -
     return this.httpClient.get('http://kodwell.com/kiosk_sms_alert/sendsms/index/'+number+'');

  }


  // getCases() {
  //   return this.firestore.collection("cases").snapshotChanges();
  // }

  // getCasesCount() {
  //   return this.firestore.collection("cases").valueChanges();
  // }


}  
