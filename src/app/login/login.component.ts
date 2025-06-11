import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { FormInputFeedbackComponent } from '../components/form-input-feedback/form-input-feedback.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormInputFeedbackComponent, CommonModule],
  templateUrl: './login.component.html',
  styles: ``,
})
export class LoginComponent {
  title = 'login';
  fb = inject(FormBuilder);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
    ],
  });

  onSubmit() {
    console.log('Form submitted:', this.loginForm.value);
  }
}
