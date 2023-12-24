import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { TextfieldComponent } from '../textfield/textfield.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ButtonComponent, TextfieldComponent],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  closing: boolean = false;
  @Input() label?: string = '';
  @Output() onClose = new EventEmitter();

  onCloseEvent() {
    this.closing = true;
		setTimeout(() => this.onClose.emit(), 250);
	}
}
