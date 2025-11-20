import { Component, effect, input, output } from '@angular/core';
import { Motorization } from '../../../shared/data-access/entities/Motorization';
import { NgClass } from '@angular/common';
import { CardContainer } from '../card-container/card-container';

@Component({
  selector: 'app-motor-form',
  imports: [NgClass, CardContainer],
  templateUrl: './motor-form.html',
  styleUrl: './motor-form.css',
})
export class MotorForm {
  motors = input<Motorization[]>();
  preselectedId = input<string | undefined>('');
  motor = output<Motorization>();

  selected: Motorization | undefined;

  select(motor: Motorization) {
    console.log('Selected motorization: ', motor);
    this.selected = motor;
    this.motor.emit(motor);
  }

  effects = effect(() => {
    if (
      this.preselectedId() !== undefined &&
      this.preselectedId() !== '' &&
      this.motors() !== undefined
    ) {
      for (const motor of this.motors()!) {
        if (motor.id === this.preselectedId()) {
          this.select(motor);
        }
      }
    }
  });
}
