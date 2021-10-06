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
        $(".menuCover").remove();
        var url = window.rootpath + TenantURLs.Dashboard;
        $.get(url, function (response) {
            RenderContent.html(response);
            $("#lblAssetNamehdr").text(sessionStorage.getItem('AssetName'));
            customizeUI();
            getDashboardData();
        });
    } else if (sessionStorage.getItem('RoleID') == 1) {
        $('.ClientMenu').hide();
        $('.AdminMenu').show();

        $("#Notiquantity").css("display", "none");
        getAssetsList();
        customizeUI();
        mainContent.find('#btnAddNotifications').show();
        //saveRentTransactionMonthly();
    }
    getProfilePicture();
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
            customizeUI();
            setScreenLoader(true)
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
        ManageAjaxCalls.Post(ApiDictionary.gotoLogout, {}, () => {
            console.log("Logged Out ")
        })
        window.location.href = window.rootpath 
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
    $(".btnDocument").on("click", () => {
        gotoDucumentView()
    });
    $(".btnDocument").on("click", () => {
        gotoAccountDetails()
    });
});


$("#fullscreen").click(() => {
    toggleFullScreen();
});

function gotoChnagePassword() {
    var url = window.rootpath + "UserAccount/ChangePassword";
    $.get(url, function (response) {
        RenderContent.html(response);
    });
}
function gotoDucumentView() {
    var url = window.rootpath + "UserAccount/DucumentView";
    $.get(url, function (response) {
        RenderContent.html(response);
        getDocuments();
    });
}

function saveRentTransactionMonthly() {
    let assetID = sessionStorage.getItem('AssetID');

    let TransactionToSave = JSON.stringify({
        AssetName: assetID,
        Description: "Rent For the Month",
        TransactionType: 2,
        Amount: $('#txtAmt').val(),
        Date: trnDate,
        TransactionMode: Number($('#ddlTranMode').val()),
        PaidBy: $('#txtpaidFrom').val(),
        PaidTo: $('#txtpaidTo').val(),
        Status: PaymentStatus,
        Remarks: $('#txtRemarks').val(),
    });
    ManageAjaxCalls.Post(ApiDictionary.PostTransaction(), TransactionToSave, (res) => {
        console.log(res)
        if (res.status == 201) {
            CustomeToast("Transaction", 'Saved Successfully', "bg-success");
        } else if (res.status == 405) {
            CustomeToast("Transaction", res.responseJSON, "bg-danger");
        }
    })
}

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
        getDashboardData();
    });
}
// Tenant a
const gotoMailLogsView = () => {
    var url = window.rootpath + AdminURLs.MailLogs;
    $.get(url, function (response) {
        RenderContent.html(response);
        customizeUI();
        setScreenLoader(true);
        getMailLogs();
    });
}
const gotoTenantView = () => {
    var url = window.rootpath + TenantURLs.TenantDeedView;
    $.get(url, function (response) {
        RenderContent.html(response);
        setScreenLoader(true);
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
        $("#RenderContent .betweenDatesSection").css("display", "none");
        customizeUI();
        isAdmin() ? AlltransactionsGet():transactionCall();
    });
}

const getRentalData = () => {
    let assetId = sessionStorage.getItem("AssetID");
    $.when(
        GetAjax(ApiDictionary.GetTenentAgreementByID() + `?AssetName=${assetId}`),
        GetAjax(ApiDictionary.GetAssetName(), { AssetName: Number(sessionStorage.getItem('AssetID')) })).done(function (tenantData, AssetData) {
            console.log("resolve all", tenantData, AssetData);
            $("#tenants").text(tenantData[0]["ResidentsNames"]);
            let tenantsamt = `${tenantData[0]["RentAmount"]}/- (${inWords(tenantData[0]["RentAmount"])})`;
            $(".rentamt").text(tenantsamt);
            $("#joiningDate").text(getDisplayDate(tenantData[0]["JoiningDate"]));
            $("#rentAddress").text(AssetData[0]["Address"]);
        });
}

function handleChangePassword() {
    let oldPassword = $("#RenderContent #txtOldPassword").val();
    let NewPassword = $("#RenderContent #txtNewPassword").val();
    let AffirmPassword = $("#RenderContent #txtAffirmPassword").val();

    $.ajax({
        url: '/api/Account/ChangePassword',
        method: 'post',
        data: {
            OldPassword: oldPassword,
            NewPassword: NewPassword,
            ConfirmPassword: AffirmPassword,
        },
        headers: {
            'Authorization': "Bearer " + sessionStorage.getItem('accessToken')
        },
        success: (data) => {
            CustomeToast("Change Password", "Password Changed Successfully...!", "bg-success");
            $('#errMsgDiv').hide('fade');
        },
        error: (jqXHR) => {
            $('#errTxt').text(jqXHR.responseText);
            $('#errMsgDiv').show('fade');
        }
    });
}

function AdminDashboardFunction(assetId) {
    let currdate = Number(getCurrentDate().split("-")[2]);
    if (currdate <= 5) {
        $.when(GetAjax(ApiDictionary.GetTenentAgreementByID() + `?AssetName=${assetId}`))
            .done(function (tenentData) {
                if (tenentData) {
                    console.log("Dashboard", tenentData);
                    // Transaction 
                    let TransactionToSave = JSON.stringify({
                        AssetName: assetId,
                        Description: "Rent For the Month",
                        TransactionType: 102,
                        Amount: tenentData.RentAmount,
                        CutOffDate: getCurrentDate(),
                        Date: getCurrentDate(),
                        TransactionMode: 1,
                        PaidBy: tenentData.ResidentsNames,
                        PaidTo: sessionStorage.getItem("UserName"),
                        Status: 2,
                        Remarks: "Current Month Rent Pending.",
                    });
                    ManageAjaxCalls.Post(ApiDictionary.PostTransaction(), TransactionToSave, (res) => {
                        console.log(res)
                        if (res.status == 201) {
                            CustomeToast("Transaction", 'Saved Successfully', "bg-success");
                        } else if (res.status == 405) {
                            console.log(res.responseJSONs);
                        }
                    })
                }
            });
    }

}


// ACCOUNT DETAILS CODE //

let picBase64 = "";
let Documentdata = [];
function getProPicSrc(input, imgContainer) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            console.log("endocestuff", e.target.result);
            $('#' + imgContainer).attr('src', e.target.result);
            picBase64 = e.target.result.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
        };
        reader.readAsDataURL(input.files[0]);
        $('#NoPreview_Text').text("");
        $('#' + imgContainer).show();
    }
}
function clearProfilePreview() {
    document.getElementById("profileBrowse").value = "";
    $('#profilePreview').attr('src', "").hide();
    $('#NoPreview_Text').text("No Preview");
}

function gotoAccountDetails() {
    var url = window.rootpath + "UserAccount/AccountDetails";
    $.get(url, function (response) {
        RenderContent.html(response);
        $("#divHouseName").text(sessionStorage.getItem("AssetName"));
        $('#UserMail').text(sessionStorage.getItem('UserMail'));
        $('#userName').text(sessionStorage.getItem('UserName'));
        $("#UserNumber").text(sessionStorage.getItem('UserNumber'));
        document.getElementById('profilePreview').setAttribute('src', picBase64);
        picBase64 = "";
    });
}

// Get Profile Picture
function getProfilePicture() {
    isAdmin() ? ManageAjaxCalls.GetData(ApiDictionary.GetAdminProfilePicture(), (res) => {
        console.log("ProfilePicture", res);
        if (res.constructor === Object) {
            Documentdata = res;
            picBase64 = 'data:image/png|jpg;base64,' + res.ImgEncode;
            document.getElementById('proPicMini').setAttribute('src', picBase64);
            document.getElementById('proPicMain').setAttribute('src', picBase64);
        }
    }):
    ManageAjaxCalls.GetData(ApiDictionary.GetProfilePicture() + `?AssetName=${sessionStorage.getItem("AssetID")}`, (res) => {
        console.log("ProfilePicture", res);
        Documentdata = res;
        picBase64 = 'data:image/png|jpg;base64,' + res.ImgEncode;
        document.getElementById('proPicMini').setAttribute('src', picBase64);
        document.getElementById('proPicMain').setAttribute('src', picBase64);
    });
}
function SaveProfilePicture() {
    let DocumentToSave = JSON.stringify({
        ImgTitle: 1,
        ImgEncode: picBase64,
        ImgDescription: "User Profile Picture",
        ImgDate: getCurrentDate(),
        AssetName: isAdmin() ? null : sessionStorage.getItem("AssetID"),
        isAdmin: isAdmin() ? 1 : 0             // 0 - Tenant , 1 - Admin
    });
    console.log("Documentdata", Documentdata)
    Documentdata.length == 0 ?
    ManageAjaxCalls.Post(ApiDictionary.PostDocument(), DocumentToSave, (res) => {
        console.log(res)
        document.getElementById('proPicMini').setAttribute('src', 'data:image/png|jpg;base64,' + picBase64);
        document.getElementById('proPicMain').setAttribute('src', 'data:image/png|jpg;base64,' + picBase64);
        if (res.status == 201) {
            CustomeToast("Profile Picture", 'Saved Successfully', "bg-success");
        } else if (res.status == 405) {
            CustomeToast("Profile Picture", res.responseJSON, "bg-danger");
        }
    }) : ManageAjaxCalls.Put(ApiDictionary.PutDocument() + "?id=" + Documentdata.ImgID, DocumentToSave, (res) => {
        console.log(res);
        document.getElementById('proPicMini').setAttribute('src', 'data:image/png|jpg;base64,' + picBase64);
        document.getElementById('proPicMain').setAttribute('src', 'data:image/png|jpg;base64,' + picBase64);
        if (res.status == 201) {
            CustomeToast("Profile Picture", 'Saved Successfully', "bg-success");
        } else if (res.status == 405) {
            CustomeToast("Profile Picture", res.responseJSON, "bg-danger");
        }
    })
}