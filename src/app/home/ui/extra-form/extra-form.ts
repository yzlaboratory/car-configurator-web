import { AfterContentInit, Component, computed, input, output, signal } from '@angular/core';
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
export class ExtraForm implements AfterContentInit {
  extras = input<Extra[]>();
  preselectedIds = input<string[] | undefined>([]);
  selectedExtrasEmitter = output<Extra[]>();
  selectedExtras = signal<Extra[]>([]);
  selectedExtrasByType = signal<ExtraDictionary>({});

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
    const selectedExtrasByType = this.selectedExtras().reduce((dict, extra) => {
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
      for (const extra of extraDict[Object.keys(extraDict)[0]]) {
        if (!this.selectedExtras().includes(extra)) {
          this.selectedExtras.update((current) => [...current, extra]);
          this.selectedExtrasEmitter.emit(this.selectedExtras());
        }
      }
    } else {
      //extra just got unselected
      for (const extra of selectedExtrasByType[Object.keys(extraDict)[0]]) {
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

  ngAfterContentInit(): void {
    if (
      this.preselectedIds() !== undefined &&
      this.preselectedIds()!.length > 0 &&
      this.extras() !== undefined
    ) {
      const selectedExtrasDict = this.extras()!.reduce((dict, extra) => {
        if (this.preselectedIds()!.includes(extra.id)) {
          if (dict[extra.type] === undefined) {
            dict[extra.type] = [extra];
          } else {
            dict[extra.type].push(extra);
          }
        }
        return dict;
      }, {} as ExtraDictionary);
      this.selectedExtrasByType.set(selectedExtrasDict);
    }
  }
}
