import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { environment } from '../../../../environments/environment.staging';
import { CardContainer } from '../card-container/card-container';
import { Catalog } from '../../../shared/data-access/entities/Catalog';
import { ConfigurationHeader } from '../configuration-header/configuration-header';
import { SummaryRefUtil } from '../../../shared/utils/summaryRefUtil';
import { ConfigService } from '../../../shared/data-access/config.service';
import { CatalogToConfigConverter } from '../../utils/CatalogToConfigConverter';
import { OrderService } from '../../../shared/data-access/order.service';

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
  price = input<number>(0);
  state = signal<string>('');
  configUrl = signal<string>('');

  effect = effect(() => {
    this.selectedItems();
    this.price();
    if (this.isCurrentSelectionAcceptable()) {
      this.state.set('');
    }
  });

  summaryRef = viewChild<ElementRef>('summaryRef');

  private summaryRefUtil = inject(SummaryRefUtil);

  private catalogConverter = inject(CatalogToConfigConverter);

  private configService: ConfigService = inject(ConfigService);
  private orderService: OrderService = inject(OrderService);

  ngAfterViewInit(): void {
    this.summaryRefUtil.setSummaryRef(this.summaryRef()!.nativeElement);
  }

  createConfigId() {
    if (this.isCurrentSelectionAcceptable()) {
      this.configService
        .postConfig(this.catalogConverter.getConfigObject(this.selectedItems(), this.price()))
        .subscribe((config) => {
          this.configUrl.set(window.location.hostname + '/' + config.configId);
          this.state.set('configCreated');
        });
    } else {
      this.state.set('unacceptableSelection');
    }
  }

  order() {
    if (this.isCurrentSelectionAcceptable()) {
      this.configService
        .postConfig(this.catalogConverter.getConfigObject(this.selectedItems(), this.price()))
        .subscribe((config) => {
          this.configUrl.set(window.location.hostname + '/' + config.configId);
          this.orderService
            .postOrder({
              id: '',
              orderTimestamp: '',
              configurationId: config.configId,
              createdAt: '',
              updatedAt: '',
              status: '',
            })
            .subscribe((order) => {
              console.log(order);
              this.state.set('orderCreated');
            });
        });
    } else {
      this.state.set('unacceptableSelection');
    }
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.configUrl());
  }

  isCurrentSelectionAcceptable(): boolean {
    const currentSelection = this.selectedItems();
    if (currentSelection.colors.length === 0) return false;
    if (currentSelection.rims.length === 0) return false;
    if (currentSelection.motorizations.length === 0) return false;
    return true;
  }
}
