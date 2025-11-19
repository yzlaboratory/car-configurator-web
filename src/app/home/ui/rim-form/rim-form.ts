import { Component, computed, input, output } from '@angular/core';
import { Rim } from '../../../shared/data-access/entities/Rims';
import { CardContainer } from '../card-container/card-container';
import { CurrencyPipe, NgClass } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-rim-form',
  imports: [CardContainer, NgClass, CurrencyPipe, NgOptimizedImage],
  templateUrl: './rim-form.html',
  styleUrl: './rim-form.css',
})
export class RimForm {
  rims = input<Rim[]>();
  rim = output<Rim>();

  baseAssetUrl = environment.ASSET_API_URL;

  rimsBySize = computed(() => {
    return this.rims()!.reduce((dict, rim) => {
      if (dict[rim.size] === undefined) {
        dict[rim.size] = [rim];
      } else {
        dict[rim.size].push(rim);
      }
      return dict;
    }, {} as RimDictionary);
  });

  keys = computed(() => {
    return Object.keys(this.rimsBySize());
  });

  selected: Rim | undefined;

  select(rim: Rim) {
    console.log('Selected Rim: ', rim);
    this.selected = rim;
    this.rim.emit(rim);
  }
}
type RimDictionary = { [size: string]: Rim[] };
