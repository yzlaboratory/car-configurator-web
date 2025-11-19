import { CurrencyPipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [CurrencyPipe],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  price = input<number>(0);

  rate = computed(() => (this.price() / 12) * 1.05);
}
