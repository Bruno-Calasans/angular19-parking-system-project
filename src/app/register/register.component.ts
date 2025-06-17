import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../types/User.type';
import { FormInputFeedbackComponent } from '../components/form-input-feedback/form-input-feedback.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, FormInputFeedbackComponent],
  templateUrl: './register.component.html',
  styles: ``,
})
export class RegisterComponent {
  title = 'register';
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
    ],
  });

  async onSubmit() {
    try {
      const registerInput = this.registerForm.value as Required<User>;
      await this.authService
        .register(registerInput)
        .then(() => alert('Register succesfully'))
        .catch(err => alert(err.message));
      this.registerForm.reset();
      this.router.navigateByUrl('/');
    } catch (error) {
      alert(
        'Register failed: ' +
          (error instanceof Error ? error.message : 'Unknown error'),
      );
    }
  }
}
