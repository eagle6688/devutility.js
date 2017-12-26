﻿var page = {};

page.init = function () {
    page.register();
};

page.register = function () {
    for (var i in initViewModel.Data) {
        initViewModel.Data[i].NameID = ko.pureComputed(function () {
            return this.Name + " " + this.MyID;
        }, initViewModel.Data[i]);
    }

    $('#btn-loadKo').click(function () {
        $('#myKo').koHelper({
            url: '/data/list',
            viewModel: initViewModel,
            beforeLoadData: function (data) {
                for (var i in data.Data) {
                    data.Data[i].NameID = ko.pureComputed(function () {
                        return this.Name + " " + this.MyID;
                    }, data.Data[i]);
                }
            },
            paginationOptions: {
                isReturnedTop: false
            }
        });
    });

    $('#btn-loadKoWithData').click(function () {
        $('#myKo').koHelper({
            url: '/data/list',
            viewModel: initViewModel,
            beforeLoadData: function (data) {
                for (var i in data.Data) {
                    data.Data[i].NameID = ko.pureComputed(function () {
                        return this.Name + " " + this.MyID;
                    }, data.Data[i]);
                }
            },
            paginationOptions: {
                positionID: 'myKo'
            }
        });
    });

    $('#btn-reloadWithDifferentURL').click(function () {
        $('#myKo').data("koHelper").reload({ url: '/data/list?length=51' });
    });

    $('#btn-reloadWithDifferentURLAndPageIndex').click(function () {
        $('#myKo').data("koHelper").reload({
            url: '/data/list?length=51',
            pageIndex: 2
        });
    });

    $('#btn-reloadWithDifferentURLAndErrorPageIndex').click(function () {
        $('#myKo').data("koHelper").reload({
            url: '/data/list?length=51',
            pageIndex: 100
        });
    });

    $('#btn-getSelectedItems').click(function () {
        var array = $('#myKo').data("koHelper").getSelectedItems();
        console.log(array);
    });

    $('#btn-getRecordsCount').click(function () {
        alert($('#myKo').data("koHelper").getRecordsCount());
    });

    $('#btn-changeRequestType').click(function () {
        $('#myKo').data("koHelper").reload({
            url: '/data/list?length=51',
            type: 'POST',
            data: { test: 22 }
        });
    });
};

page.init();