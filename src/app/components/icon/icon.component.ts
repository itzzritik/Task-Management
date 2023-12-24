import { Component, EventEmitter, Input, Output } from '@angular/core';
import { unicodeToString } from '../../../utils/string';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss'
})
export class IconComponent {
  @Input() code: string = '';
  @Input() type?: keyof typeof EIconType = 'light';
  @Output() onClick = new EventEmitter();

  getUnicode() {
		return unicodeToString(this.code)
	}
	onClickEvent() {
		this.onClick.emit();
	}
}

export enum EIconType {
	thin = 'thin',
	light = 'light',
	regular = 'regular',
	solid = 'solid',
	duotone = 'duotone',
	sharpSolid = 'sharpSolid',
	sharpRegular = 'sharpRegular',
	sharpLight = 'sharpLight',
	brand = 'brand',
}
