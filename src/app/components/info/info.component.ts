import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {

  @Input() imageUrl: string;
  @Input() foodData: any;
  
  objectKeys = Object.keys;

  constructor() { }

  ngOnInit() {}

  capitalize(str: string) : string {
    str = str.toLocaleLowerCase();
    return str.charAt(0).toUpperCase() + str.substring(1);
  }

  normalize(val: string) {
    const floatVal = parseFloat(val);
    if (isNaN(floatVal)) {
      return val;
    }

    return Math.round(floatVal * 100) / 100
  }
}
