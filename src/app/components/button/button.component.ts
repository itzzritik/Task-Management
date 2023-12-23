import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-button',
  standalone: true,
  imports: [],
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  public buttonText = '';

	@Input()
	set label(name: string) {
		this.buttonText = name.toUpperCase();
	}
	get name(): string {
		return this.buttonText;
	}

	@Output() btnClick = new EventEmitter();
	@Input() isDisabled = false;

	constructor() {}

	onClick() {
		this.btnClick.emit();
	}
}
