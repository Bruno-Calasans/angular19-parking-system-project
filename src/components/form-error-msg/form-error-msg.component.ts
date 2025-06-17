import { Component, input } from '@angular/core';

@Component({
  selector: 'app-form-error-msg',
  imports: [],
  templateUrl: './form-error-msg.component.html',
  styles: ``,
})
export class FormErrorMsgComponent {
  msg = input<string>();
}
