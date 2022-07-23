$(document).ready(() => {
    const RenderContent = $('#RenderContent');
    const mainContent = $('.main-content');
    $('.UserName').text(sessionStorage.getItem('UserName'));
    $('.UserMail').text(sessionStorage.getItem('UserMail'));
    if (sessionStorage.getItem('accessToken') == null) {
        window.location.href = window.rootpath + ApiDictionary.gotoLogin();
    }

    if (!isAdmin()) {
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
    } else if (isAdmin()) {
        $('.ClientMenu').hide();
        $('.AdminMenu').show();
        $("#Notiquantity").css("display", "none");
        setScreenLoader(true);
        getAssetsList();
        customizeUI();
        mainContent.find('#btnAddNotifications').show();
        $('#viewReminders').removeAttr('hidden');
        //saveRentTransactionMonthly();
    }
    getProfilePicture();

    //------TENANT BUTTONS-----------//
    $(".btnTenentDetails").click(() => {
        $('.dashboardAngle').hasClass('angleRotate180') ?
            $('.dashboardAngle').removeClass('angleRotate180')
            : $('.dashboardAngle').addClass('angleRotate180')
    });

    $(".btn_T_Dashboad").click(() => { gotoDashboard(); });
    $(".btnRentAgreement").click(() => { gotoTenantDetails(); });
    $(".btnHouseDetails").click(() => { gotoHouseDetails(); });
    $(".btnProximity , .btn_A_Proximity").click(() => { gotoProximityView(); });


    //------ADMIN BUTTONS-----------//
    $(".btn_A_Dashboad").click(() => { gotoAdminDashboard(); });
    $(".btnAssetRegistration").click(() => { gotoAssetView(); });
    $(".btnTenantAgreement").click(() => { gotoTenantView(); });
    $(".btn_A_SendMail").click(() => { gotoMailLogsView(); });
    $(".btnPropertyTax").click(() => { gotoPropertyTax(); });


    //------COMMON BUTTONS----------//
    $(".btn_A_AllTransactions, .btnAllTransactions").click(() => { gotoTransactionView(); });
    $(".btnEmcyContact,.btn_A_EmcyContact").click(() => { gotoEmergencyContact(); });
    $(".btnRaiseReq").click(() => { getRaiseReqHTML(); });
    $('#chktoggleSwitch').click(() => { customizeUI(); });

   
    $("#div_setReminder").on("click", () => { gotoSetReminder(); });
    $(".btnDocument").on("click", () => { gotoDucumentView() });
    $('span.logoFill').on('click', function () {
        let colorChosen = '#' + $(this).data().color;
        $('.menu-sidebar__content, .navbar-mobile__list').css('background-color', colorChosen).removeClass('global-bg-primary')
    });
});

// code for Fullscreen toggling
$("#fullscreen").click(() => { toggleFullScreen(); });


//------ADMIN FUNCTION DECLARATION-----------//

//------TENANT FUNCTION DECLARATION-----------//

const gotoDashboard = () => {
    var url = window.rootpath + TenantURLs.Dashboard;
    $.get(url, function (response) {
        RenderContent.html(response);
        customizeUI();
        setScreenLoader(true);
        getDashboardData();
    });
}

function gotoTenantDetails() {
    var url = window.rootpath + TenantURLs.TenentDetails
    $.get(url, function (response) {
        customizeUI();
        RenderContent.html(response);
        getRentalData();
    });
}

function gotoHouseDetails() {
    var url = window.rootpath + TenantURLs.HouseDetails;
    $.get(url, function (response) {
        RenderContent.html(response);
        customizeUI();
        getHouseDetails();
    });
}
//------END OF TENANT FUNCTION DECLARATION-----------//

//------COMMON FUNCTION DECLARATION-----------//

const gotoTransactionView = () => {
    var url = window.rootpath + TenantURLs.Transactions;
    $.get(url, function (response) {
        RenderContent.html(response);
        isAdmin() ?
            mainContent.find('#btnAddTransactions').show() :
            mainContent.find('#btnAddTransactions').hide();
        RenderContent.find("#trnFrom , #trnTo").datepicker({ dateFormat: 'dd/mm/yy', changeMonth: true, changeYear: true }).datepicker('setDate', new Date());
        RenderContent.find('#ddlTransactionType').append(getTransactionList()).prop('selectedIndex', 0);
        $("#RenderContent .betweenDatesSection").css("display", "none");
        customizeUI();
        setScreenLoader(true)
        isAdmin() ? AlltransactionsGet() : transactionCall();
    });
}

function gotoEmergencyContact() {
    var url = window.rootpath + TenantURLs.EmrcyContact;
    $.get(url, function (response) {
        RenderContent.html(response);
        isAdmin() ? getEmergencyContacts() : getEmergencyContactList();
    });
} 



function getRaiseReqHTML() {
    var url = window.rootpath + "Tenent/_raiseRequest";
    $('#ReqQuantity').hide();
    $.get(url, function (response) {
        RenderContent.html(response);
        customizeUI();
        RequestCall();
    });
}

//------END OF COMMON FUNCTION DECLARATION-----------//
async function handleLogOut() {
    sessionStorage.clear();
    console.log("Losdsdsut", ApiDictionary.gotoLogout);
    ManageAjaxCalls.Post(ApiDictionary.gotoLogout, {}, () => {
        console.log("Logged Out ")
    })
   // let logoutData = await PostAjax("Account/Logout", {});
   //console.log("Logged Out", logoutData);
    window.location.href = window.rootpath
    console.log("Logged Out");
}



function gotoProximityView() {
    var url = window.rootpath + TenantURLs.Proximity;
    $.get(url, function (response) {
        RenderContent.html(response);
        customizeUI();
        setScreenLoader(true)
        getProximities();
    });
}

function gotoChnagePassword() {
    var url = window.rootpath + UserAccountURLs.ChangePassword;
    $.get(url, function (response) {
        RenderContent.html(response);
    });
}

function gotoDucumentView() {
    var url = window.rootpath + UserAccountURLs.DucumentView;
    $.get(url, function (response) {
        RenderContent.html(response);
        let btn = document.getElementById('btnAddDocument');

        if (isAdmin()) {
            btn.removeAttribute("hidden");
        }
        customizeUI();
        getDocuments();
    });
}

async function saveRentTransactionMonthly() {
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
    let logoutData = await PostAjax(ApiDictionary.PostTransaction(), TransactionToSave);
    console.log(logoutData)
    if (res.status == 201) {
        CustomeToast("Transaction", "Transaction Saved Successfully", "bg-success");
    } else if (logoutData.status == 405) {
        CustomeToast("Transaction", logoutData.responseJSON, "bg-danger");
    }
}

const gotoAdminDashboard = () => {
    var url = window.rootpath + AdminURLs.Dashboard;
    $.get(url, function (response) {
        customizeUI();
        RenderContent.html(response);
        getStatistics();
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

const getRentalData = () => {
    let assetId = sessionStorage.getItem("AssetID");
    $.when(
        GetAjax(ApiDictionary.GetTenentAgreementByID() + `?AssetName=${assetId}`),
        GetAjax(ApiDictionary.GetAssetById(), { AssetName: Number(sessionStorage.getItem('AssetID')) })).done(function (tenantData, AssetData) {
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
    let param = {
        OldPassword: oldPassword,
        NewPassword: NewPassword,
        ConfirmPassword: AffirmPassword,
    }
    $.when(PostAjax(ApiDictionary.ChangePassword(), param))
        .done(function (changeData) {
            if (changeData) {
                CustomeToast("Change Password", "Password Changed Successfully...!", "bg-success");
                $('#errMsgDiv').hide('fade');
            }
        });
    //$.ajax({
    //    url: ApiDictionary.ChangePassword(),
    //    method: 'post',
    //    data: {
    //        OldPassword: oldPassword,
    //        NewPassword: NewPassword,
    //        ConfirmPassword: AffirmPassword,
    //    },
    //    headers: {
    //        'Authorization': "Bearer " + sessionStorage.getItem('accessToken')
    //    },
    //    success: (data) => {
    //        CustomeToast("Change Password", "Password Changed Successfully...!", "bg-success");
    //        $('#errMsgDiv').hide('fade');
    //    },
    //    error: (jqXHR) => {
    //        $('#errTxt').text(jqXHR.responseText);
    //        $('#errMsgDiv').show('fade');
    //    }
    //});
}

function AdminDashboardFunction(assetId) {
    let currdate = Number(getCurrentDate().split("-")[2]);
    if (currdate <= 5) {
        $.when(GetAjax(ApiDictionary.GetTenentAgreementByID() + `?AssetName=${assetId}`))
            .done(async function (tenentData) {
                if (tenentData) {
                    console.log("Dashboard", tenentData);
                    // Transaction 
                    let TransactionToSave = JSON.stringify({
                        AssetName: assetId, Description: "Rent For the Month",
                        TransactionType: 102, Amount: tenentData.RentAmount,
                        CutOffDate: getCurrentDate(), Date: getCurrentDate(),
                        TransactionMode: 1, PaidBy: tenentData.ResidentsNames,
                        PaidTo: sessionStorage.getItem("UserName"),
                        Status: 2, Remarks: "Current Month Rent Pending.",
                    });
                    let postTransactionData = await PostAjax(ApiDictionary.PostTransaction(), TransactionToSave);
                    console.log(postTransactionData);
                    if (postTransactionData.status == 201) {
                        CustomeToast("Transaction", "Saved Successfully", "bg-success");
                    } else if (postTransactionData.status == 405) {
                        console.log(postTransactionData.responseJSONs);
                    }
                }
            });
    }
}


// USER ACCOUNT DETAILS CODE //

let picBase64 = "";
let Documentdata = [];
function getProPicSrc(input, imgContainer) {
    var filename = input.files[0].name;
    let fileSize = input.files[0].size; // in bytes
    let fileExtension = filename.split('.').pop();
    if (["png", "jpeg", "jpg"].includes(fileExtension)) {
        if (fileSize < 2000000) {
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
        } else {
            CustomeToast("Upload Profile Picture", "Image File Size is Too Big. Please select image with size less that 2 MB", "bg-danger");
        }
        
    } else {
        CustomeToast("Upload Profile Picture", "Please Select Image File", "bg-danger");
        document.getElementById("profileBrowse").value = "";
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
        $("#divHouseName").text(glodalSelectedAssetName);
        $('#UserMail').text(sessionStorage.getItem('UserMail'));
        $('#userName').text(sessionStorage.getItem('UserName'));
        $("#UserNumber").text(sessionStorage.getItem('UserNumber'));
        getProfilePicture();
    });
}

// Get Profile Picture
 function getProfilePicture() {
     isAdmin() ? (async function () {
        let profilePicData = await GetAjax(ApiDictionary.GetAdminProfilePicture());
        console.log("ProfilePicture", profilePicData);
        if (profilePicData.constructor === Object) {
            Documentdata = profilePicData;
            picBase64 = 'data:image/png|jpg;base64,' + profilePicData.ImgEncode;
            document.getElementById('proPicMini').setAttribute('src', picBase64);
            document.getElementById('proPicMain').setAttribute('src', picBase64);
            let profilePreview = document.getElementById('profilePreview');
            profilePreview && profilePreview.setAttribute('src', picBase64);
        }
     }()) : (async function () {
             let profilePicData = await GetAjax(ApiDictionary.GetProfilePicture() + `?AssetName=${sessionStorage.getItem("AssetID")}`);
             console.log("ProfilePicture", profilePicData);
             if (profilePicData.constructor === Object) {
                 console.log("ProfilePicture", profilePicData);
                 Documentdata = profilePicData;
                 picBase64 = 'data:image/png|jpg;base64,' + profilePicData.ImgEncode;
                 document.getElementById('proPicMini').setAttribute('src', picBase64);
                 document.getElementById('proPicMain').setAttribute('src', picBase64);
             }
     }())
}
function SaveProfilePicture() {
    let DocumentToSave = JSON.stringify({
        ImgTitle: 1,
        ImgEncode: picBase64,
        ImgDescription: "User Profile Picture",
        ImgDate: getCurrentDate(),
        AssetName: sessionStorage.getItem("AssetID") === null ? 0 : sessionStorage.getItem("AssetID"),
        isAdmin: isAdmin() ? 1 : 0             // 0 - Tenant , 1 - Admin
    });
    console.log("Documentdata", Documentdata)
    Documentdata.length == 0 ? (async function () {
        let postDocumentData = await PostAjax(ApiDictionary.PostDocument(), DocumentToSave);
        console.log(postDocumentData)
        document.getElementById('proPicMini').setAttribute('src', 'data:image/png|jpg;base64,' + picBase64);
        document.getElementById('proPicMain').setAttribute('src', 'data:image/png|jpg;base64,' + picBase64);
        if (postDocumentData.status == 201) {
            CustomeToast("Profile Picture", 'Saved Successfully', "bg-success");
        } else if (postDocumentData.status == 405) {
            CustomeToast("Profile Picture", postDocumentData.responseJSON, "bg-danger");
        }
    }())
        : (async function () {
            let putDocumentData = await PutAjax(`${ApiDictionary.PutDocument()}?id=${Documentdata.ImgID}`, DocumentToSave);
            console.log(putDocumentData);
            document.getElementById('proPicMini').setAttribute('src', 'data:image/png|jpg;base64,' + picBase64);
            document.getElementById('proPicMain').setAttribute('src', 'data:image/png|jpg;base64,' + picBase64);
            if (putDocumentData.status == 200) {
                CustomeToast("Profile Picture", 'Profile Picture saved Successfully', "bg-success");
            } else if (putDocumentData.status == 405) {
                CustomeToast("Profile Picture", putDocumentData.responseJSON, "bg-danger");
            }
        }());
}





