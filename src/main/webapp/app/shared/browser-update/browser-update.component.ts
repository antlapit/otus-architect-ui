import {Component} from '@angular/core';
import {CookieService} from 'ngx-cookie';

@Component({
    selector: 'otus-architect-browser-update',
    templateUrl: './browser-update.component.html'
})
export class BrowserUpdateComponent {
    private COOKIE_NAME = 'otus-architect-IGNORE-BROWSER-UPDATE';

    constructor(
        private cookieService: CookieService
    ) {

    }

    invalidBrowser() {
        const cookie = this.cookieService.get(this.COOKIE_NAME);
        if (cookie) {
            return false;
        }
        const browser = this.getBrowser();
        if (browser.name === 'Chrome' && browser.version <= 70) {
            return true;
        } else if (browser.name === 'IE' && browser.version <= 11) {
            return true;
        } else if (browser.name === 'Safari' && browser.version < 6) {
            // Safari версий не старше 5.1.10, а это значит версия строго меньше 6
            return true;
        } else if (browser.name === 'Safari (mobile)' && browser.version <= 7) {
            // Safari мобильная версия не старше 7
            return true;
        } else if (browser.name === 'Firefox' && browser.version <= 63) {

        } else if (browser.name === 'Opera' && browser.version <= 56) {
            return true;
        }
        return false;
    }

    browserName() {
        return this.getBrowser().name + ' ' + this.getBrowser().version;
    }

    getBrowser() {
        const ua = navigator.userAgent;
        let tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return {
                name: 'IE',
                version: (tem[1] || '')
            };
        }
        if (M[1] === 'Chrome') {
            tem = ua.match(/\bOPR|Edge\/(\d+)/);
            if (tem != null)   {
                return {
                    name: 'Opera',
                    version: tem[1]
                };
            }
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
        if ((tem = ua.match(/version\/(\d+)/i)) != null) {
            M.splice(1, 1, tem[1]);
        }

        if (M[0] === 'Safari') {
            // проверяем, что не мобильный
            if (ua.indexOf('Mobile') !== -1) {
                return {
                    name: 'Safari (mobile)',
                    version: M[1]
                };
            }
        }
        if (M[0] === 'MSIE') {
            // проверяем, что MSIE, и делаем из него IE
            return {
                name: 'IE',
                version: M[1]
            };
        }
        return {
            name: M[0],
            version: M[1]
        };
    }

    ignoreNotification() {
        const expireDate = new Date();
        expireDate.setHours(0, 0, 0, 0);
        if (expireDate.getMonth() === 11) {
            expireDate.setMonth(0);
            expireDate.setFullYear(expireDate.getFullYear() + 1);
        } else {
            expireDate.setMonth(expireDate.getMonth() + 1);
        }

        const opts = {
            expires: expireDate
        };
        this.cookieService.put(this.COOKIE_NAME, '1',  opts);
    }
}
