import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../shared/services/auth.service';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-register',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  get password() {
    return this.loginForm.get('password');
  }

  loginForm: FormGroup;
  inputType = 'password';
  inputToggle = true;

  constructor(private fb: FormBuilder, private authService: AuthService, private storage: Storage) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.storage.get('user').then(result => console.log(JSON.parse(result)));
  }

  loginSubmit() {
    console.log(this.loginForm.value);
    this.authService.loginWithEmail({...this.loginForm.value, returnSecureToken: true})
      .subscribe(res => console.log(res), error => console.log(error));
  }

  inputTypeToggle() {
    this.inputToggle = !this.inputToggle;
    this.inputType = this.inputToggle ? 'password' : 'text';
  }
}
