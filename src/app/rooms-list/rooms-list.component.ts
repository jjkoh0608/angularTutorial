import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { RoomList } from '../rooms/rooms';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomsListComponent implements OnInit,OnDestroy {

  @Input() rooms : RoomList[] = [];

  @Input() price = 0;

  @Output() selectedRoom = new EventEmitter<RoomList>();

  constructor() { }

  ngOnInit(): void {
  }
  
  ngOnDestroy(): void {
    console.log("On Destroy");
  }

  selectRoom (room: RoomList){
    this.selectedRoom.emit(room)
  }
}
