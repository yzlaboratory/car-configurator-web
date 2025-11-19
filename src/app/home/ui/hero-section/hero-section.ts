import { AfterViewInit, Component, ElementRef, viewChild } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-hero-section',
  imports: [NgOptimizedImage],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css',
})
export class HeroSection implements AfterViewInit {
  baseAssetUrl = environment.ASSET_API_URL;
  scrollContainer = viewChild<ElementRef<HTMLDivElement>>('scrollContainer');

  ngAfterViewInit() {
    console.log(this.scrollContainer());
    if (this.scrollContainer() !== undefined) {
      this.scrollContainer()!.nativeElement.scrollLeft = 0;
    }
    setInterval(() => {
      if (this.scrollContainer() !== undefined) {
        const nativeElement = this.scrollContainer()!.nativeElement;
        const max_scroll = nativeElement.scrollWidth - nativeElement.clientWidth;
        const current_scroll = nativeElement.scrollLeft;
        if (nativeElement.scrollLeft + nativeElement.clientWidth * 0.51 > max_scroll) {
          nativeElement.scrollLeft = 0;
        } else nativeElement.scrollLeft = current_scroll + nativeElement.clientWidth * 0.51;
      }
    }, 10000);
  }
}
