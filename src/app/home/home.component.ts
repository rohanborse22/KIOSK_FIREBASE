import { Component, OnInit } from '@angular/core';
import { CasesService } from '../cases.service';
import { Router,ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument  } from '@angular/fire/firestore';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Howl, Howler} from 'howler';
import { ToastrService } from 'ngx-toastr';
import 'rxjs/add/operator/take';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  sound = new Howl({
    src: ['../../../assets/bootstrap/audio/danger-alarm-23793.mp3']
 });
 status: boolean = false;
  p: number = 1;
  collection: any[];  
  public case_count: number;
  count = {
    countTo: this.case_count,
    from: 0,
    duration: 1
  };

  
  
  case_details: {};
  case_list: any;
  public volunteer_list:any[];
  volunteer_case_list: any[];
  get_volunteer_list: unknown[];
  itemCollection: any;
  unread_case_count: number;
  public unread_case_count_status = true;
 
  constructor(private toastr: ToastrService,private httpClient:HttpClient,private firestore: AngularFirestore,public firebaseService: CasesService, 
    private datePipe: DatePipe,private router:Router) {
    // this.firebaseService.volunteer_list().subscribe(volunteer_list => {
    //   this.volunteer_list = volunteer_list;
    //   console.log(this.volunteer_list);
    // });
   }
   clickEvent(){
    this.status = !this.status;    
    }
  ngOnInit() {
    var ddMMyyyy = this.datePipe.transform(new Date(), "dd-MM-yyyy");
    // console.log(ddMMyyyy); //output - 14-02-2019
    var MMddyyyy = this.datePipe.transform(new Date(), "MM-dd-yyyy");
    // console.log(MMddyyyy); //output - 14-02-2019
    var short = this.datePipe.transform(new Date(), "M/d/yy");
    // console.log(short); //output - 2/14/19
    var medium = this.datePipe.transform(new Date(), "MMM d, y, h:mm:ss a");
    // console.log(medium); //output - Feb 14, 2019, 3:45:06 PM
    // this.getCases();
    // this.getCasesDetails();
    // this.getObjectById();

    this.firebaseService.unread_case_count().subscribe(unread_case_list => {
      this.unread_case_count=unread_case_list.length;
      if(this.unread_case_count==0)
      {
        this.unread_case_count_status=false;
      }
      else{
      this.unread_case_count_status=true;
       }
      console.log("unread",unread_case_list.length);
    })

    this.firebaseService.sellectAllNews().subscribe(case_list => {
      this.case_list = case_list;
      this.case_count = case_list.length;
      console.log("view case count:",this.case_count);
      console.log("view case list:",this.case_list);
    })

 
    this.firebaseService.case_list().subscribe(volunteer_case_list => {
      this.volunteer_case_list = volunteer_case_list;
      for(let case_value of volunteer_case_list ) {
        if(case_value['sms']==null)
        {
            this.sound.play();
            this.toastr.warning("Alert ! New case created.");
            this.firebaseService.volunteer_list().take(1).subscribe(get_volunteer_list => {
            this.get_volunteer_list = get_volunteer_list;
            for(let value of get_volunteer_list )
            {
               // this.firebaseService.update_case_sms(case_value['customIdName'],'1');
               // KIOSK Emergency Alert -CITY CENTER! \n LIVE VIDEO : https://youtu.be/nSUOchCqpm8
              // var sms_log= this.httpClient.get('http://kodwell.co.uk/kios_volunteer_sms/myfile.php?phone='+value['phone']+'&msg=KIOSK Emergency Alert -CITY CENTER! \n LIVE VIDEO : https://youtu.be/nSUOchCqpm8');
                console.log("get_volunteer_list_value",value); 
                this.firebaseService.send_kiosk_sms(value['phone']).subscribe(sms_status =>{
              console.log("sms ststus:",sms_status);
              this.firebaseService.update_case_sms(case_value['customIdName'],'1');
             });           
            }
          })
        }
        // else{
          // console.log("else");
          // var sms_status=this.httpClient.get('http://kodwell.co.uk/kios_volunteer_sms/myfile.php?phone=8208755519&msg=hello%20avinash%20test');
        // this.firebaseService.send_kiosk_sms('7767057209','sms').subscribe(sms_status =>{
        //   console.log(sms_status);
        //  });
         
          
        // }
      }
      // this.case_count = volunteer_case_list.length;
      // volunteer_case_list.forEach(function(value){
      //   if(value['sms']==null)
      //   { 
      //     console.log(this.volunteer_case_list);
      //     //sms send karneka code hona chaiye 
      //     //yahape value update karneka code hona chaiye 
      //   }
      //     console.log(value['sms']);
      //   })

     console.log("volunteer case list",this.volunteer_case_list);
    })

  }

  cases;
  goToProductDetails(id){
    this.router.navigate(['/product-details', id]);
  }

  
  //   getObjectById=()=>
  //   this.firebaseService.getObjectById(this.getCases['kiosk_id']).subscribe( i => {
  //     this.case_details = 1;
  //     console.log(this.case_details);
  // })


  // getCases = () =>
  //   this.firebaseService
  //     .getCases()
  //     .subscribe((result) => { this.cases = result; console.log(this.cases) })
  // getCasesDetails = () =>
  // this.getCasesDetails()
  // .subscribe((result) => { this.case_count = result.length; console.log(this.case_count)})

}

