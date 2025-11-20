import { AfterViewInit, Component, ElementRef, inject, input, viewChild } from '@angular/core';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { environment } from '../../../../environments/environment.staging';
import { CardContainer } from '../card-container/card-container';
import { Catalog } from '../../../shared/data-access/entities/Catalog';
import { ConfigurationHeader } from '../configuration-header/configuration-header';
import { SummaryRefUtil } from '../../../shared/utils/summaryRefUtil';

@Component({
  selector: 'app-summary',
  imports: [NgOptimizedImage, CardContainer, CurrencyPipe, ConfigurationHeader],
  templateUrl: './summary.html',
  styleUrl: './summary.css',
})
export class Summary implements AfterViewInit {
  baseAssetUrl = environment.ASSET_API_URL;
  selectedItems = input<Catalog>({
    modelId: 'Astral X_2025',
    colors: [],
    motorizations: [],
    rims: [],
    extras: [],
  });
  price = input<number>();
  summaryRef = viewChild<ElementRef>('summaryRef');

  summaryRefUtil = inject(SummaryRefUtil);

  ngAfterViewInit(): void {
    this.summaryRefUtil.setSummaryRef(this.summaryRef()!.nativeElement);
  }
}
