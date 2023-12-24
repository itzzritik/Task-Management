import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-textfield',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './textfield.component.html',
  styleUrls: ['./textfield.component.scss']
})
export class TextfieldComponent {
  @Input() value: string = '';
  @Input() placeholder: string = 'Enter text';
}
