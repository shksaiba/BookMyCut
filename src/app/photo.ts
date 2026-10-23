import { Component, computed, effect, input, signal, untracked } from '@angular/core';
import { photoCandidates } from './images';

@Component({
  selector: 'app-photo',
  standalone: true,
  template: `
    @if (current()) {
      <img [src]="current()" [alt]="alt()" loading="lazy" (error)="next()">
    } @else {
      <div class="fb" [style.background]="color()">{{ alt() }}</div>
    }`,
  styles: [`
    :host{display:block;overflow:hidden}
    img{width:100%;height:100%;object-fit:cover;display:block}
    .fb{width:100%;height:100%;display:grid;place-items:center;text-align:center;padding:6px;color:#555;font-size:13px}
  `]
})
export class PhotoComponent {
  slot = input.required<string>();
  alt = input('');
  color = input('#E4DDF5');

  private tried = signal(0);
  private list = computed(() => photoCandidates(this.slot()));
  current = computed(() => this.list()[this.tried()] ?? '');

  constructor() {
    effect(() => {
      this.slot();
      untracked(() => this.tried.set(0));
    });
  }

  next() { this.tried.update(n => n + 1); }
}
