import { SaveService } from './../services/save/save.service';
import { Teacher } from './../models/models';
import { Component, OnInit, ViewChild} from '@angular/core';
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
      teacherId: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      teacherName: ['', [Validators.required, Validators.maxLength(50)]],
      teacherTopic: ['', [Validators.required]],
      teacherContact: this.builder.group({
        email: ['', [Validators.required, Validators.email]],
        contactPhone: ['', [Validators.pattern('^[0-9]*$')]]
      })
    });
  }

  ngOnInit() {
    this.isLoading = false;
  }


  public saveTeacher() {
    this.isLoading = true;
    const payload = this.registerForm.value as Teacher;
    this.provider.addTeacher(payload).then(() => {

      this.registerForm.reset();
      this.form.resetForm();
      this.snackBar.open('teacher added successfully', '', { duration: 3000 });
      this.isLoading = false;
    }).catch((err) => {
      this.snackBar.open('there was an error processing your request , try later!.', '', { duration: 3000 });
      this.registerForm.reset();
      this.isLoading = false;
    });
  }

}
