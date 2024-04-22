import { Inject, Injectable, InjectionToken } from '@angular/core';
import {  Room, RoomList } from 'src/app/rooms/rooms';
import {  environment } from '../../../environments/environment';
import { App_SERVICE_CONFIG } from '../../AppConfig/appconfig.service';
import { AppConfig } from '../../AppConfig/appconfig.interface';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { shareReplay } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  // roomList: RoomList[] = [{
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
  
  //headers =  new HttpHeaders({'token': '1234'})
  getRooms$ = this.http.get<RoomList[]>('/api/rooms').pipe(
    shareReplay(1)
  );

  roomList: RoomList[] = [];
  constructor(@Inject(App_SERVICE_CONFIG) private config:AppConfig,
  private http:HttpClient)
  {
    console.log(this.config.apiEndpoint)
    console.log("Room service Initialized")
  }
  
  getRooms(){
    //return this.roomList
    // var a = this.http.get<RoomList[]>('/api/rooms');
    // console.log(a);
    return this.http.get<RoomList[]>('/api/rooms')
  }

  addRoom(room:RoomList){
    return this.http.post<RoomList[]>('api/rooms',room)
  }

  editRoom(room: RoomList){
    return this.http.put<RoomList[]>(`api/rooms/${room.roomNumber}`,room)
  }
  delete(id: string){
    return this.http.delete<RoomList[]>(`api/rooms/${id}`)
  }

  getPhotos(){
    const request = new HttpRequest('GET',
    `https://jsonplaceholder.typicode.com/photos`,
    {reportProgress:true,
    }
    );

    return this.http.request(request)
  }
  }



