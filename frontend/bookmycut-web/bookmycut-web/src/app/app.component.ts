import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
  @if (!isOwner()) {
  <nav style="background:#fff;border-bottom:1px solid var(--line)">
    <div class="wrap row" style="height:64px">
      <div class="row" style="gap:28px">
        <a routerLink="/" style="font-weight:800;font-size:22px">BookMyCut</a>
        <a routerLink="/styles" routerLinkActive="act">Styles</a>
        <a routerLink="/salons" routerLinkActive="act">Salons near me</a>
        <a routerLink="/try-on" routerLinkActive="act">AI Try-On</a>
        <a routerLink="/owner">For salons</a>
      </div>
      <div class="row"><span style="margin-right:14px">Sign in</span><a routerLink="/book/1" class="btn btn-p">Book now</a></div>
    </div>
  </nav>
  }
  <router-outlet />
  @if (!isOwner()) {
  <footer class="wrap mut" style="padding:40px 20px;font-size:13px">© 2026 BookMyCut · Your look, your cut.</footer>
  }`,
  styles: ['a.act{color:var(--p)}']
})
export class AppComponent {
  isOwner() { return location.pathname.startsWith('/owner'); }
}
