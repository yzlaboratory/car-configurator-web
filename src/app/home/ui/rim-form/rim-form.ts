import { Component, computed, effect, input, output } from '@angular/core';
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
  preselectedId = input<string | undefined>('');

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

  effects = effect(() => {
    if (
      this.preselectedId() !== undefined &&
      this.preselectedId() !== '' &&
      this.rims() !== undefined
    ) {
      for (const rim of this.rims()!) {
        if (rim.id === this.preselectedId()) {
          this.select(rim);
        }
      }
    }
  });
}
type RimDictionary = { [size: string]: Rim[] };
