$(document).ready(() => {
    const RenderContent = $('#RenderContent');
    const mainContent = $('.main-content');
    $('.UserName').text(sessionStorage.getItem('UserName'));
    $('.UserMail').text(sessionStorage.getItem('UserMail'));
    if (sessionStorage.getItem('accessToken') == null) {
        window.location.href = window.rootpath + ApiDictionary.gotoLogin();
    }
    if (sessionStorage.getItem('RoleID') == 0) {
        $('.AdminMenu').hide();
        $('.ClientMenu').show();
        var url = window.rootpath + TenantURLs.Dashboard;
        $.get(url, function (response) {
            RenderContent.html(response);
            customizeUI();
            createGraph();
        });
    } else {
        $('.ClientMenu').hide();
        $('.AdminMenu').show();
        var url = window.rootpath + "Admin/_AdminDashboard";
        $.get(url, function (response) {
            RenderContent.html(response);
            customizeUI();
            callAssetModal();
        });
        mainContent.find('#btnAddNotifications').show();
    }
    //------TENANT BUTTONS-----------//
    $(".btnTenentDetails").click(() => {
        $('.dashboardAngle').hasClass('angleRotate180') ?
            $('.dashboardAngle').removeClass('angleRotate180')
            : $('.dashboardAngle').addClass('angleRotate180')
    });

    $(".btn_T_Dashboad").click(() => {
        var url = window.rootpath + TenantURLs.Dashboard;
        $.get(url, function (response) {
            $('#RenderContent').html(response);
            customizeUI();
            createGraph();
        });
    });
    $(".btnRentAgreement").click(() => {
        var url = window.rootpath + "Tenent/_tenentDetails";
        $.get(url, function (response) {
            customizeUI();
            RenderContent.html(response);
        });
    });
    $(".btnDocuments").click(() => {
        var url = window.rootpath + "Tenent/_TenentDocuments";
        $.get(url, function (response) {
            customizeUI();
            RenderContent.html(response);
        });
    });
    $(".btnHouseDetails").click(() => {
        var url = window.rootpath + "Tenent/_houseDetails";
        $.get(url, function (response) {
            RenderContent.html(response);
            customizeUI();
            getHouseDetails();
        });
    });
    $(".btnProximity , .btn_A_Proximity").click(() => {
        var url = window.rootpath + "Tenent/_proximity";
        $.get(url, function (response) {
            RenderContent.html(response);
            (sessionStorage.getItem('RoleID') == '0') ?
                mainContent.find('#btnAddProximities').hide() :
                mainContent.find('#btnAddProximities').show();
                customizeUI();
                getProximities(Number(sessionStorage.getItem('AssetID')));
        });
    });
    

    //$(".btn_A_Notifications,#btn_AllNotifications").click(() => {
    //    var url = window.rootpath + "Tenent/_AllNotification";
    //    $.get(url, function (response) {
    //        RenderContent.html(response);
    //        $('#notificationsTab').removeClass('show-dropdown');
    //        (sessionStorage.getItem('RoleID') == 0) ?
    //            mainContent.find('#btnAddNotifications').hide() :
    //            mainContent.find('#btnAddNotifications').show();
    //    });
    //});
        //------ADMIN BUTTONS-----------//

    $(".btn_A_Dashboad").click(() => {
        var url = window.rootpath + AdminURLs.Dashboard;
        $.get(url, function (response) {
            customizeUI();
            RenderContent.html(response);
        });
    });
    $(".btnAssetRegistration").click(() => {
        callAssetModal();
        
    });
    $(".btnTenantAgreement").click(() => {
        var url = window.rootpath + TenantURLs.TenantDeedView;
        $.get(url, function (response) {
            (sessionStorage.getItem('RoleID') == '0') ?
                mainContent.find('#btnEditAgreement').hide() :
                mainContent.find('#btnEditAgreement').show();
            RenderContent.html(response);
            getTenantAgreementLogs();
            customizeUI();
        });
    });

    mainContent.find('#btnAddProximities').on('click', '#btnAddProximity', () => {
        var url = window.rootpath + "Admin/_SaveTransactions";
        $.get(url, function (response) {
            customizeUI();
            RenderContent.html(response);
        });
    });
    $(".btn_A_SendMail").click(() => {
        var url = window.rootpath + AdminURLs.MailLogs;
        $.get(url, function (response) {
            RenderContent.html(response);
            customizeUI();
            getMailLogs();
        });
    });

    $(".btnPropertyTax").click(() => {
        var url = window.rootpath + AdminURLs.propertyTaxLogs;
        $.get(url, function (response) {
            RenderContent.html(response);
            customizeUI();
            getPropertyTaxLogs();
        });
    });
        //------COMMON BUTTONS----------//

    $(".btn_A_AllTransactions, .btnAllTransactions").click(() => {
        var url = window.rootpath + TenantURLs.Transactions;
        $.get(url, function (response) {
            RenderContent.html(response);
            (sessionStorage.getItem('RoleID') == '0') ?
                mainContent.find('#btnAddTransactions').hide() :
                mainContent.find('#btnAddTransactions').show();
            RenderContent.find("#trnFrom , #trnTo").datepicker({ dateFormat: 'dd/mm/yy', changeMonth: true, changeYear: true }).datepicker('setDate', new Date());
            RenderContent.find('#ddlTransactionType').append(getTransactionList()).prop('selectedIndex', 0);
            customizeUI();
            transactionCall();
        });
    });
    $(".btnEmcyContact").click(() => {
        var url = window.rootpath + "Tenent/_emrcyContact";
        $.get(url, function (response) {
            RenderContent.html(response);
            
        });
    });
    $('#btnLogOut').click(() => {
        sessionStorage.removeItem('accessToken'); 
        sessionStorage.getItem('RoleID') == 0?
            window.location.href = window.rootpath + ApiDictionary.gotoLogin() :
            window.location.href = window.rootpath + ApiDictionary.gotoAdminLogin()
    });

    $(".btnRaiseReq").click(() => {
        getRaiseReqHTML();
    });

    $('#chktoggleSwitch').click(() => {
        customizeUI();
    });

    $('span.logoFill').on('click', function() {
        let colorChosen = '#' + $(this).data().color;
        $('.menu-sidebar__content, .navbar-mobile__list').css('background-color', colorChosen).removeClass('global-bg-primary')
    })
});
function CustomeToast(txthead, txtbody, cls) {
    $("#toastHeader").text(txthead);
    $("#toastBody").text(txtbody);
    $('#tstNotifyUser').toast('show').addClass(cls);
    setTimeout(function () { $('#tstNotifyUser').removeClass(cls); }, 5000)
}