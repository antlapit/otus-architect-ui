import {AuthService} from '../../core/auth/auth.service';

export class FileUtils {
    static formatSize(size: any) {
        if (isNaN(parseFloat(size)) || !isFinite(size)) {
            return '-';
        }
        const units = ['б', 'Кб', 'Мб', 'Гб', 'Тб', 'Пб'],
            number = Math.floor(Math.log(size) / Math.log(1024));
        return (size / Math.pow(1024, Math.floor(number))).toFixed(1) + ' ' + units[number];
    }

    static performDownloading(fileData: any, fileName: any) {
        const binaryString = window.atob(fileData.data);
        const binaryLen = binaryString.length;
        const fileContent = new Uint8Array(binaryLen);
        for (let i = 0; i < binaryLen; i++) {
            const ascii = binaryString.charCodeAt(i);
            fileContent[i] = ascii;
        }
        const blob = new Blob([fileContent]);

        if (navigator.msSaveBlob) {
            // IE 10+
            navigator.msSaveBlob(blob, fileName);
        } else {
            const link = document.createElement('a');
            // Browsers that support HTML5 download attribute
            if (link.download !== undefined) {
                const url = URL.createObjectURL(blob);
                link.setAttribute('href', url);
                link.setAttribute('download', fileName);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }

    static getUploadHeaders(authService: AuthService) {
        return [
            {
                name: 'Accept',
                value: 'application/json'
            },
            {
                name: 'X-XSRF-TOKEN',
                value: (!authService || !authService.getCsrfToken()) ? '' : authService.getCsrfToken()
            },
            {
                name: 'Authorization',
                value: !authService ? '' : authService.getAuthorizationHeaderValue()
            }
        ];
    }

    static getFileName(name: string) {
        return name.substring(0, name.lastIndexOf('.'));
    }

    static getFileExtension(name: string) {
        return name.substring(name.lastIndexOf('.') + 1);
    }
}
