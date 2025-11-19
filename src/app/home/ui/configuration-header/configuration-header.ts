import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-configuration-header',
  imports: [],
  templateUrl: './configuration-header.html',
  styleUrl: './configuration-header.css',
})
export class ConfigurationHeader {
  modelId = input<string>();

  modelName = computed(() => {
    const id = this.modelId()!;
    if (id == '') {
      return '';
    } else {
      return id.substring(0, id.indexOf('_'));
    }
  });

  modelYear = computed(() => {
    const id = this.modelId()!;
    if (id == '') {
      return '';
    } else {
      return id.substring(id.indexOf('_') + 1, id.length);
    }
  });
}
