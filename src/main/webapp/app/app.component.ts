import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AppConfigService} from './core/app-load/services/app-config.service';

@Component({
  selector: 'otus-architect-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {

  private config: any;

  constructor(private router: Router, private configService: AppConfigService) {
      this.configService.config$.subscribe(config => this.config = config);
  }

  title = 'SBI КИК';
  ngOnInit(): void {
  }

  get stickHeader() {
    return this.config['stickHeader'] ? this.config['stickHeader'] : null;
  }
}
