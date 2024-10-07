import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Language} from 'angular-l10n';
import {SettingService} from '../../../../services/setting/setting.service';


@Component({
  selector: 'app-auto-refresh-popup',
  templateUrl: './auto-refresh-popup.component.html',
  styleUrls: ['./auto-refresh-popup.component.scss']
})
export class AutoRefreshPopupComponent implements OnInit {

  @Language() lang: string;
  @Output() actionEvent: EventEmitter<any> = new EventEmitter();
  show;
  timeInSeconds;
  autoRefreshObject;
  timeInterval;
  canceled;
  closed;

  constructor(private _settingService: SettingService) {
      this.autoRefreshObject = this._settingService.autoRefreshSettings();
      this.autoRefresh();
  }
  ngOnInit() {}



  // ----------------------- handle Auto Refresh Events-----------------------
  autoRefreshEvent(action) {
    switch (action) {
        case 'refresh': this.actionEvent.emit({action : action}); this.show = false; this.canceled = true; break;
        case 'cancel': this.canceled = true; break;
        case 'close': this.show = false; this.closed = true; break;
    }
  }


  // ----------------------- handle Auto Refresh -----------------------
  autoRefresh() {
    if ( this.autoRefreshObject.enabled) {
      this.timeInSeconds = this.autoRefreshObject.refreshTime * 0.001;
      const ref = this;
      this.timeInterval = setInterval(function() {
          ref.timeInSeconds = ref.timeInSeconds - 1;
          ref.show = ref.timeInSeconds <= 10 && !ref.canceled && !ref.closed;
          if (ref.timeInSeconds <= 0 && !ref.canceled ) {
                ref.show = false;
                ref.timeInSeconds = ref.autoRefreshObject.refreshTime * 0.001;
                ref.autoRefreshEvent('refresh');
                ref.canceled = false;
                ref.closed = false;
          }
          if ( ref.timeInSeconds === 0) {
              ref.canceled = false;
              ref.closed = false;
              ref.timeInSeconds = ref.autoRefreshObject.refreshTime * 0.001;
          }
        }, 1000);
    }
  }
}
