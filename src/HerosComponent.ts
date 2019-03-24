import * as moment from "moment";

interface IHero {
    id: number;
    name: string;
    date: moment.Moment;
}

const HEROS: IHero[] = [
    { id: 11, name: "Mr. Nice", date: moment() },
    { id: 12, name: "Narco", date: moment() },
    { id: 13, name: "Bombasto", date: moment() },
    { id: 14, name: "Celeritas", date: moment() },
    { id: 15, name: "Magneta", date: moment() },
    { id: 16, name: "RubberMan", date: moment() },
    { id: 17, name: "Dynama", date: moment() },
    { id: 18, name: "Dr IQ", date: moment() },
    { id: 19, name: "Magma", date: moment() },
    { id: 20, name: "Tornado", date: moment() }
];

class HerosComponentController implements ng.IComponentController {

    public heros: IHero[];

    public $onInit() {
        this.heros = HEROS;
    }
}

class HerosComponent implements ng.IComponentOptions {

    public controller: ng.Injectable<ng.IControllerConstructor>;
    public template: string;

    constructor() {
        this.controller = HerosComponentController;
        this.template = `
            {{ moment().format() }}
            <ul>
                <li ng-repeat="hero in $ctrl.heros">{{ hero.name }} {{ hero.date }}</li>
            </ul>
        `;
    }
}

export default HerosComponent;