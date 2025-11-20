import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { SummaryRefUtil } from '../../utils/summaryRefUtil';

@Component({
  selector: 'app-header',
  imports: [CurrencyPipe],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  price = input<number>(0);
  summaryNativeElement = input<HTMLElement>();

  rate = computed(() => (this.price() / 12) * 1.05);

  summaryRefUtil = inject(SummaryRefUtil);

  scrollToSummary() {
    console.log('Scroll to summary');
    this.summaryRefUtil.scrollToSummaryRef();
  }
}
