import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';

@Pipe({
    name: 'dateFormat'
})
export class DateFormatPipe extends DatePipe implements PipeTransform {
    transform(value: any, args?: any): any {
        let date = value ? (value['updatedTs'] ? value['updatedTs'] : value['createdTs']) : null;
        return super.transform(date, 'd MMM yyyy');
    }
}
