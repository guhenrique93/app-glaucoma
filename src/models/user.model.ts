export class User {
    constructor(
        public name: string,
        public username: string,
        public email: string,
        public uid: string,
        public gender: string,
        public birthday: Date,
        public scholarity: string,
        public birthplace: string,
        public residencePlace: string,
        public concordant: Boolean        
    ){}
}