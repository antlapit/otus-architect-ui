import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'phonesecure'
})
export class PhoneSecurePipe implements PipeTransform {
    transform(val, ...args) {
        if (!val) {
            return val;
        }
        const value = val.toString().trim().replace(/[^0-9]/gi, '');

        if (value.match(/[^0-9]/)) {
            return val;
        }

        let country, city, number;

        switch (value.length) {
            case 10: // +1PPP####### -> C (PPP) ###-####
                country = 1;
                city = value.slice(0, 3);
                number = value.slice(3);
                break;

            case 11: // +CPPP####### -> CCC (PP) ###-####
                country = value[0];
                city = value.slice(1, 4);
                number = value.slice(4);
                break;

            case 12: // +CCCPP####### -> CCC (PP) ###-####
                country = value.slice(0, 3);
                city = value.slice(3, 5);
                number = value.slice(5);
                break;

            default:
                return val;
        }

        if (country === 1) {
            country = '';
        }

        city = '***';
        number = '***' + '-' + number.slice(3, 5) + '-' + number.slice(5);

        return ('+' + country + ' (' + city + ') ' + number).trim();
    }
}
