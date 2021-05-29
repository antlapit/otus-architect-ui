// These constants are injected via webpack environment variables.
// You can add more variables in webpack.common.js or in profile specific webpack.<dev|prod>.js files.
// If you change the values in the webpack config files, you need to re run webpack to update the application

export const FIO_PATTERN = '[A-Za-zА-Яа-яЁё\\-\']+\\s[A-Za-zА-Яа-яЁё\\-\']+[\\sA-Za-zА-Яа-яЁё\\-\']*';
export const NAME_PATTERN = '[A-Za-zА-Яа-яЁё\\-\'\\s]*';
export const ADDRESS_PATTERN = '[A-Za-zА-Яа-яЁё0-9\\-\'\\s.,/]*';
export const NUMERIC_PATTERN = '^[0-9]*$';
export const RU_PASSPORT_SERIES_PATTERN = /^[0-9]{2} [0-9]{2}$/;
export const RU_PASSPORT_NUMBER_PATTERN = /^[0-9]{6}$/;
export const RU_CODE_DIVISION_PATTERN = /^[0-9]{3}-[0-9]{3}$/;
export const PASSPORT_ISSUED_BY_PATTERN = /^[a-zA-Zа-яА-ЯЁё0-9"+.,№\- ]*$/;
export const MAIL_PATTERN = /^[a-zA-Zа-яА-ЯЁё0-9.+\-_@ ]*$/;
export const INN_PATTERN = '^[0-9]{10,12}$';
export const ACCOUNT_PATTERN = '^[0-9]{20}$';
export const BIK_PATTERN = '^[0-9]{9}$';
export const DATE_FORMAT = 'YYYY-MM-DD';
export const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';

export const DATE_MASK = {
    mask: [/[0-3]/, /[0-9]/, '.', /[0-1]/, /[0-9]/, '.', /[1-2]/, /[0-9]/, /[0-9]/, /[0-9]/],
    keepCharPositions: true,
    guide: true,
    showMask: true
};

export const F_PARSE_YEAR_RANGE = (dtFrom: Date, dtTo: Date) => {
    if (!dtFrom || !dtTo) {
        return null;
    }
    return dtFrom.getFullYear() + ':' + dtTo.getFullYear();
};

export const ddmmyyyyToDate = (dateStr: string): Date => {
    if (!dateStr) {
        return null;
    }
    const lex = dateStr.split('.');
    if (lex.length !== 3) {
        return null;
    }
    return new Date(parseInt(lex[2], 0), parseInt(lex[1], 0) - 1, parseInt(lex[0], 0));
};

export const dateChangeInput = ($event: any, yearStrict2000: boolean): any => {
    if (!$event) {
        return;
    }
    if ($event.inputType !== 'insertText') {
        return;
    }
    const data = $event.data; // символ, который прилетел
    const targetValue = $event.target.value;
    const position = $event.target.selectionStart;
    const parts = targetValue.split('.');

    const div3 = parseInt('' + (position - 1) / 3, 0);
    const mod3 = (position - 1) % 3;
    let targetPosition = $event.target.selectionStart;

    if (data === '.') {
        // разделитель
        // дозаполнить число или месяц нулём
        if (position >= 7) {
            // точки здесь не должно быть, удаляем
            $event.target.value =
                targetValue.substring(0, position - 1) + (position < targetValue.length ? targetValue.substr(position) : '');
            return $event.target.value;
        }
        switch (mod3) {
            case 0:
                // 01.01.2001
                // ^---------
                $event.target.value = targetValue.substr(0, 3) + targetValue.substr(position);
                break;
            case 1:
                parts[div3] = '0' + parts[div3];
                targetPosition = position + 2;
                break;
            case 2:
                targetPosition = position + 1;
                break;
        }
    } else if (!/^[0-9]+$/.test(data)) {
        $event.target.value = targetValue.replace(/[^0-9\.]/g, '');
        $event.preventDefault(); // не число
        return $event.target.value;
    } else {
        if (position >= 7) {
            // suggest year
            if (parts[2].length > 4) {
                // обнуляем год
                parts[2] = data;
            }
            const initialLength = parts[2].length;
            parts[2] = suggestYear(parts[2], yearStrict2000);
            if (initialLength !== parts[2].length) {
                targetPosition = parts[2].length + 6;
            }
        } else {
            let suggested = false;
            switch (mod3) {
                case 0:
                    if (data > (div3 === 0 ? '3' : '1')) {
                        parts[div3] = '0' + data;
                        if (parts.length === div3 + 1) {
                            parts.push('');
                        }
                        targetPosition = position + 2;
                        suggested = true;
                    }
                    if (!suggested) {
                        if (parts[div3].length > 2) {
                            parts[div3] = parts[div3].substr(0, 1) + parts[div3].substr(2);
                            --targetPosition;
                        }
                    }
                    break;
                case 1:
                    if (parts.length === div3 + 1) {
                        parts.push('');
                    }
                    targetPosition = position + 1;
                    if (parts[div3].length > 2) {
                        parts[div3] = parts[div3].substr(1, 2);
                        --targetPosition;
                    }
                    break;
                case 2:
                    targetPosition = position + 1;
                    if (parts[div3].length > 2) {
                        parts[div3] = parts[div3].substr(1, 2);
                        --targetPosition;
                    }
                    break;
            }
        }
    }

    $event.target.value = validateDateParts(parts);
    $event.target.selectionStart = targetPosition;
    return $event.target.value;
};

export const suggestYear = (year: any, after2000: boolean): string => {
    if (year.length === 2) {
        if (after2000) {
            return '20' + year;
        } else {
            const parsedYear = parseInt(year, 0);
            const twoDigitsYear = new Date().getFullYear() % 100;
            return (parsedYear <= twoDigitsYear ? '20' : '19') + year;
        }
    }
    return year;
};

export const validateDateParts = (parts: any[]): string => {
    // проверяем значения месяца и числа
    if (parts.length > 1) {
        const day = parseInt(parts[0], 0);
        const month = parseInt(parts[1], 0);
        let leapYear = false;
        if (parts.length > 2) {
            const year = parseInt(parts[2], 0);
            leapYear = year % 4 === 0;
        }

        if (month > 12) {
            parts[1] = 12;
        }
        switch (month) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                if (day > 31) {
                    parts[0] = 31;
                }
                break;
            case 2:
                if (day > (leapYear ? 29 : 28)) {
                    parts[0] = leapYear ? 29 : 28;
                }
                break;
            case 4:
            case 6:
            case 9:
            case 11:
                if (day > 30) {
                    parts[0] = 30;
                }
                break;
        }
    }
    return parts.join('.');
};
