import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SummaryRefUtil {
  private summaryRef: HTMLElement | undefined;

  setSummaryRef(ref: HTMLElement) {
    this.summaryRef = ref;
  }
  getSummaryRef() {
    return this.summaryRef;
  }

  scrollToSummaryRef() {
    this.summaryRef!.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}
