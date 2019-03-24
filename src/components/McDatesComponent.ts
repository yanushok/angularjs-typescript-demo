import * as moment from "moment";

enum TypeOfRange {
    today,
    yesterday,
    twoWeeks,
    month,
    all
}

class McDateController implements ng.IComponentController {
    public static $inject: string[] = ["$timeout"];
    public dateFrom: string;
    public dateTo: string;
    public mcChange: Function;
    public minDate: Date;

    private changedFlag: TypeOfRange;
    private _dateFrom: moment.Moment;
    private _dateTo: moment.Moment;

    constructor(private $timeout: ng.ITimeoutService) {
        this.changedFlag = null;
    }

    public $onInit() {
        if (this.dateFrom) {
            this.minDate = new Date(<string>this.dateFrom);
        }

        this._dateFrom = moment(this.dateFrom);
        this._dateTo = moment(this.dateTo);
    }

    public change(dateFrom: moment.Moment, dateTo: moment.Moment) {
        this.checkAllowedRange(dateFrom, dateTo);

        this.dateFrom = this._dateFrom && this._dateFrom.format("YYYY-MM-DD");
        this.dateTo = this._dateTo && this._dateTo.format("YYYY-MM-DD");

        // Совсем не уверен.
        this.$timeout(() => {
            this.mcChange();
        }, 0);
        
        // this.mcChange();
    }

    public changeDate () {
        this.changedFlag = null;
        this._dateFrom = this._dateFrom && moment(this._dateFrom);
        this._dateTo = this._dateTo && moment(this._dateTo);
        this.change(this._dateFrom, this._dateTo);
    }

    public clickYesterday() {
        if (this.changedFlag === TypeOfRange.yesterday) return;

        this._dateFrom = moment().subtract(1, 'day');
        this._dateTo = moment().subtract(1, 'day');
        this.change(this._dateFrom, this._dateTo);
        this.changedFlag = TypeOfRange.yesterday;
    }

    public clickToday() {
        if (this.changedFlag === TypeOfRange.today) return;

        this._dateFrom = moment();
        this._dateTo = moment();
        this.change(this._dateFrom, this._dateTo);

        this.changedFlag = TypeOfRange.today;
    }

    public clickTwoWeeks() {
        if (this.changedFlag === TypeOfRange.twoWeeks) return;

        this._dateFrom = moment().subtract(2, 'week');
        this._dateTo = moment();
        this.change(this._dateFrom, this._dateTo);

        this.changedFlag = TypeOfRange.twoWeeks;
    }

    public clickMonth() {
        if (this.changedFlag === TypeOfRange.month) return;

        this._dateFrom = moment().subtract(1, 'month');
        this._dateTo = moment();
        this.change(this._dateFrom, this._dateTo);

        this.changedFlag = TypeOfRange.month;
    }

    public clickAll() {
        if (this.changedFlag === TypeOfRange.all) return;

        this._dateFrom = null;
        this._dateTo = null;
        this.change(this._dateFrom, this._dateTo);

        this.changedFlag = TypeOfRange.all;
    }

    private checkAllowedRange(dateFrom: moment.Moment, dateTo: moment.Moment) {
        if (!dateFrom) {
            this.minDate = null;
            return;
        }

        this.minDate = new Date(dateFrom.format("YYYY-MM-DD"));

        if (dateFrom.isAfter(dateTo)) {
            this._dateTo = dateFrom.clone();
        }
    }
}

class McDateComponent implements ng.IComponentOptions {
    public controller: ng.Injectable<ng.IControllerConstructor>;
    public templateUrl: string;
    public bindings: {[boundProperty: string]: string};

    constructor() {
        this.controller = McDateController;
        this.templateUrl = 'views/McDatesComponent.template.html';
        this.bindings = {
            mcChange: '&',
            dateFrom: '=',
            dateTo: '=',
        };
    }
}

export default McDateComponent;
