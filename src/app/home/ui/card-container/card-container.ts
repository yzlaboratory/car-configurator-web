import { NgClass } from '@angular/common';
import { Component, computed, input, model } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-card-container',
  imports: [NgClass],
  templateUrl: './card-container.html',
  styleUrl: './card-container.css',
})
export class CardContainer {
  title = input<string>();

  isOpen = model<boolean>(true);

  toggle() {
    this.isOpen.update((open) => !open);
  }
}
