export class Certificate {
    constructor(
        public label?: string,
        public thumbprint?: string,
        public name?: string,
        public owner?: string,
        public validFrom?: string,
        public validTo?: string,
        public ogrn?: string,
        public snils?: string,
        public inn?: string
    ) {
    }
}
