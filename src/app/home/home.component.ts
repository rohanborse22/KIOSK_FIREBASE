import { Component, OnInit } from '@angular/core';
import { CasesService } from '../cases.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public case_count: number;

  count = {
    countTo: this.case_count,
    from: 0,
    duration: 1
  };
  case_details: {};
  case_list: any;

  constructor(private firebaseService: CasesService,private datePipe: DatePipe) { }

  ngOnInit() {
    var ddMMyyyy = this.datePipe.transform(new Date(),"dd-MM-yyyy");
    // console.log(ddMMyyyy); //output - 14-02-2019
    var MMddyyyy = this.datePipe.transform(new Date(),"MM-dd-yyyy");
    // console.log(MMddyyyy); //output - 14-02-2019
    var short = this.datePipe.transform(new Date(),"M/d/yy");
    // console.log(short); //output - 2/14/19
    var medium = this.datePipe.transform(new Date(),"MMM d, y, h:mm:ss a");
    // console.log(medium); //output - Feb 14, 2019, 3:45:06 PM
    
    // this.getCases();
    // this.getCasesDetails();
    // this.getObjectById();
    this.firebaseService.sellectAllNews().subscribe(case_list => {
      this.case_list = case_list;
      this.case_count = case_list.length;
      console.log(case_list);
    })
  }

  cases;


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

