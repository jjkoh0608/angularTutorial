import { AfterViewChecked, AfterViewInit, Component, DoCheck, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Room, RoomList } from './rooms';
import { HeaderComponent } from '../header/header.component';
import { RoomsService } from '../rooms-list/services/rooms.service';
import { Observable, Subject, Subscription, catchError, map, of } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { ConfigService } from '../service/config.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit, DoCheck, AfterViewInit,AfterViewChecked {

  hotelName = 'Hotel 1'
  numberOfRooms = 10;

  hideRooms = false;

  error:string = '';
  totalBytes = 0;

  subscription!: Subscription

  selectedRoom!: RoomList;

error$ :Subject<string> = new Subject<string>();
getError$ = this.error$.asObservable();
rooms$ = this.roomsService.getRooms$.pipe(
    catchError((err) =>{
      //console.log(err);
      this.error$.next(err.message);
      return of([]);
    })
  );

  priceFilter = new FormControl(0);

  roomsCount$ = this.roomsService.getRooms$.pipe(
    map((rooms) => rooms.length)
  )

  roomList: RoomList[] = [];

  stream = new Observable(observer => {
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.complete();
  });

  rooms: Room = {
    totalRooms: 20,
    availableRooms: 10,
    bookedRooms: 5
  };

  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;
  @ViewChildren(HeaderComponent) headerChildrenComponent!: QueryList<HeaderComponent>;

  constructor(private roomsService : RoomsService,
              private configService : ConfigService
  ) { }

  ngOnInit(): void {
    // this.roomList = [{
    //   roomNumber: 1,
    //   roomType: "Delux Room",
    //   amenities: "asd",
    //   price: 500,
    //   photos: "123",
    //   checkinTime: new Date('11-Nov-2021'),
    //   checkoutTime: new Date('12-Nov-2021'),
    //   rating: 4.5678
  
    // },{
    //   roomNumber: 2,
    //   roomType: "Delux Room2",
    //   amenities: "asd",
    //   price: 500,
    //   photos: "123",
    //   checkinTime: new Date('11-Nov-2021'),
    //   checkoutTime: new Date('12-Nov-2021'),
    //   rating: 3.5123
  
    // },{
    //   roomNumber: 3,
    //   roomType: "Delux Room3",
    //   amenities: "asd",
    //   price: 500,
    //   photos: "123",
    //   checkinTime: new Date('11-Nov-2021'),
    //   checkoutTime: new Date('12-Nov-2021'),
    //   rating: 2.3321
    // }];

    //this.roomList = this.roomsService.getRooms();
    
    this.stream.subscribe({
      next: (value) => console.log(value),
      complete: () => console.log('complete'),
      error: (err) => console.log(err)
    })
    this.stream.subscribe((data)=>console.log(data))
    
    // this.roomsService.getRooms$.subscribe(rooms=>{
    //   this.roomList = rooms;
    // })

    this.roomsService.getPhotos().subscribe((event)=>{
      switch(event.type){
        case HttpEventType.Sent:{
          console.log('Request has been made!');
          break;
        }
        case HttpEventType.ResponseHeader:{
          console.log('Request success!');
          break;
        }
        case HttpEventType.DownloadProgress:{
          this.totalBytes += event.loaded;
          break;
        }
        case HttpEventType.Response:{
          console.log(event.body)
          break;
        }
      }

    })
  }

  ngDoCheck(): void {
    console.log('on changes is called')
  }

  ngAfterViewInit(): void {
    //console.log(this.headerComponent)
    // this.headerComponent.title = "Room View";
    // console.log(this.headerChildrenComponent);
    // this.headerChildrenComponent.last.title = "Last Title";
  }

  ngAfterViewChecked(): void {
    
  }
  

  toggle() {
    this.hideRooms = !this.hideRooms
  }

  selectRoom(room:RoomList){
    this.selectedRoom = room;
  }

  addRoom(){
    const room: RoomList = {
      roomNumber: '10',
      roomType: "Delux Room 10",
      amenities: "asd",
      price: 500,
      photos: "",
      checkinTime: new Date('11-Nov-2021'),
      checkoutTime: new Date('12-Nov-2021'),
      rating: 4.5678
    };

    //this.roomList.push(room);
    //this.roomList = [...this.roomList, room];
    this.roomsService.addRoom(room).subscribe((data) => {
      this.roomList = data
    })
  }

  editRoom(){
    const room: RoomList = {
      roomNumber: '3',
      roomType: "Delux Room Edit",
      amenities: "asd",
      price: 500,
      photos: "",
      checkinTime: new Date('11-Nov-2021'),
      checkoutTime: new Date('12-Nov-2021'),
      rating: 4.12
    };

    this.roomsService.editRoom(room).subscribe((data)=>{
      this.roomList = data;
    })
  }

  deleteRoom(){
    this.roomsService.delete('1c29dbb1-ac27-4c3e-8773-2c0adc73b435').subscribe((data)=>{
      this.roomList = data;
    })
  }

  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
