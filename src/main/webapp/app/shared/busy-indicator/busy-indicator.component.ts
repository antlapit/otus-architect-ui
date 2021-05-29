import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'otus-architect-busy-indicator',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './busy-indicator.component.html',
  styleUrls: ['./busy-indicator.component.css']
})
export class BusyIndicatorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
