import { Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {

  @Input() shouldShowCamera: string;
  @Output() openCamera: EventEmitter<any> = new EventEmitter();

  constructor(private readonly router: Router) { }

  ngOnInit() {}

  goHome() {
    this.router.navigate(['main']);
  }

  goToAddPage(): void {
    this.router.navigate(['add']);
  }

  logout() {
    localStorage.removeItem("user");

    this.router.navigate(["login"]);
  }

  takePicture() {
    this.openCamera.emit();
  }
}
