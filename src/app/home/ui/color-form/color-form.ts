import { Component, computed, input, output } from '@angular/core';
import { Color } from '../../../shared/data-access/entities/Color';
import { CurrencyPipe, NgClass, CommonModule } from '@angular/common';
import { CardContainer } from '../card-container/card-container';

@Component({
  selector: 'app-color-form',
  imports: [NgClass, CardContainer, CurrencyPipe, CommonModule],
  templateUrl: './color-form.html',
  styleUrl: './color-form.css',
})
export class ColorForm {
  colors = input<Color[]>();
  color = output<Color>();

  colorsByPrice = computed(() => {
    return this.colors()!.reduce((dict, color) => {
      if (dict[color.price] === undefined) {
        dict[color.price] = [color];
      } else {
        dict[color.price].push(color);
      }
      return dict;
    }, {} as ColorDictionary);
  });

  keys = computed(() => {
    return Object.keys(this.colorsByPrice());
  });

  selected: Color | undefined;

  select(color: Color) {
    console.log('Selected color: ', color);
    this.selected = color;
    this.color.emit(color);
  }
}
type ColorDictionary = { [price: string]: Color[] };
