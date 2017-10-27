export class Evaluation {
    public uid: string;
    public root: string;
    public timestampFinished: any;    
    public userId: string;
        
    constructor(
        public timestampCreate: any,
        public finished: boolean = false
    ) {}
}