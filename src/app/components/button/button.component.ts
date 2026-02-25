import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EIconType, IconComponent } from '../icon/icon.component';


@Component({
    selector: 'app-button',
    imports: [IconComponent],
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
	@Input() label?: string = '';
	@Input() type?: string = 'button';
  @Input() icon?: string = '';
  @Input() iconType?: keyof typeof EIconType;
	@Input() disabled = false;
	@Output() onClick = new EventEmitter();

	onClickEvent() {
		this.onClick.emit();
	}
}
