import * as _ from 'lodash';
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

    transform(value: any, args: any): any {
        if (!args) {
            return value;
        }
        const re = new RegExp(_.escapeRegExp(args), 'gi');
        return value.replace(re, '<mark>' + args + '</mark>');
    }
}
