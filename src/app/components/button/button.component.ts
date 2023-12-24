import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EIconType, IconComponent } from '../icon/icon.component';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-button',
  standalone: true,
  imports: [CommonModule, IconComponent],
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
	@Input() label?: string = '';
  @Input() icon?: string = '';
  @Input() iconType?: keyof typeof EIconType;
	@Input() disabled = false;
	@Output() onClick = new EventEmitter();

	onClickEvent() {
		this.onClick.emit();
	}
}
