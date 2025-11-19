import { Component, input, output } from '@angular/core';
import { Motorization } from '../../../shared/data-access/entities/Motorization';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-motor-form',
  imports: [NgClass],
  templateUrl: './motor-form.html',
  styleUrl: './motor-form.css',
})
export class MotorForm {
  motors = input<Motorization[]>();
  motor = output<Motorization>();

  selected: Motorization | undefined;

  select(motor: Motorization) {
    console.log('Selected motorization: ', motor);
    this.selected = motor;
    this.motor.emit(motor);
  }
}
