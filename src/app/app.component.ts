import { AfterViewInit, Component, ElementRef, Inject, OnInit, Optional, ViewChild, ViewContainerRef } from '@angular/core';
import { RoomsComponent } from './rooms/rooms.component';
import { LoggerService } from './logger.service';
import {localStorageToken} from "./localstorage.token" 
import { InitService } from './init.service';
import { ConfigService } from './service/config.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // template: `<h1>hello world</h1>
  // <p>awsome</p>`,
  styleUrls: ['./app.component.scss'],
  styles: [`h1{color:red;}`]
})
export class AppComponent implements OnInit {
  title = 'hotelinventoryapp';
  role = "Admin"
  @ViewChild('name', {static: true}) name!: ElementRef;

constructor(@Optional() private loggerService:LoggerService,
@Inject(localStorageToken) private localStorage:Storage,
private initService: InitService,
private configService : ConfigService,
private router: Router
){
  console.log(initService.config);
}

  ngOnInit(): void {
    // this.router.events.subscribe((event) => {
    //   console.log(event);
    // })

    this.router.events.pipe(
      filter((event) => event instanceof NavigationStart)
    ).subscribe((event)=>{
      console.log('Navigation Started')
    })

    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe((event)=>{
      console.log('Navigation Completed')
    })

    this.name.nativeElement.innerText = "Test"
    this.localStorage.setItem('name','hotel a')
    console.log("asdasdasd")
    console.log(this.initService.config);
  }

//   @ViewChild('user', { read: ViewContainerRef }) vcr!: ViewContainerRef;

//  ngAfterViewInit(): void {
//   const componentRef = this.vcr.createComponent(RoomsComponent);
//   componentRef.instance.numberOfRooms = 12;
//  }
}


