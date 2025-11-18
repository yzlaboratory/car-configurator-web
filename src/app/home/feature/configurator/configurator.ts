import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { CatalogService } from '../../../shared/data-access/catalog.service';
import { Catalog } from '../../../shared/data-access/entities/Catalog';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-configurator',
  templateUrl: './configurator.html',
  styleUrl: './configurator.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class Configurator {
  private service: CatalogService = inject(CatalogService);

  catalog: Signal<Catalog> = toSignal(this.service.getCatalog(), {
    initialValue: { modelId: '', colors: [], motorizations: [], rims: [], extras: [] },
  });
}
