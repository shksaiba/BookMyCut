import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from '../data.service';
import { PhotoComponent } from '../photo';

@Component({
  standalone: true,
  imports: [RouterLink, PhotoComponent],
  template: `
  <div class="wrap" style="padding-top:30px">
    <h1 style="font-size:40px">AI try-on</h1>
    <p class="mut">Upload a clear, front-facing selfie. We detect your face shape, then show how each style would look on you.</p>
    <div style="display:grid;grid-template-columns:1fr 1fr 300px;gap:18px;margin-top:20px">
      <div><small class="mut">Your photo</small>
        <div style="border:2px dashed #b9a6ee;border-radius:20px;height:380px;background:#fff;display:grid;place-items:center;text-align:center;overflow:hidden;margin-top:6px">
          @if (photo()) { <img [src]="photo()" style="width:100%;height:100%;object-fit:cover"> }
          @else { <div><div style="font-size:30px;color:var(--p)">⬆</div><b>Upload or take a selfie</b><p class="mut" style="font-size:13px">JPG or PNG, face clearly visible, hair not covered</p>
            <label class="btn btn-dark">Choose photo<input type="file" accept="image/png,image/jpeg" hidden (change)="pick($event)"></label></div> }
        </div></div>
      <div><small class="mut">With {{style()}}</small>
        <div style="border-radius:20px;height:380px;background:#E4DDF5;margin-top:6px;position:relative;overflow:hidden">
          <app-photo [slot]="styleSlot()" [alt]="style()" style="position:absolute;inset:0"/>
          <div style="position:absolute;left:12px;right:12px;bottom:12px;background:#fffffff0;border-radius:12px;padding:10px 14px">
            <b style="color:#4a2bb0">{{style()}}</b><br><small style="color:var(--p)">{{photo() ? 'AI result will appear here (backend baad mein)' : 'Reference look. AI result appears here after upload'}}</small></div></div></div>
      <div style="display:grid;gap:14px;align-content:start">
        <div class="card"><small style="color:var(--p)">FACE ANALYSIS</small><h3>Oval face</h3><p class="mut" style="font-size:14px">Balanced proportions. Most styles work; textured and layered cuts add structure.</p><hr style="border:0;border-top:1px solid var(--line)">Hair type: <b>Wavy</b><br>Skin tone suggestion: <b>Warm browns, copper</b></div>
        <div class="card"><h3>Like this look?</h3><a routerLink="/salons" class="btn btn-p btn-block">Find salons for {{style()}}</a><button class="btn btn-out btn-block" style="margin-top:8px;color:var(--ink);border-color:var(--line)">Share with my stylist</button></div>
        <div class="card" style="background:var(--soft)"><b style="color:var(--p)">Your photo stays private</b><p style="font-size:13px;margin:6px 0 0" class="mut">Used only for this preview with your consent, and deleted right after processing.</p></div>
      </div>
    </div>
    <h3 style="margin-top:20px">Pick a style to try</h3>
    <div class="chips">@for (s of opts; track s[0]) {<button class="chip" style="border-radius:14px;padding:12px 16px" [class.on]="style()===s[0]" (click)="style.set(s[0])"><b>{{s[0]}}</b><br><small>{{s[1]}} match</small></button>}</div>
  </div>`
})
export class TryonComponent {
  opts = [['Skin fade', '88%'], ['Textured crop', '92%'], ['Classic taper', '85%'], ['Quiff', '79%'], ['Burgundy color', '74%']];
  style = signal('Textured crop'); photo = signal('');
  data = inject(DataService);
  styleSlot = computed(() => 'style-' + (this.data.styles.find(s => s.name === this.style())?.id ?? 0));
  pick(e: Event) {
    const f = (e.target as HTMLInputElement).files?.[0];
    if (!f) return;
    const r = new FileReader(); r.onload = () => this.photo.set(r.result as string); r.readAsDataURL(f);
  }
}
