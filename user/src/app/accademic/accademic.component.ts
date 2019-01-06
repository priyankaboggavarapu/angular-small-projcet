import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service'

@Component({
  selector: 'app-accademic',
  templateUrl: './accademic.component.html',
  styleUrls: ['./accademic.component.css']
})
export class AccademicComponent implements OnInit {
success:boolean=false;
 contact = {
     CurrentLocation:""
 }
  constructor(private commonservice: CommonService) { }

  send(contactForm) {
    var url = "/api/contact/create";
    this.commonservice.CreateContact(url, this.contact)
      .subscribe(result => {
       this.success=!this.success;
        console.log(result);
          contactForm.reset();
        setInterval(()=>{
          this.success=false;
          this.contact=null;
        },5000)
      })
  }


  getAddress(place: Object) {

    console.log("Address Object", place);
    this.contact.CurrentLocation = place['formatted_address'];

    this.contact.CurrentLocation = this.contact.CurrentLocation;

  }

  ngOnInit() {
  }

}
