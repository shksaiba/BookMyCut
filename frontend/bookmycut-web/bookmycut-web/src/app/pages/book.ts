import { Component, computed, signal } from '@angular/core';

@Component({
  standalone: true,
  template: `
  <div class="wrap" style="padding-top:24px">
    <div class="row" style="justify-content:flex-start;gap:14px"><div style="width:56px;height:56px;border-radius:14px;background:#DCE2EE;display:grid;place-items:center;font-size:11px">Photo</div>
      <div><h1 style="font-size:30px;margin:0">Studio Nine</h1><small class="mut">1.2 km away, Unisex, open until 9 PM, 4.8 rating from 312 reviews</small></div></div>
    <div style="display:grid;grid-template-columns:1fr 340px;gap:20px;margin-top:20px;align-items:start">
      <div style="display:grid;gap:16px">
        <div class="card"><h3>1. Your style</h3><div class="row"><div><b>Skin fade, men</b><div class="mut">40 min, Rs 350</div></div><button class="btn btn-out">Change</button></div></div>
        <div class="card"><h3>2. Choose a stylist</h3><div class="chips">
          @for (s of stylists; track s.n) {<button class="chip" [class.on]="stylist()===s.n" (click)="stylist.set(s.n)"><b>{{s.n}}</b><br><small>{{s.d}}</small></button>}</div></div>
        <div class="card"><h3>3. Pick date and time</h3>
          <div class="chips" style="margin-bottom:12px">@for (d of days; track d) {<button class="chip dark" [class.on]="day()===d" (click)="day.set(d)">{{d}}</button>}</div>
          <div class="chips">@for (t of times; track t) {<button class="chip dark" [class.on]="time()===t" [disabled]="taken.includes(t)" [style.opacity]="taken.includes(t) ? .4 : 1" (click)="time.set(t)">{{t}}</button>}</div></div>
        <div class="card"><h3>4. Payment</h3><div class="g3">
          @for (m of modes; track m.k) {<button class="chip" style="border-radius:14px;text-align:left;padding:14px" [class.on]="mode()===m.k" (click)="mode.set(m.k)"><b>{{m.t}}</b><br><small class="mut">{{m.d}}</small></button>}</div>
          <small class="mut" style="display:block;margin:12px 0 6px">Pay with (Razorpay)</small>
          <div class="chips">@for (p of pays; track p) {<button class="chip dark" [class.on]="pay()===p" (click)="pay.set(p)">{{p}}</button>}</div></div>
        <div class="card"><h3>Ratings and reviews</h3>
          @for (r of ratings; track r[0]) {<div class="row" style="margin:6px 0"><span style="width:100px">{{r[0]}}</span><div class="bar" style="flex:1"><i [style.width.%]="+r[1]*20"></i></div><b>{{r[1]}}</b></div>}
          <small class="mut">Only customers with a completed booking can review.</small></div>
      </div>
      <div class="card" style="position:sticky;top:16px"><h3>Booking summary</h3>
        <div class="row"><span>Skin fade</span><span>Rs {{price}}</span></div>
        <div class="row"><span>Booking fee</span><span>Rs {{fee}}</span></div><hr style="border:0;border-top:1px solid var(--line)">
        <div class="row"><span class="mut">Stylist</span><b>{{stylist()}}</b></div>
        <div class="row"><span class="mut">When</span><b>{{day()}}, {{time()}}</b></div><hr style="border:0;border-top:1px solid var(--line)">
        <div class="row"><span>Total</span><b>Rs {{price+fee}}</b></div>
        <div class="row"><b>Pay now</b><b style="font-size:18px">Rs {{payNow()}}</b></div>
        <small class="mut">Free cancellation up to 2 hours before. Refund goes back to the original payment method.</small>
        <button class="btn btn-p btn-block" style="margin-top:12px" (click)="done.set(true)">{{payNow() ? 'Pay Rs ' + payNow() + ' with ' + pay() : 'Confirm booking'}}</button>
        @if (done()) { <p class="ok" style="margin-top:10px">Booking confirmed (demo). Razorpay backend baad mein judega.</p> }
      </div>
    </div>
  </div>`
})
export class BookComponent {
  price = 350; fee = 20;
  stylists = [{ n: 'Any stylist', d: 'First available' }, { n: 'Rohan', d: 'Fades, 8 yrs' }, { n: 'Imran', d: 'Beard and color' }];
  days = ['Today, 15 Oct', 'Fri, 16 Oct', 'Sat, 17 Oct'];
  times = ['5:45 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM']; taken = ['6:00 PM'];
  modes = [{ k: 'full', t: 'Pay full now', d: 'Rs 370 today' }, { k: 'adv', t: 'Pay advance', d: 'Rs 100 now, rest at salon' }, { k: 'salon', t: 'Pay at salon', d: 'Rs 0 now' }];
  pays = ['UPI', 'Card', 'Netbanking', 'Wallet'];
  ratings = [['Cleanliness', '4.9'], ['Service', '4.8'], ['Value', '4.6'], ['Staff', '4.8']];
  stylist = signal('Any stylist'); day = signal(this.days[0]); time = signal('6:30 PM'); mode = signal('adv'); pay = signal('UPI'); done = signal(false);
  payNow = computed(() => this.mode() === 'full' ? this.price + this.fee : this.mode() === 'adv' ? 100 : 0);
}
