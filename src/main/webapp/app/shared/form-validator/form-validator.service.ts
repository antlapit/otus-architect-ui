import {Injectable} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class FormValidatorService {

    public validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({onlySelf: true});
                console.log(field + ' | value = ' + control.value + ' | valid = ' + control.valid);
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            } else if (control instanceof FormArray) {
                control.controls.forEach(el => {
                    if (el instanceof FormControl) {
                        el.markAsTouched({onlySelf: true});
                        console.log(el + ' value = ' + el.value + ' | valid = ' + el.valid);
                    } else if (el instanceof FormGroup) {
                        this.validateAllFormFields(el);
                    }
                });
            }
        });
    }

    public scrollToError(): void {
        const firstElementWithError = document.querySelector('input.ng-invalid, mat-select.ng-invalid');
        this.scrollTo(firstElementWithError);
    }

    public passportDateValidator: ValidatorFn = (issueDateControl: AbstractControl): ValidationErrors | null => {
        if (!issueDateControl || !issueDateControl.parent || !issueDateControl.parent.get('birthDate')) {
            return null;
        }
        const birthDate = issueDateControl.parent.get('birthDate');

        if (birthDate && issueDateControl && birthDate.value && issueDateControl.value) {
            let parsedDateBirth = null;
            try {
                parsedDateBirth = birthDate.value.getDate();
            } catch (e) {
                parsedDateBirth = Date.parse(birthDate.value);
            }
            let parsedDateIssue = null;
            try {
                parsedDateIssue = issueDateControl.value.getDate();
            } catch (e) {
                parsedDateIssue = Date.parse(issueDateControl.value);
            }
            return parsedDateBirth >= parsedDateIssue ? {'issueDateLessBirthDate': true} : null;
        }
        return null;
    };

    private scrollTo(el: Element): void {
        if (el) {
            el.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'});
        }
    }
}
