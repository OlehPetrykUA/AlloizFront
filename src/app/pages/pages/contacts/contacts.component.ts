import {Component, OnInit} from '@angular/core';
import {CallbackTopicService} from '../../../shared/service/callback-topic.service';
import {CallbackTopic} from '../../../shared/models/callback-topic';
import {Callback} from '../../../shared/models/callback';
import {CallbackService} from '../../../shared/service/callback.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OrderTypeService} from '../../../shared/service/order-type.service';
import {OrderType} from '../../../shared/models/order-type';
import {CallBackTopicEnum} from '../../../shared/enum/call-back-topic.enum';
import {OrderTypeEnum} from '../../../shared/enum/order-type.enum';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers: [CallbackTopicService, CallbackService, OrderTypeService]
})
export class ContactsComponent implements OnInit {
  callbackForm: FormGroup;
  callBackEnum=CallBackTopicEnum;
  orderENum=OrderTypeEnum;
  callback: Callback = new Callback();
  showOrder: boolean = false;

  constructor(private _callbackTopic: CallbackTopicService, private  _callback: CallbackService, private _orderTypeService: OrderTypeService) {
  }

  ngOnInit() {
    this.callbackForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.pattern(/\d{6,12}/)]),
      company: new FormControl(''),
      callbackTopic: new FormControl(''),
      orderType: new FormControl(''),
    });
    this.callbackForm.valueChanges.subscribe(value => {
      this.callback = value;
      console.log(this.callback);

    });
  }
  addContacts() {
    this._callback.save(this.callback).subscribe(next => {
        console.log(next);
      },
      error => {
        console.log(error);
      },()=>{
        this.callbackForm.reset();
      }
      );
  }

  checkOrder(sel: HTMLSelectElement) {
    if (this.callback.callbackTopic == 'ORDER') {
      this.showOrder = true;
    } else
      this.showOrder = false;
  }

}
