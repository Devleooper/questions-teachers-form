import { SaveService } from './../services/save/save.service';
import { SignUpRequest, SignUpResponse } from './../models/models';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  registerForm: FormGroup;
  isLoading: boolean;
  @ViewChild('form', { static: false }) form;

  areas = [
    { value: '1', viewValue: 'English' },
    { value: '2', viewValue: 'Citizen competitions' },
    { value: '3', viewValue: 'Culture' }
  ];

  constructor(private builder: FormBuilder, private provider: SaveService, private snackBar: MatSnackBar) {
    this.registerForm = this.builder.group({
      code: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      user_name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
      topic: ['', [Validators.required]],
      email: ['', [Validators.required
        , Validators.pattern('^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(konradlorenz)\.edu\.co$')]]
    });
  }

  ngOnInit() {
    this.isLoading = false;
  }


  public saveTeacher() {
    this.isLoading = true;
    const payload = this.registerForm.value as SignUpRequest;
    payload.password = payload.code.toString();
    payload.role = 'Teacher';

    this.provider.addTeacherUser(payload).then((response: SignUpResponse) => {
      this.form.resetForm();
      this.snackBar.open(response.status, response.code.toString(), { duration: 3000 });
      this.isLoading = false;
    }).catch((err) => {
      console.log(err);
      this.snackBar.open(err.status, err.code.toString(), { duration: 3000 });
      this.form.resetForm();
      this.isLoading = false;
    });
  }

}
