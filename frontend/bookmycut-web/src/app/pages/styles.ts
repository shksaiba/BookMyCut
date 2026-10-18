import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  standalone: true,
  imports: [RouterLink],
  template: `
  <div class="wrap" style="padding-top:30px">
    <h1 style="font-size:36px">Style catalog</h1>
    <p class="mut">Haircuts, colors, beard and styling. Rate any style and see which salons offer it.</p>
    <div class="chips" style="margin:16px 0">@for (c of cats; track c) {<button class="chip dark" [class.on]="cat()===c" (click)="cat.set(c)">{{c}}</button>}</div>
    <div style="display:grid;grid-template-columns:260px 1fr;gap:20px;align-items:start">
      <div class="card">
        <h3>Filters</h3>
        <small class="mut">Type</small>
        <div class="chips" style="margin:6px 0 14px">@for (t of types; track t) {<button class="chip" [class.on]="type()===t" (click)="toggle(type, t)">{{t}}</button>}</div>
        <small class="mut">Face shape</small>
        <div class="chips" style="margin:6px 0 14px">@for (t of shapes; track t) {<button class="chip" [class.on]="shape()===t" (click)="toggle(shape, t)">{{t}}</button>}</div>
        <small class="mut">Hair length</small>
        <div class="chips" style="margin:6px 0">@for (t of lengths; track t) {<button class="chip" [class.on]="len()===t" (click)="toggle(len, t)">{{t}}</button>}</div>
      </div>
      <div>
        <div class="row" style="margin-bottom:12px"><span class="mut">{{list().length}} styles for {{cat()}}</span>
          <select (change)="sort.set($any($event.target).value)" style="padding:9px;border-radius:10px;border:1px solid var(--line)">
            <option value="rating">Sort: Top rated</option><option value="price">Sort: Price</option></select></div>
        <div class="g3">
          @for (s of list(); track s.id) {
            <div class="pcard"><div class="ph" style="height:140px" [style.background]="s.color">{{s.name}}</div>
              <div class="body"><div class="row"><b>{{s.name}}</b><span><span class="star">★</span> {{s.rating}}</span></div>
                <div class="mut" style="font-size:13px">From ₹{{s.price}}, {{s.min}} min{{s.length ? ', ' + s.length : ''}}</div>
                <div class="ok">{{s.salons}} salons offer this</div>
                <div class="row" style="margin-top:10px"><a routerLink="/try-on" class="btn btn-out btn-block">Try on</a><a routerLink="/salons" class="btn btn-dark btn-block">Find salon</a></div></div></div>
          } @empty { <p class="mut">No styles match these filters.</p> }
        </div>
      </div>
    </div>
  </div>`
})
export class StylesComponent {
  data = inject(DataService);
  cats = ['Men', 'Women', 'Boys', 'Girls']; types = ['Haircut', 'Color', 'Beard', 'Styling'];
  shapes = ['Oval', 'Round', 'Square', 'Heart']; lengths = ['Short', 'Medium', 'Long'];
  cat = signal('Men'); type = signal(''); shape = signal(''); len = signal(''); sort = signal('rating');
  toggle(sig: any, v: string) { sig.set(sig() === v ? '' : v); }
  list = computed(() => {
    let r = this.data.styles.filter(s => s.cat === this.cat()
      && (!this.type() || s.type === this.type())
      && (!this.shape() || s.shape.includes(this.shape()))
      && (!this.len() || s.length === this.len()));
    return r.sort((a, b) => this.sort() === 'price' ? a.price - b.price : b.rating - a.rating);
  });
}
