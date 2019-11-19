import { SaveService } from './../services/save/save.service';
import { ContactInfo, Teacher } from './../models/models';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  registerForm: FormGroup;
  isLoading: boolean;

  areas = [
    { value: '1', viewValue: 'English' },
    { value: '2', viewValue: 'Citizen competitions' },
    { value: '3', viewValue: 'Culture' }
  ];

  constructor(private builder: FormBuilder, private provider: SaveService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.registerForm = this.getRegisterForm();
    this.registerForm.valueChanges.subscribe(console.log);
    this.isLoading = false;
  }


  private getRegisterForm() {
    return this.builder.group({
      teacherId: '',
      teacherName: '',
      teacherTopic: '',
      teacherContact: this.builder.group(new ContactInfo())
    });
  }

  public saveTeacher() {
    this.isLoading = true;
    const payload = this.registerForm.value as Teacher;
    this.provider.addTeacher(payload).then(() => {
      this.registerForm.reset();
      this.snackBar.open('teacher added successfully', '', { duration: 3000 });
      this.isLoading = false;
    }).catch((err) => {
      this.snackBar.open('there was an error processing your request , try later!.', '', { duration: 3000 });
      this.registerForm.reset();
      this.isLoading = false;
    })
  }

}
