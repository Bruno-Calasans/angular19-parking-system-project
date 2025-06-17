import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { User } from '../../types/User.type';
import { Router } from '@angular/router';
import { FormInputFeedbackComponent } from '../../components/form-input-feedback/form-input-feedback.component';

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
  router = inject(Router);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
    ],
  });

  async onSubmit() {
    try {
      const loginInput = this.loginForm.value as Omit<User, 'id' | 'name'>;
      await this.authService
        .login(loginInput)
        .then(() => alert('Login succesfully'))
        .catch(err => alert(err.message));
      this.loginForm.reset();
      this.router.navigateByUrl('/');
    } catch (error) {
      alert(
        'Login failed: ' +
          (error instanceof Error ? error.message : 'Unknown error'),
      );
    }
  }
}
