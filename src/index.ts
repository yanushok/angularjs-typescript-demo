
import * as angular from "angular";
import * as moment from "moment";

import McDateComponent from "./components/McDatesComponent";

angular
    .module('mc-dates', ['ngMaterial'])
    .config(["$mdDateLocaleProvider", function ($mdDateLocaleProvider: angular.material.IDateLocaleProvider) {
        $mdDateLocaleProvider.formatDate = function (date: Date) {
            return date ? moment(date).format('DD.MM.YYYY') : '';
        };

        $mdDateLocaleProvider.parseDate = function (dateString: string) {
            const m = moment(dateString, 'DD.MM.YYYY', true);
            return m.isValid() ? m.toDate() : new Date(NaN);
        };
    }])
    .controller('MainCtrl', function () {
        this.dateFrom = "2017-12-05";
        this.dateTo = "2017-12-19";

        this.changeDates = () => {
            alert(`Date changed! - ${this.dateFrom} - ${this.dateTo}`);
        }
    })
    .component("mcDates", new McDateComponent());

angular.element(document).ready(function () {
    angular.bootstrap(document, ['mc-dates']);
});