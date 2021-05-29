import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'personInitials'
})
export class PersonInitialsPipe implements PipeTransform {

    transform(value: any, args: any): any {
        return value;
    }
}
