import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  standalone: true,
  imports: [RouterLink],
  template: `
  <div class="wrap" style="padding-top:50px">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center">
      <div>
        <span class="tag">Men, Women, Boys, Girls</span>
        <h1>Try the haircut before you book it.</h1>
        <p class="mut">Browse cuts and colors, see how they look on your own photo with AI, then book a nearby salon and pay in one place.</p>
        <div class="card row" style="gap:10px">
          <input placeholder="Where: Use my location" style="flex:1;padding:12px;border:1px solid var(--line);border-radius:10px">
          <input placeholder="Service: Haircut, color, beard" style="flex:1;padding:12px;border:1px solid var(--line);border-radius:10px">
          <a routerLink="/salons" class="btn btn-dark">Find salons</a>
        </div>
      </div>
      <div style="background:#E4DDF5;border-radius:24px;height:340px;position:relative;display:grid;place-items:center;color:var(--p)">
        Hero photo: stylist at work
        <div class="card" style="position:absolute;left:16px;bottom:16px;width:250px;box-shadow:0 8px 24px #0002">
          <small style="color:var(--p)">AI FACE MATCH</small>
          <b style="display:block">Oval face, 5 cuts suit you</b>
          <div class="bar" style="margin:8px 0"><i style="width:92%"></i></div>
          <small class="mut">Best match: Textured crop, 92%</small>
        </div>
      </div>
    </div>

    <div class="row" style="margin:50px 0 16px"><h2>Trending styles</h2>
      <div class="chips">@for (t of tabs; track t) {<button class="chip dark" [class.on]="tab()===t" (click)="tab.set(t)">{{t}}</button>}</div>
    </div>
    <div class="g4">
      @for (s of trending(); track s.id) {
        <div class="pcard"><div class="ph" [style.background]="s.color">{{s.name}}</div>
          <div class="body"><b>{{s.name}}</b><div class="mut" style="font-size:13px">From ₹{{s.price}}, {{s.min}} min</div><div><span class="star">★</span> {{s.rating}}</div></div></div>
      } @empty { <p class="mut">No styles yet.</p> }
    </div>

    <h2 style="margin:50px 0 16px">How it works</h2>
    <div class="g4">
      @for (h of how; track h.n) {<div><span class="pill">{{h.n}}</span><h3 style="margin-top:10px">{{h.t}}</h3><p class="mut" style="font-size:14px">{{h.d}}</p></div>}
    </div>

    <div class="row" style="margin:40px 0 16px"><h2>Salons near you</h2><a routerLink="/salons" style="color:var(--p);font-weight:600">See all on map</a></div>
    <div class="g3">
      @for (s of data.salons.slice(0,3); track s.id) {
        <div class="card row" style="justify-content:flex-start"><div style="width:70px;height:70px;border-radius:12px;background:#DCE2EE;display:grid;place-items:center;font-size:12px">Photo</div>
          <div><b>{{s.name}}</b><div class="mut" style="font-size:13px">{{s.km}} km, {{s.kind}}, {{s.rating}} rating</div><div class="ok">Next slot {{s.slot}}</div></div></div>
      }
    </div>

    <div style="background:var(--ink);color:#fff;border-radius:24px;padding:30px;margin:40px 0" class="row">
      <div><h2>Own a salon? List it on BookMyCut.</h2><p style="color:#bbb;margin:6px 0 0">Manage slots, stylists, offers and payouts from one dashboard.</p></div>
      <a routerLink="/owner" class="btn btn-w">Open salon dashboard</a>
    </div>
  </div>`
})
export class HomeComponent {
  data = inject(DataService);
  tabs = ['Men', 'Women', 'Boys', 'Girls'];
  tab = signal('Men');
  trending = computed(() => this.data.styles.filter(s => s.cat === this.tab()).slice(0, 4));
  how = [
    { n: 1, t: 'Browse styles', d: 'Cuts and colors for men, women, boys and girls, filtered by face shape, hair length and occasion.' },
    { n: 2, t: 'Try it with AI', d: 'Upload a selfie and see the style on you before you decide.' },
    { n: 3, t: 'Pick a salon and slot', d: 'Nearby salons on a map, with stylists, prices and live slots.' },
    { n: 4, t: 'Pay and rate', d: 'Pay online or at the salon, then rate the salon and the haircut.' },
  ];
}
