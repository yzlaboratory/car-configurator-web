import { Component, input } from '@angular/core';
import { Catalog } from '../../../shared/data-access/entities/Catalog';

@Component({
  selector: 'app-configuration-container',
  imports: [],
  templateUrl: './configuration-container.html',
  styleUrl: './configuration-container.css',
})
export class ConfigurationContainer {
  catalog = input<Catalog>();
}
