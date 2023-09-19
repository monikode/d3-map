import { Component, Input } from '@angular/core';
import { Pin } from '../../../interfaces/pin/Pin';

@Component({
  selector: '[svgpin]',
  template: `<svg:circle svgpin></svg:circle> `,
  styleUrls: ['./pin.component.css'],
})
export class PinComponent {
  @Input() pin: Pin = {
    color: 'black',
    id: '0',
    name: 'pin',
    x: 0,
    y: 0,
    r: 3,
  };
}
