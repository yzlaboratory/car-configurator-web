import { NgClass } from '@angular/common';
import { Component, input, signal } from '@angular/core';

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
