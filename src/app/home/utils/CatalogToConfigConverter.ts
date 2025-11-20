import { Injectable } from '@angular/core';
import { Catalog } from '../../shared/data-access/entities/Catalog';
import { Config } from '../../shared/data-access/entities/Config';

@Injectable({ providedIn: 'root' })
export class CatalogToConfigConverter {
  getConfigObject(catalog: Catalog, currentTotal: number): Config {
    return {
      configId: '',
      modelId: catalog.modelId,
      config: this.createIdArrayFromCatalog(catalog),
      price: currentTotal,
    };
  }

  createIdArrayFromCatalog(catalog: Catalog): string[] {
    const idArray: string[] = [];
    idArray.push(catalog.colors[0].id);
    idArray.push(catalog.motorizations[0].id);
    idArray.push(catalog.rims[0].id);
    catalog.extras.forEach((extra) => {
      idArray.push(extra.id);
    });
    return idArray;
  }
}
