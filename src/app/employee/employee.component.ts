import { Component, OnInit, Self } from '@angular/core';
import { RoomsService } from '../rooms-list/services/rooms.service';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  providers:[RoomsService]
})
export class EmployeeComponent implements OnInit {

  empName: string = "John"

  constructor(@Self() private roomsServices: RoomsService) { }

  ngOnInit(): void {
  }

}
