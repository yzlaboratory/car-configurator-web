import { ChangeDetectionStrategy, Component, inject, signal, Signal } from '@angular/core';
import { CatalogService } from '../../../shared/data-access/catalog.service';
import { Catalog } from '../../../shared/data-access/entities/Catalog';
import { toSignal } from '@angular/core/rxjs-interop';
import { ConfigurationContainer } from '../../ui/configuration-container/configuration-container';
import { Header } from '../../../shared/ui/header/header';

@Component({
  selector: 'app-configurator',
  templateUrl: './configurator.html',
  styleUrl: './configurator.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ConfigurationContainer, Header],
})
export class Configurator {
  private service: CatalogService = inject(CatalogService);

  price = signal<number>(0);

  updatePrice(newPrice: number) {
    this.price.set(newPrice);
  }

  updateSummary(catalog: Catalog) {
    console.log('Configurator received updated catalog: ', catalog);
  }

  catalog: Signal<Catalog> = toSignal(this.service.getCatalog(), {
    initialValue: { modelId: '', colors: [], motorizations: [], rims: [], extras: [] },
  });
}
