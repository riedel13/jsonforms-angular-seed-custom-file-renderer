import { Component } from '@angular/core';
import { angularMaterialRenderers } from '@jsonforms/angular-material';
import {formatIs, rankWith} from '@jsonforms/core';
import uischemaAsset from '../assets/uischema.json';
import schemaAsset from '../assets/schema.json';
import dataAsset from './data';
import {FileRendererComponent} from './file-renderer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  renderers = [
    ...angularMaterialRenderers,
    {
      renderer: FileRendererComponent,
      tester: rankWith(6, formatIs('file'))
    }
  ];
  uischema = uischemaAsset;
  schema = schemaAsset;
  data = dataAsset;
}
