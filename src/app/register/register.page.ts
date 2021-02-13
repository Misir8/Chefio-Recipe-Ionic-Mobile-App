import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../shared/services/auth.service';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  get password() {
    return this.registerForm.get('password');
  }

  registerForm: FormGroup;
  inputType = 'password';
  inputToggle = true;

  constructor(private fb: FormBuilder, private authService: AuthService, private storage: Storage) {
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.storage.get('user').then(result => console.log(JSON.parse(result)));
  }

  registerSubmit() {
    console.log(this.registerForm.value);
    this.authService.register({...this.registerForm.value, returnSecureToken: true})
      .subscribe(res => console.log(res), error => console.log(error));
  }

  inputTypeToggle() {
    this.inputToggle = !this.inputToggle;
    this.inputType = this.inputToggle ? 'password' : 'text';
  }
}
