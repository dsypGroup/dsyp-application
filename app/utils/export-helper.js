import Ember from 'ember';
import languageDataStore from '../models/shared/language/language-data-store';
import utils from '../utils/utils';
import appConfig from '../config/app-config';
import sharedService from '../models/shared/shared-service';

export default (function () {
    var _printWindow = function (domWindow) {
        domWindow.document.close();  // necessary for IE >= 10
        domWindow.focus();           // necessary for IE >= 10
        domWindow.print();           // change window to winPrint
        domWindow.close();

        return domWindow;
    };

    var exportToPrint = function (column, data, title, headerContent, summaryContent) {
        var report = _generateReport(column, data, title, headerContent, summaryContent);
        var domWindow = window.open('', '', 'height=400,width=800');
        var body = report.body;
        var isChrome = Boolean(domWindow.chrome);

        domWindow.document.write(body.outerHTML);

        if (isChrome) {
            Ember.run.later(function () { // wait until all resources loaded
                _printWindow(domWindow);
            }, 350);
        } else {
            _printWindow(domWindow);
        }

        return true;
    };

    // TODO : [Champaka] Enable after PDF finalized.
    // var exportToPdf = function (column, data, wname, headerContent) {
    //    var report = _generateReport(column, data, wname, headerContent);
    //    var table = report.table;
    //    var header = document.createElement('table');
    //
    //    header.innerHTML = headerContent;
    //
    //    var doc = new jsPDF('l', 'pt', 'a4');
    //    var img = appConfig.customisation.logoBase64;
    //
    //    doc.addImage(img, 'PNG', 40, 40);
    //    doc.setFontSize(17);
    //    doc.text(wname, 40, 100);
    //
    //    var htable = doc.autoTableHtmlToJson(header);
    //    var btable = doc.autoTableHtmlToJson(table);
    //
    //    doc.autoTable(htable.columns, htable.data, {
    //        theme: 'plain',
    //        headerStyles: {fontStyle: 'normal'},
    //        margin: {top: 110}
    //    });
    //
    //    doc.autoTable(btable.columns, btable.data, {
    //        headerStyles: {fillColor: [225, 225, 225], textColor: [40, 40, 40]},
    //        margin: {top: 220}
    //    });
    //
    //    doc.save(wname + '.pdf');
    // };

    var exportToExcel = function (column, data, wname, headerContent, summaryContent) {
        var report = _generateReport(column, data, wname, headerContent, summaryContent);
        var body = report.body;

        var excelDataStr = '<html xmlns:x="urn:schemas-microsoft-com:office:excel">';
        excelDataStr = excelDataStr + '<head><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>';
        excelDataStr = excelDataStr + '<x:Name>Sheet</x:Name>';
        excelDataStr = excelDataStr + '<x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions></x:ExcelWorksheet>';
        excelDataStr = excelDataStr + '</x:ExcelWorksheets></x:ExcelWorkbook></xml></head><body>';
        excelDataStr = excelDataStr + body.outerHTML;
        excelDataStr = excelDataStr + '</html>';

        var ua = window.navigator.userAgent;
        var msie = ua.indexOf('MSIE');
        var filename = wname + '.xls';

        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
            if (window.navigator.msSaveBlob) {
                var blob = new Blob([excelDataStr], {
                    type: 'application/csv;charset=utf-8;'
                });

                navigator.msSaveBlob(blob, filename);
            }
        } else {
            var blob2 = new Blob([excelDataStr], {
                type: 'data:application/vnd.ms-excel'
            });

            var elem = window.document.createElement('a');

            elem.href = window.URL.createObjectURL(blob2);
            elem.download = filename;
            document.body.appendChild(elem);
            elem.click();
            document.body.removeChild(elem);
        }
    };

    var _generateReport = function (column, data, wname, headerContent, summaryContent) {
        var app = languageDataStore.getLanguageObj();
        var body = document.createElement('body');
        var header = document.createElement('div');
        var h3 = document.createElement('h3');
        var title = document.createTextNode(wname);
        var img = document.createElement('img');
        var headerTable = document.createElement('table');
        var table = document.createElement('table');
        var linebreak1 = document.createElement('br');
        var linebreak2 = document.createElement('br');

        img.src = img.baseURI + appConfig.customisation.logo;
        img.width = 154;
        img.height = 51;

        headerTable.innerHTML = headerContent;

        h3.appendChild(title);

        header.appendChild(h3);
        header.appendChild(headerTable);
        header.appendChild(linebreak1);

        if (utils.validators.isAvailable(summaryContent)) {
            var summaryTable = document.createElement('table');

            summaryTable.innerHTML = summaryContent;
            header.appendChild(summaryTable);
        }

        body.setAttribute('style', 'font-family: "Open Sans", sans-serif');
        body.appendChild(img);
        body.appendChild(header);
        body.appendChild(linebreak2);

        table.setAttribute('style', 'font-size: 12px;');

        // Add the header row.
        var row = table.insertRow(-1);

        for (var a = 0; a < column.length; a++) {
            var headerCell = document.createElement('th');
            headerCell.innerHTML = app.lang.labels[column[a].headerName] ? app.lang.labels[column[a].headerName] : column[a].headerName;

            row.appendChild(headerCell);
        }

        // Add the data rows.
        for (var i = 0; i < data.length; i++) {
            var dataElem = data[i];
            row = table.insertRow(-1);

            for (var j = 0; j < column.length; j++) {
                var cell = row.insertCell(-1);
                var columnElem = column[j].id;
                var dataType = column[j].dataType;
                var valueStyle = column[j].firstValueStyle;

                if(dataElem) {
                    cell = _setFormatters(cell, dataType, dataElem, columnElem, valueStyle);
                }

                if (columnElem === 'des') {
                    cell = _setHoldingDes(cell, dataElem, columnElem);
                }
            }
        }

        body.appendChild(table);

        return {
            body: body,
            header: header,
            table: table
        };
    };

    var _setFormatters = function (cell, dataType, dataElem, columnElem, valueStyle) {
        var rowData = dataElem.get(columnElem);

        if (valueStyle && valueStyle.indexOf('bold') > -1) {
            cell.style.fontWeight = 'bold';
        }

        if (dataType === 'date') {
            cell.innerHTML = utils.formatters.formatToDate(rowData);
        } else if (dataType === 'int') {
            cell.innerHTML = utils.formatters.formatNumber(rowData, 0);
            cell.setAttribute('style', 'text-align: right');
        } else if (dataType === 'float') {
            cell.innerHTML = utils.formatters.formatNumber(rowData, 2);
            cell.setAttribute('style', 'text-align: right');
        } else if (!utils.validators.isAvailable(rowData)) {
            cell.innerHTML = sharedService.userSettings.displayFormat.noValue;
        } else {
            cell.innerHTML = rowData;
        }

        return cell;
    };

    var _setHoldingDes = function (cell, dataElem, columnElem) {
        var currentValue = utils.formatters.convertUnicodeToNativeString(dataElem.get(columnElem));
        cell.innerHTML = languageDataStore.generateLangMessage(currentValue);

        return cell;
    };

    return {
        exportToPrint: exportToPrint,
        // exportToPdf: exportToPdf,
        exportToExcel: exportToExcel
    };
})();