import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
  Signal,
} from '@angular/core';
import { CatalogService } from '../../../shared/data-access/catalog.service';
import { Catalog } from '../../../shared/data-access/entities/Catalog';
import { toSignal } from '@angular/core/rxjs-interop';
import { ConfigurationContainer } from '../../ui/configuration-container/configuration-container';
import { Header } from '../../../shared/ui/header/header';
import { ConfigService } from '../../../shared/data-access/config.service';
import { Config } from '../../../shared/data-access/entities/Config';

@Component({
  selector: 'app-configurator',
  templateUrl: './configurator.html',
  styleUrl: './configurator.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ConfigurationContainer, Header],
})
export class Configurator implements AfterContentInit {
  configId = input<string | undefined>('');
  config = signal<Config | undefined>(undefined);

  private catalogService: CatalogService = inject(CatalogService);
  private configService: ConfigService = inject(ConfigService);

  price = signal<number>(0);

  updatePrice(newPrice: number) {
    this.price.set(newPrice);
  }

  updateSummary(catalog: Catalog) {
    console.log('Configurator received updated catalog: ', catalog);
  }

  catalog: Signal<Catalog> = toSignal(this.catalogService.getCatalog(), {
    initialValue: { modelId: '', colors: [], motorizations: [], rims: [], extras: [] },
  });

  ngAfterContentInit(): void {
    if (this.configId() !== '' && this.configId() !== undefined) {
      this.configService.getConfig(this.configId()!).subscribe((loadedConfig) => {
        this.config.set(loadedConfig);
        console.log('config is' + this.config()?.config);
      });
    }
    console.log('configId is' + this.configId());
    console.log('config is' + this.config());
  }
}
