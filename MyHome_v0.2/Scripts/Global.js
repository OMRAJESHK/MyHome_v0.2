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
            CustomeToast("Welcome Back", sessionStorage.getItem('UserName'), "bg-info");
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
        gotoDashboard()
    });
    $(".btnAssetRegistration").click(() => {
        callAssetModal(); 
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
    $(".btnEmcyContact").click(() => {
        var url = window.rootpath + "Tenent/_emrcyContact";
        $.get(url, function (response) {
            RenderContent.html(response);
            
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

    $('span.logoFill').on('click', function() {
        let colorChosen = '#' + $(this).data().color;
        $('.menu-sidebar__content, .navbar-mobile__list').css('background-color', colorChosen).removeClass('global-bg-primary')
    })
});

function CustomeToast(txthead, txtbody, cls) {
    let toastHTML = `<div class="fade border w-25 ${cls}" data-delay="2000" id="tstNotifyUser" style="position: absolute; top:8rem; right:20px;">
                        <div class="toast-header">
                            <strong class="mr-3" id="toastHeader">${txthead}</strong>
                        </div>
                        <div class="toast-body" id="toastBody">${txtbody}</div>
                    </div>`
    $("#forToast").html(toastHTML);
    $(document).find('#forToast #tstNotifyUser').toast('show');
    setTimeout(function () { $("#forToast").html(""); }, 5000)
}

$("#fullscreen").click(() => {
    toggleFullScreen(document.body)
})

function toggleFullScreen(elem) {
    // ## The below if statement seems to work better ## if ((document.fullScreenElement && document.fullScreenElement !== null) || (document.msfullscreenElement && document.msfullscreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
        if (elem.requestFullScreen) {
            elem.requestFullScreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullScreen) {
            elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

const gotoDashboard = () => {
    var url = window.rootpath + AdminURLs.Dashboard;
    $.get(url, function (response) {
        customizeUI();
        RenderContent.html(response);
    });
}
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
        (sessionStorage.getItem('RoleID') == '0') ?
            mainContent.find('#btnAddTransactions').hide() :
            mainContent.find('#btnAddTransactions').show();
        RenderContent.find("#trnFrom , #trnTo").datepicker({ dateFormat: 'dd/mm/yy', changeMonth: true, changeYear: true }).datepicker('setDate', new Date());
        RenderContent.find('#ddlTransactionType').append(getTransactionList()).prop('selectedIndex', 0);
        customizeUI();
        transactionCall();
    });
}