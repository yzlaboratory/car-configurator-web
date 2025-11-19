import { Component, computed, input, output, signal, WritableSignal } from '@angular/core';
import { Extra } from '../../../shared/data-access/entities/Extra';
import { environment } from '../../../../environments/environment';
import { CardContainer } from '../card-container/card-container';
import { ExtraFormTypeCard } from '../extra-form-type-card/extra-form-type-card';
import { ExtraDictionary } from '../../utils/ExtraDictionary';

@Component({
  selector: 'app-extra-form',
  imports: [CardContainer, ExtraFormTypeCard],
  templateUrl: './extra-form.html',
  styleUrl: './extra-form.css',
})
export class ExtraForm {
  extras = input<Extra[]>();
  selectedExtrasEmitter = output<Extra[]>();
  selectedExtras = signal<Extra[]>([]);

  errorState = signal(false);

  baseAssetUrl = environment.ASSET_API_URL;

  extrasByType = computed(() => {
    return this.extras()!.reduce((dict, extra) => {
      if (dict[extra.type] === undefined) {
        dict[extra.type] = [extra];
      } else {
        dict[extra.type].push(extra);
      }
      return dict;
    }, {} as ExtraDictionary);
  });

  keys = computed(() => {
    return Object.keys(this.extrasByType());
  });

  handleExtraSelection(extraDict: ExtraDictionary) {
    let selectedExtrasByType = this.selectedExtras().reduce((dict, extra) => {
      if (dict[extra.type] === undefined) {
        dict[extra.type] = [extra];
      } else {
        dict[extra.type].push(extra);
      }
      return dict;
    }, {} as ExtraDictionary);
    if (
      selectedExtrasByType[Object.keys(extraDict)[0]] === undefined ||
      selectedExtrasByType[Object.keys(extraDict)[0]].length <
        extraDict[Object.keys(extraDict)[0]].length
    ) {
      //extra just got selected
      for (let extra of extraDict[Object.keys(extraDict)[0]]) {
        if (!this.selectedExtras().includes(extra)) {
          this.selectedExtras.update((current) => [...current, extra]);
          this.selectedExtrasEmitter.emit(this.selectedExtras());
        }
      }
    } else {
      //extra just got unselected
      for (let extra of selectedExtrasByType[Object.keys(extraDict)[0]]) {
        if (!extraDict[Object.keys(extraDict)[0]].includes(extra)) {
          this.selectedExtras.update((current) => current.filter((e) => e.id !== extra.id));
          this.selectedExtrasEmitter.emit(this.selectedExtras());
        }
      }
    }
    this.errorState.set(false);
  }

  setErrorState() {
    this.errorState.set(true);
  }
}
