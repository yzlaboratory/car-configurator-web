import { Component, input } from '@angular/core';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { environment } from '../../../../environments/environment.staging';
import { CardContainer } from '../card-container/card-container';
import { Catalog } from '../../../shared/data-access/entities/Catalog';
import { ConfigurationHeader } from '../configuration-header/configuration-header';

@Component({
  selector: 'app-summary',
  imports: [NgOptimizedImage, CardContainer, CurrencyPipe, ConfigurationHeader],
  templateUrl: './summary.html',
  styleUrl: './summary.css',
})
export class Summary {
  baseAssetUrl = environment.ASSET_API_URL;
  selectedItems = input<Catalog>({
    modelId: 'Astral X_2025',
    colors: [],
    motorizations: [],
    rims: [],
    extras: [],
  });
  price = input<number>();
}
