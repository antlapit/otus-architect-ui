import {ChangeDetectorRef, Component, Input} from "@angular/core";
import {CookieService} from "ngx-cookie";
import {SimpleFile} from "../domain/SimpleFile";
import {SigningService} from "../../core/signing/signing.service";
import {FileUtils} from "../file/files.utils";
import {AppConfigService} from "../../core/app-load/services/app-config.service";

@Component({
    selector: 'otus-architect-simple-file',
    templateUrl: './simple-file.component.html',
    styleUrls: ['./simple-file.component.scss']
})
export class SimpleFileComponent {

    @Input('file')
    file: SimpleFile;

    @Input('key')
    key: string;

    @Input('code')
    code: string;

    protected config: any = null;

    formatSize = FileUtils.formatSize;

    constructor(private cookieService: CookieService,
                private signingService: SigningService,
                protected configService: AppConfigService,
                private cd: ChangeDetectorRef) {
        this.configService.config$.subscribe(config => {
            this.config = config;
        });
    }

    ngOnDestroy(): void {
    }

    ngOnInit(): void {
    }

    downloadFile(item: SimpleFile) {
        const fileName = item.name;
        this.signingService.downloadFile(item.id, this.key, this.code).subscribe(
            response => FileUtils.performDownloading(response.body, fileName),
            error => console.log(error)
        );

    }
}
