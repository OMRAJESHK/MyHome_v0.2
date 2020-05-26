$(document).ready(() => {
    $("#btn_T_Dashboard").click(() => {
        $('#dashboardAngle').hasClass('angleRotate180') ?
            $('#dashboardAngle').removeClass('angleRotate180')
            : $('#dashboardAngle').addClass('angleRotate180')
    });

    $("#btnAllTransactions").click(() => {
        var url = window.rootpath + "Tenent/_allTransactions";
        $.get(url, function (response) {
            $('#RenderContent').html(response);
        });
    });
});