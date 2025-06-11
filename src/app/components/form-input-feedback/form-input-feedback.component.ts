import { Component, input } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { FormErrorMsgComponent } from '../form-error-msg/form-error-msg.component';

type InputType = 'text' | 'email' | 'number' | 'tel' | 'url';

@Component({
  selector: 'app-form-input-feedback',
  imports: [FormsModule, FormErrorMsgComponent],
  templateUrl: './form-input-feedback.component.html',
})
export class FormInputFeedbackComponent {
  form = input.required<FormGroup>();
  controlName = input.required<string>();
  inputType = input<InputType>('text');

  get control() {
    return this.form().get(this.controlName());
  }

  get errors() {
    return this.control?.errors;
  }

  get isTouched() {
    return this.control?.touched;
  }

  get isDirty() {
    return this.control?.dirty;
  }
}
