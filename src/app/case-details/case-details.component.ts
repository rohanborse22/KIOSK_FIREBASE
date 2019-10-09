import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { CasesService } from '../cases.service';
import { DomSanitizer } from '@angular/platform-browser';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from '../service/authentication.service';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-case-details',
  templateUrl: './case-details.component.html',
  styleUrls: ['./case-details.component.css']
})

export class CaseDetailsComponent implements OnInit {
  id: number;
  private sub: any;
  details: any;
  kiosk_id: any;
  case_list: import("c:/Users/rohan/Desktop/kiosk/src/app/app.module").Feed[];
  case_details: any;
  clientCollection: unknown;
  kiosk_details: unknown;
  datetime: any;
  name: any;
  link: any;
  address: any;
  lat: number;
  lng: number;
  police_list: Object;
  hospital_list: Object;
  volunteer_list:any;
  userDetails: any;
  user_email: any;
  constructor(private router:Router,private route: ActivatedRoute,private authService: AuthenticationService,private datePipe: DatePipe,private sanitizer:DomSanitizer,private firebaseService: CasesService, private firestore: AngularFirestore) { }

  ngOnInit() {
    var ddMMyyyy = this.datePipe.transform(new Date(), "dd-MM-yyyy");
    // console.log(ddMMyyyy); //output - 14-02-2019
    var MMddyyyy = this.datePipe.transform(new Date(), "MM-dd-yyyy");
    // console.log(MMddyyyy); //output - 14-02-2019
    var short = this.datePipe.transform(new Date(), "M/d/yy");
    // console.log(short); //output - 2/14/19
    var medium = this.datePipe.transform(new Date(), "MMM d, y, h:mm:ss a");
    // console.log(medium); //output - Feb 14, 2019, 3:45:06 PM
    this.userDetails = this.authService.isUserLoggedIn();
    this.user_email=this.userDetails.email;

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.sellectAllNews1(this.id);
      // this.hospital_list();
      // this.police_list();
    });

  }

  logoutUser() {
    this.authService.logout()
      .then(res => {
        console.log(res);
        this.userDetails = undefined;
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
      }, err => {
      alert(err.message);
      });
  }
 

  sellectAllNews1 = (id) => this.firebaseService.sellectAllNews1(id).subscribe(i => {
    this.case_details = i;
    console.log("case_id",this.id);
    console.log('case_id:',this.case_details.kiosk_id);

    this.firestore.collection('cases').doc(id).update({button_id:"2"});
    this.firebaseService.sellectAllNews2(this.case_details.kiosk_id).subscribe(async i => {
      this.kiosk_details = i;
      const clients = [];
      clients.push(this.case_details);
      clients.push(this.kiosk_details);
      const res =await Promise.all(clients);
      console.log(res);
      this.datetime=res[0].datetime;
      console.log("date",this.datetime);
      this.name=res[1].name;
      this.address=res[1].Address;
      this.lat=res[1].lat;
      this.lng=res[1].long;
      this.link=this.sanitizer.bypassSecurityTrustResourceUrl(res[1].link);
      // console.log(this.name);
      this.firebaseService.police_list(this.lat, this.lng).subscribe(data => {
        console.log(data);
        this.police_list=data;
        

      });
      this.firebaseService.hospital_list(this.lat, this.lng).subscribe(data => {
        console.log(data);
        this.hospital_list=data;
     
        
      });
      // this.case_details.kiosk_id pass kara volunteer_list function madhye
      this.firebaseService.volunteer_list().subscribe(volunteer_list => {
        this.volunteer_list = volunteer_list;
        // this.case_count = volunteer_list.length;
        console.log(volunteer_list);
      })
    });
  })


  getObjectById = () =>
    this.firebaseService.getObjectById(this.id).subscribe(i => {
      this.case_details = i;
      console.log(this.case_details);
    })

  // 
  // This case list display remaing listing
  // public hospital_list() {
  //   this.firebaseService.hospital_list(19.9975,73.7898).subscribe(data => {
  //     console.log("hospital_list",data);
  //     // this.case_info = JSON.stringify(data);
  //     // let case_info = JSON.parse(this.case_info);
  //     // this.hospital_lat = parseFloat(case_info.lat);
  //     // this.hospital_lng = parseFloat(case_info.lng);
  //     // console.log("Latitude/Longitude", this.hospital_lat);
  //     // this.apiService
  //     //   .hospital_list(this.hospital_lat, this.hospital_lng)
  //     //   .subscribe(data => {
  //     //     this.hospital_list1 = data;
  //     //     console.log("hospital Lists", this.hospital_list1);
  //     //   });
  //   });
  // }

  // This case list display remaing listing
  // public police_list() {
  // //   this.firebaseService.currentMessage.subscribe(data => {
  // //     this.case_info = JSON.stringify(data);
  // //     let case_info = JSON.parse(this.case_info);
  // //     this.police_lat = case_info.lat;
  // //     this.police_lng = case_info.lng;

  // //     // console.log(case_info.case_id);
  //     this.firebaseService
  //       .police_list(19.9975,73.7898)
  //       .subscribe(data => {
  //         // this.police_list1 = data;
  //         // console.log("Police Lists", this.police_list1);
  //         console.log('poloice data',data);
  //       });
  // //   });
  // // }

}
