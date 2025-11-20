import { Component, input, output, signal } from '@angular/core';
import { Catalog } from '../../../shared/data-access/entities/Catalog';
import { ConfigurationHeader } from '../configuration-header/configuration-header';
import { ColorForm } from '../color-form/color-form';
import { MotorForm } from '../motor-form/motor-form';
import { RimForm } from '../rim-form/rim-form';
import { ExtraForm } from '../extra-form/extra-form';
import { Motorization } from '../../../shared/data-access/entities/Motorization';
import { Color } from '../../../shared/data-access/entities/Color';
import { Rim } from '../../../shared/data-access/entities/Rims';
import { Extra } from '../../../shared/data-access/entities/Extra';
import { HeroSection } from '../hero-section/hero-section';
import { Summary } from '../summary/summary';

@Component({
  selector: 'app-configuration-container',
  imports: [ConfigurationHeader, ColorForm, MotorForm, RimForm, ExtraForm, HeroSection, Summary],
  templateUrl: './configuration-container.html',
  styleUrl: './configuration-container.css',
})
export class ConfigurationContainer {
  catalog = input<Catalog>();
  price = output<number>();
  pickedCatalogEmitter = output<Catalog>();
  pickedFromCatalog = signal<Catalog>({
    modelId: 'Astral X_2025',
    colors: [],
    motorizations: [],
    rims: [],
    extras: [],
  });
  localPrice = signal<number>(0);

  processMotorUpdate(motor: Motorization) {
    this.pickedFromCatalog.update((current) => {
      current.motorizations = [motor];
      return current;
    });
    this.emitUpdates();
    console.log('Configuration Container received motor update: ', motor);
  }

  processColorUpdate(color: Color) {
    this.pickedFromCatalog.update((current) => {
      current.colors = [color];
      return current;
    });
    this.emitUpdates();
    console.log('Configuration Container received color update: ', color);
  }

  processRimUpdate(rim: Rim) {
    this.pickedFromCatalog.update((current) => {
      current.rims = [rim];
      return current;
    });
    this.emitUpdates();
    console.log('Configuration Container received color update: ', rim);
  }

  processExtrasUpdate(extras: Extra[]) {
    this.pickedFromCatalog.update((current) => {
      current.extras = extras;
      return current;
    });
    this.emitUpdates();
    console.log('Configuration Container received extras update: ', extras);
  }

  emitUpdates() {
    this.pickedCatalogEmitter.emit(this.pickedFromCatalog());
    let totalPrice = 0;
    const picked: Catalog = this.pickedFromCatalog();
    if (picked.colors.length > 0) {
      totalPrice += picked.colors[0].price;
    }
    if (picked.motorizations.length > 0) {
      totalPrice += picked.motorizations[0].price;
    }
    if (picked.rims.length > 0) {
      totalPrice += picked.rims[0].price;
    }
    if (picked.extras.length > 0) {
      for (const extra of picked.extras) {
        totalPrice += extra.price;
      }
    }
    this.localPrice.set(totalPrice);
    this.price.emit(totalPrice);
  }
}
