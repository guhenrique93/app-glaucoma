export class Evaluation {
    public uid: string;
    public root: string;
    public timestampFinished: any;    
        
    constructor(
        public timestampCreate: any,
        public finished: boolean = false
    ) {}
}