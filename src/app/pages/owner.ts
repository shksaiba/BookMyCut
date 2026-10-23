import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterLink],
  template: `
  <div style="display:grid;grid-template-columns:225px 1fr;min-height:100vh">
    <aside style="background:var(--ink);color:#fff;padding:18px">
      <a routerLink="/" style="font-weight:800;font-size:22px">BookMyCut <small style="color:#b9a6ee;font-weight:500;font-size:12px">for salons</small></a>
      <div style="margin-top:20px;display:grid;gap:4px">
        @for (m of menu; track m) {<div (click)="tab.set(m)" style="padding:11px 12px;border-radius:10px;cursor:pointer" [style.background]="tab()===m ? '#2a2a38' : ''">{{m}}</div>}
      </div></aside>
    <main style="padding:24px 28px">
      <div class="row"><div><h1 style="font-size:32px;margin:0">Studio Nine</h1><small class="mut">Overview for today. Sample data.</small></div><button class="btn btn-p">Add walk-in booking</button></div>
      @if (tab()==='Overview') {
      <div class="g4" style="margin:18px 0">
        @for (c of stats; track c[0]) {<div class="card"><small class="mut">{{c[0]}}</small><div style="font-size:30px;font-weight:700">{{c[1]}}</div><div class="ok">{{c[2]}}</div></div>}
      </div>
      <div style="display:grid;grid-template-columns:2fr 1fr;gap:16px">
        <div class="card"><h3>Today's schedule</h3>
          <table style="width:100%;border-collapse:collapse;font-size:14px"><tr class="mut" style="text-align:left"><th>Time</th><th>Customer</th><th>Style</th><th>Stylist</th><th>Payment</th></tr>
            @for (r of rows; track r[0]) {<tr style="border-top:1px solid var(--line)"><td style="padding:10px 0"><b>{{r[0]}}</b></td><td>{{r[1]}}</td><td>{{r[2]}}</td><td>{{r[3]}}</td>
              <td><span class="pill" [class.paid]="r[4]==='Paid'" [class.salon]="r[4]==='Pay at salon'">{{r[4]}}</span></td></tr>}</table></div>
        <div class="card"><h3>Popular styles this week</h3>
          @for (p of popular; track p[0]) {<div style="margin:10px 0"><div class="row"><span>{{p[0]}}</span><b>{{p[1]}}</b></div><div class="bar"><i [style.width.%]="+p[1]/24*100"></i></div></div>}</div>
      </div>
      <div class="card" style="margin-top:16px"><h3>Latest reviews</h3><div class="g3" style="grid-template-columns:1fr 1fr">
        <div style="background:var(--bg);padding:14px;border-radius:12px"><b>Aarav S.</b> <small class="mut">Skin fade, 5 stars</small><p>Clean fade, started right on time. Stylist understood the reference photo from the app.</p><a style="color:var(--p);font-weight:600">Reply</a></div>
        <div style="background:var(--bg);padding:14px;border-radius:12px"><b>Meera K.</b> <small class="mut">Layered cut, 4 stars</small><p>Great cut. Waiting area was a bit crowded, otherwise perfect.</p><a style="color:var(--p);font-weight:600">Reply</a></div></div></div>
      } @else { <div class="card" style="margin-top:18px"><h3>{{tab()}}</h3><p class="mut">Ye page Step 16 mein banega.</p></div> }
    </main>
  </div>`
})
export class OwnerComponent {
  menu = ['Overview', 'Bookings', 'Services and styles', 'Stylists and slots', 'Offers', 'Earnings and payouts', 'Reviews'];
  tab = signal('Overview');
  stats = [['Bookings today', '18', '4 slots still open'], ['Revenue today', '₹9,460', 'Payout every Monday'], ['Rating', '4.8', 'From 312 reviews'], ['Repeat customers', '46%', 'Last 30 days']];
  rows = [['5:45 PM', 'Aarav S.', 'Skin fade', 'Rohan', 'Paid'], ['6:00 PM', 'Meera K.', 'Layered cut', 'Imran', 'Advance'], ['6:30 PM', 'Kabir D.', 'Beard sculpt', 'Rohan', 'Pay at salon'], ['7:00 PM', 'Tia (age 7)', 'Princess trim', 'Imran', 'Paid'], ['7:30 PM', 'Zoya R.', 'Balayage', 'Imran', 'Advance']];
  popular = [['Skin fade', '24'], ['Layered cut', '19'], ['Beard sculpt', '15'], ['Kids trim', '12']];
}
