import { Component, input, output, signal } from '@angular/core';
import { Extra } from '../../../shared/data-access/entities/Extra';
import { CurrencyPipe, NgClass, NgOptimizedImage } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { ExtraDictionary } from '../../utils/ExtraDictionary';

@Component({
  selector: 'app-extra-form-type-card',
  imports: [NgClass, NgOptimizedImage, CurrencyPipe],
  templateUrl: './extra-form-type-card.html',
  styleUrl: './extra-form-type-card.css',
})
export class ExtraFormTypeCard {
  type = input<string>();
  extras = input<Extra[]>();
  extrasDict = output<ExtraDictionary>();
  errorState = output<boolean>();
  numberOfSelectedExtrasAcrossTypes = input<number>();
  selectedExtrasLocally = signal<Extra[]>([]);
  isOpen = signal(false);
  baseAssetUrl = environment.ASSET_API_URL;

  select(extra: Extra) {
    if (this.selectedExtrasLocally().includes(extra)) {
      this.selectedExtrasLocally.update((extras) => extras.filter((e) => e.id !== extra.id));
      this.extrasDict.emit({ [this.type()!]: this.selectedExtrasLocally() });
    } else {
      if (this.numberOfSelectedExtrasAcrossTypes()! < 5) {
        this.selectedExtrasLocally.update((extras) => [...extras, extra]);
        this.extrasDict.emit({ [this.type()!]: this.selectedExtrasLocally() });
      } else {
        console.log('Cannot select more than 5 extras across all types.');
        this.errorState.emit(true);
      }
    }
  }

  toggle() {
    this.isOpen.update((open) => !open);
  }
}
