import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-rooms-booking',
  templateUrl: './rooms-booking.component.html',
  styleUrls: ['./rooms-booking.component.scss'],
})
export class RoomsBookingComponent implements OnInit {
  constructor(private router: ActivatedRoute) {}

  //roomid!: number;
  roomid$ = this.router.paramMap.pipe(map((params) => params.get('roomid')));

  ngOnInit(): void {
    // this.router.params.subscribe((params) => {
    //   console.log(params)
    //   this.roomid = params['roomid'];
    // })
    //this.roomid = this.router.snapshot.params['roomid'];
    // this.roomid$ = this.router.params.pipe(map((params) => params['roomid']));
    
    //this.router.paramMap.subscribe((params) => {params.get('roomid')})

  }
}
