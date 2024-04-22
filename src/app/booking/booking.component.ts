import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../service/config.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BookingService } from './booking.service';
import { exhaustMap, mergeMap, switchMap } from 'rxjs';
import { CustomValidator } from './validators/custom-validator';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  bookingForm!: FormGroup;

  get guests() {
    return this.bookingForm.get('guests') as FormArray;
  }

  constructor(
    private configService: ConfigService,
    private fb: FormBuilder,
    private bookingService: BookingService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const roomId = this.route.snapshot.paramMap.get('roomid');

    this.bookingForm = this.fb.group({
      roomId: new FormControl(
        { value: roomId, disabled: true },
        { validators: [Validators.required] }
      ),
      guestEmail: [
        '',
        {
          //updateOn: 'blur',
          validators: [Validators.required, Validators.email],
        },
      ], // new FormControl('')
      checkinDate: [''],
      checkoutDate: [''],
      bookingStatus: [''],
      bookingAmount: [''],
      bookingDate: [''],
      mobileNumber: ['', { value: '2', disabled: true }],
      guestName: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          CustomValidator.ValidateName,
          CustomValidator.ValidateSpecialChar('*'),
        ],
      ],
      address: this.fb.group({
        addressLine1: ['', [Validators.required]],
        addressLine2: [''],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        country: [''],
        zipCode: [''],
      }),
      guests: this.fb.array([this.addGuestControl()]),
      tnc: new FormControl(false, { validators: [Validators.requiredTrue] }),
      //uestList: [''],
    }, {updateOn: 'blur', validators: [CustomValidator.ValidateDate]});

    this.getBookingData();

    // this.bookingForm.valueChanges.subscribe((data) => {
    //   this.bookingService.bookRoom(data).subscribe((data) => {})
    // });

    this.bookingForm.valueChanges
      .pipe(exhaustMap((data) => this.bookingService.bookRoom(data)))
      .subscribe((data) => {
        console.log(data);
      });
  }

  addBooking() {
    console.log(this.bookingForm.getRawValue());

    // this.bookingService.bookRoom(this.bookingForm.getRawValue())
    // .subscribe((data) => {
    //   console.log(data)
    // })

    this.bookingForm.reset({
      roomId: '2',
      guestEmail: '',
      checkinDate: '',
      checkoutDate: '',
      bookingStatus: '',
      bookingAmount: '',
      bookingDate: '',
      mobileNumber: '',
      guestName: '',
      address: {
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
      },
      guests: [],
      tnc: false,
      //uestList: [''],
    });
  }

  getBookingData() {
    this.bookingForm.patchValue({
      //roomId: '2',
      guestEmail: 'ASD@gmail.com',
      checkinDate: new Date('10-feb-2024'),
      checkoutDate: '',
      bookingStatus: '',
      bookingAmount: '',
      bookingDate: '',
      mobileNumber: '',
      guestName: '',
      address: {
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
      },
      guests: [],
      tnc: false,
      //uestList: [''],
    });
  }

  addGuest() {
    this.guests.push(this.addGuestControl());
  }

  addGuestControl() {
    return this.fb.group({
      guestName: ['', { validators: [Validators.required] }],
      age: new FormControl(''),
    });
  }

  addPassport() {
    this.bookingForm.addControl('passport', new FormControl(''));
  }

  deletePassport() {
    if (this.bookingForm.get('passport'))
      this.bookingForm.removeControl('passport');
  }

  removeGuest(i: number) {
    this.guests.removeAt(i);
  }
}
