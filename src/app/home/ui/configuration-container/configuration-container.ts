import { Component, input } from '@angular/core';
import { Catalog } from '../../../shared/data-access/entities/Catalog';
import { ConfigurationHeader } from '../configuration-header/configuration-header';
import { ColorForm } from '../color-form/color-form';
import { MotorForm } from '../motor-form/motor-form';
import { RimForm } from '../rim-form/rim-form';
import { ExtraForm } from '../extra-form/extra-form';
import { Motorization } from '../../../shared/data-access/entities/Motorization';
import { Color } from '../../../shared/data-access/entities/Color';

@Component({
  selector: 'app-configuration-container',
  imports: [ConfigurationHeader, ColorForm, MotorForm, RimForm, ExtraForm],
  templateUrl: './configuration-container.html',
  styleUrl: './configuration-container.css',
})
export class ConfigurationContainer {
  catalog = input<Catalog>();

  processMotorUpdate(motor: Motorization) {
    console.log('Configuration Container received motor update: ', motor);
  }

  processColorUpdate(color: Color) {
    console.log('Configuration Container received color update: ', color);
  }
}
