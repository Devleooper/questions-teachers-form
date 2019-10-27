import {ContactInfo} from './../models/models';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  registerForm: FormGroup;

  areas = [
    { value: '1', viewValue: 'English' },
    { value: '2', viewValue: 'citizen competitions' },
    { value: '3', viewValue: 'culture' }
  ];

  constructor(private builder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.getRegisterForm();
    this.registerForm.valueChanges.subscribe(console.log);
  }


  private getRegisterForm() {
    return this.builder.group({
      teacherId: '',
      teacherName: '',
      teacherTopic: '',
      teacherContact: this.builder.group(new ContactInfo())
    });
  }

}
