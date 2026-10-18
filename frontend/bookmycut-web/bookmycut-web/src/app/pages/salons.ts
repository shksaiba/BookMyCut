import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  standalone: true,
  imports: [RouterLink],
  template: `
  <div class="wrap" style="padding-top:30px">
    <div class="row" style="justify-content:flex-start;gap:16px;flex-wrap:wrap">
      <h1 style="font-size:36px;margin:0">Salons near you</h1>
      @for (f of filters; track f) {<button class="chip dark" [class.on]="active()===f" (click)="active.set(active()===f ? '' : f)">{{f}}</button>}
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:20px">
      <div style="display:grid;gap:12px">
        @for (s of list(); track s.id; let i = $index) {
          <div class="card" [style.border-color]="sel()===s.id ? 'var(--p)' : ''" (mouseenter)="sel.set(s.id)">
            <div class="row" style="align-items:flex-start;justify-content:flex-start;gap:16px">
              <div style="width:100px;height:100px;border-radius:12px;background:#DCE2EE;display:grid;place-items:center;font-size:12px">Photo</div>
              <div style="flex:1"><div class="row"><b>{{i+1}}. {{s.name}}</b><span><span class="star">★</span> {{s.rating}}</span></div>
                <div class="mut" style="font-size:13px">{{s.km}} km, {{s.kind}}{{s.open ? ', ' + s.open : ''}}</div>
                <div class="mut" style="font-size:13px">{{s.services}}</div>
                <div class="row" style="margin-top:10px"><span class="ok">Next slot {{s.slot}}</span><a [routerLink]="['/book', s.id]" class="btn btn-dark">Book</a></div></div></div></div>
        } @empty { <p class="mut">No salons found.</p> }
      </div>
      <div style="background:#E3E7EF;border-radius:20px;min-height:560px;position:relative;overflow:hidden">
        @for (s of list(); track s.id; let i = $index) {
          <div (click)="sel.set(s.id)" [style.left.%]="pos[i][0]" [style.top.%]="pos[i][1]"
            [style.background]="sel()===s.id ? 'var(--p)' : 'var(--ink)'"
            style="position:absolute;width:34px;height:34px;border-radius:50%;color:#fff;display:grid;place-items:center;font-weight:700;border:2px solid #fff;cursor:pointer">{{i+1}}</div>
        }
        <div style="position:absolute;left:50%;top:50%;width:16px;height:16px;border-radius:50%;background:#2F6FE4;border:3px solid #fff"></div>
        <div class="card row" style="position:absolute;left:14px;right:14px;bottom:14px;padding:12px 16px"><b>Radius 5 km, {{list().length}} salons found</b><small class="mut">Map placeholder: Google Maps goes here</small></div>
      </div>
    </div>
  </div>`
})
export class SalonsComponent {
  data = inject(DataService);
  filters = ['Under 5 km', 'Unisex', 'Kids friendly', 'Open now', 'Top rated'];
  active = signal('Under 5 km'); sel = signal(1);
  pos = [[40, 22], [78, 38], [30, 58], [64, 72]];
  list = computed(() => this.data.salons.filter(s => {
    const a = this.active();
    if (a === 'Under 5 km') return s.km < 5;
    if (a === 'Unisex') return s.kind === 'Unisex';
    if (a === 'Kids friendly') return /kids|Boys/.test(s.kind) || /Kids/.test(s.services);
    if (a === 'Top rated') return s.rating >= 4.7;
    return true;
  }));
}
