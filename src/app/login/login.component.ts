import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { FormInputFeedbackComponent } from '../components/form-input-feedback/form-input-feedback.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { User } from '../../types/User.type';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormInputFeedbackComponent, CommonModule],
  templateUrl: './login.component.html',
  styles: ``,
})
export class LoginComponent {
  title = 'login';
  fb = inject(FormBuilder);
  authService = inject(AuthService);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
    ],
  });

  async onSubmit() {
    const loginInput = this.loginForm.value as Required<User>;
    await this.authService
      .login(loginInput)
      .then(() => alert('Login succesfully'))
      .catch(err => alert(err.message));
  }
}
