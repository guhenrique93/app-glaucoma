export class Answer {
    public root: string;
    public answer: string;
    public why: string;
    public answered: boolean;  

    constructor(
        public riskFactor: string
    ) {}
}