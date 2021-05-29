import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'trim'})
export class TrimPipe implements PipeTransform {
    transform(value: any, limit: number): string {
        return !value ||  value.length <= limit ? value : value.substring(0, limit) + '...';
    }
}
