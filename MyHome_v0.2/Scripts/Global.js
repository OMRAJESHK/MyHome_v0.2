$(document).ready(() => {
    $(".btnTenentDetails").click(() => {
        $('.dashboardAngle').hasClass('angleRotate180') ?
            $('.dashboardAngle').removeClass('angleRotate180')
            : $('.dashboardAngle').addClass('angleRotate180')
    });

    $(".btnAllTransactions").click(() => {
        var url = window.rootpath + "Tenent/_allTransactions";
        $.get(url, function (response) {
            $('#RenderContent').html(response);
        });
    });
    $(".btn_T_Dashboad").click(() => {
        var url = window.rootpath + "Tenent/_tenentDashboard";
        $.get(url, function (response) {
            $('#RenderContent').html(response);
        });
    });
    $(".btnRentAgreement").click(() => {
        var url = window.rootpath + "Tenent/_tenentDetails";
        $.get(url, function (response) {
            $('#RenderContent').html(response);
        });
    });
    $(".btnDocuments").click(() => {
        var url = window.rootpath + "Tenent/_TenentDocuments";
        $.get(url, function (response) {
            $('#RenderContent').html(response);
        });
    });
    $(".btnHouseDetails").click(() => {
        var url = window.rootpath + "Tenent/_houseDetails";
        $.get(url, function (response) {
            $('#RenderContent').html(response);
        });
    });
    $(".btnEmcyContact").click(() => {
        var url = window.rootpath + "Tenent/_emrcyContact";
        $.get(url, function (response) {
            $('#RenderContent').html(response);
        });
    });
    $(".btnProximity").click(() => {
        var url = window.rootpath + "Tenent/_proximity";
        $.get(url, function (response) {
            $('#RenderContent').html(response);
        });
    });
    $(".btnRaiseReq").click(() => {
        var url = window.rootpath + "Tenent/_raiseRequest";
        $.get(url, function (response) {
            $('#RenderContent').html(response);
        });
    });
    
});