export class Country {
    constructor(
        public id?: string,
        public code?: string,
        public name?: string,
        public description?: string,
        public visa?: boolean,
        public migrationCard?: boolean
    ) {
    }
}
