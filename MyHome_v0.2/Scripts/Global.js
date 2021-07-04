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
            $("#lblAssetNamehdr").text(sessionStorage.getItem('AssetName'));
            customizeUI();
            //createGraph();
            CustomeToast("Welcome Back", sessionStorage.getItem('UserName'), "bg-info");
        });
    } else if (sessionStorage.getItem('RoleID') == 1) {
        $('.ClientMenu').hide();
        $('.AdminMenu').show();
        //var url = window.rootpath + AdminURLs.AssetslistView;
        //$.get(url, function (response) {
        //    RenderContent.html(response);
        //    customizeUI();
        //    //callAssetModal();
        //});
        getAssetsList();
        customizeUI();
        mainContent.find('#btnAddNotifications').show();
    }

    //------TENANT BUTTONS-----------//
    $(".btnTenentDetails").click(() => {
        $('.dashboardAngle').hasClass('angleRotate180') ?
            $('.dashboardAngle').removeClass('angleRotate180')
            : $('.dashboardAngle').addClass('angleRotate180')
    });

    $(".btn_T_Dashboad").click(() => {
        gotoDashboard();
        
    });
    $(".btnRentAgreement").click(() => {
        var url = window.rootpath + "Tenent/_tenentDetails";
        $.get(url, function (response) {
            customizeUI();
            RenderContent.html(response);
            getRentalData();
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
            isAdmin() ? mainContent.find('#btnAddProximities').show() : mainContent.find('#btnAddProximities').hide()
            customizeUI();
            getProximities();
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
        gotoAdminDashboard()
    });
    $(".btnAssetRegistration").click(() => {
        //callAssetModal(); 
        gotoAssetView();
    });
    $(".btnTenantAgreement").click(() => {
        gotoTenantView();
    });

    mainContent.find('#btnAddProximities').on('click', '#btnAddProximity', () => {
        var url = window.rootpath + "Admin/_SaveTransactions";
        $.get(url, function (response) {
            customizeUI();
            RenderContent.html(response);
        });
    });
    $(".btn_A_SendMail").click(() => {
        gotoMailLogsView()
    });

    $(".btnPropertyTax").click(() => {
        //var url = window.rootpath + AdminURLs.propertyTaxLogs;
        //$.get(url, function (response) {
        //    RenderContent.html(response);
        //    customizeUI();
        //    getPropertyTaxLogs();
        //});

        gotoPropertyTax();
    });
        //------COMMON BUTTONS----------//

    $(".btn_A_AllTransactions, .btnAllTransactions").click(() => {
        gotoTransactionView()
    });
    $(".btnEmcyContact,.btn_A_EmcyContact").click(() => {
        var url = window.rootpath + "Tenent/_emrcyContact";
        $.get(url, function (response) {
            RenderContent.html(response);
            isAdmin() ? getEmergencyContacts() : getEmergencyContactList() ;
        });
    });
    $('#btnLogOut').click(() => {
        sessionStorage.removeItem('accessToken'); 
        //sessionStorage.getItem('RoleID') == 0?
        //    window.location.href = window.rootpath + ApiDictionary.gotoLogin() :
        //    window.location.href = window.rootpath + ApiDictionary.gotoAdminLogin()

        window.location.href = window.rootpath + ApiDictionary.gotoLandingPage()
    });

    $(".btnRaiseReq").click(() => {
        getRaiseReqHTML();
    });

    $('#chktoggleSwitch').click(() => {
        customizeUI();
    });

    $('span.logoFill').on('click', function () {
        let colorChosen = '#' + $(this).data().color;
        $('.menu-sidebar__content, .navbar-mobile__list').css('background-color', colorChosen).removeClass('global-bg-primary')
    });

    $("#div_setReminder").on("click", () => {
        gotoSetReminder();
    });
});


$("#fullscreen").click(() => {
    toggleFullScreen();
});

const gotoAdminDashboard = () => {
    var url = window.rootpath + AdminURLs.Dashboard;
    $.get(url, function (response) {
        customizeUI();
        RenderContent.html(response);
        getStatistics();
    });
}

// Tenant Dashboard
const gotoDashboard = () => {
    var url = window.rootpath + TenantURLs.Dashboard;
    $.get(url, function (response) {
        $('#RenderContent').html(response);
        customizeUI();
        //createGraph();
    });
}
// Tenant a
const gotoMailLogsView = () => {
    var url = window.rootpath + AdminURLs.MailLogs;
    $.get(url, function (response) {
        RenderContent.html(response);
        customizeUI();
        getMailLogs();
    });
}
const gotoTenantView = () => {
    var url = window.rootpath + TenantURLs.TenantDeedView;
    $.get(url, function (response) {
        (sessionStorage.getItem('RoleID') == '0') ?
            mainContent.find('#btnEditAgreement').hide() :
            mainContent.find('#btnEditAgreement').show();
        RenderContent.html(response);
        getTenantAgreementLogs();
        customizeUI();
    });
}

const gotoTransactionView = () => {
    var url = window.rootpath + TenantURLs.Transactions;
    $.get(url, function (response) {
        RenderContent.html(response);
        isAdmin() ?
            mainContent.find('#btnAddTransactions').show():
            mainContent.find('#btnAddTransactions').hide();
        RenderContent.find("#trnFrom , #trnTo").datepicker({ dateFormat: 'dd/mm/yy', changeMonth: true, changeYear: true }).datepicker('setDate', new Date());
        RenderContent.find('#ddlTransactionType').append(getTransactionList()).prop('selectedIndex', 0);
        customizeUI();
        isAdmin() ?AlltransactionsGet():transactionCall();
    });
}


const getRentalData = () => {
    let assetId = sessionStorage.getItem("AssetID");
    $.when(
        GetAjax(ApiDictionary.GetTenentAgreementByID() + `?AssetName=${assetId}`),
        GetAjax(ApiDictionary.GetAssetName(), { AssetName: Number(sessionStorage.getItem('AssetID')) })).done(function (tenantData, AssetData) {
            console.log("resolve all", tenantData, AssetData);
            $("#tenants").text(tenantData[0]["ResidentsNames"]);
            let tenantsamt = `${tenantData[0]["RentAmount"]}/- (${inWords(tenantData[0]["RentAmount"])})`
            $(".rentamt").text(tenantsamt);
            $("#joiningDate").text(getDisplayDate(tenantData[0]["JoiningDate"]));
            $("#rentAddress").text(AssetData[0]["Address"])
        });
}
