import { Component } from '@angular/core';
import { iframeResizer } from 'iframe-resizer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vuce-olce-ui';
  ngOnInit() {
    iframeResizer({ log: true }, '#indicador-554') 
  }
}
