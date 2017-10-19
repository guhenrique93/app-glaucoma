export class Answer {
    public root: string;
    public answer: string = null;
    public answerRE: string = null;
    public answerLE: string = null;
    public answerA: string = null;
    public answerB: string = null;
    public why: string;
    public detailsWhy: string;
    public answered: boolean;  

    constructor(
        public riskFactor: string
    ) {}
}