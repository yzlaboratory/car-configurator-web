import { NgClass } from '@angular/common';
import { Component, computed, input, model, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-card-container',
  imports: [NgClass],
  templateUrl: './card-container.html',
  styleUrl: './card-container.css',
})
export class CardContainer {
  title = input<string>();
  hasErrorState = input<boolean>();
  isOpen = signal<boolean>(true);

  toggle() {
    this.isOpen.update((open) => !open);
  }
}
