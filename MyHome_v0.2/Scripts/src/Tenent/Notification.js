var NotificationRes = '';
$(document).ready(() => {
    (sessionStorage.getItem('RoleID') == 0) ? getNotifications() : null;
    $('#btnAllNotifn').prop('disabled', true);
    function getNotifications() {
        ManageAjaxCalls.GetData(ApiDictionary.GetNotification() + `?AssetName=${sessionStorage.getItem('AssetID')}`, (res) => {
            let NotificationList = '';
            NotificationRes = res;
            $('#btnAllNotifn').prop('disabled', false);
            let list = convertObjectArray(NotificationTypes);
            res.map(row => {
                if (row.Status == 0) {
                    NotificationList += `
                    <div class="notifi__item">
                        <div class="bg-c3 img-cir img-40">
                            <label class="notifnLetter">${NotificationLetter[row.NotificationType]}</label>
                        </div>
                        <div class="content">
                             <p>${list[row.NotificationType].name}</p><span class="date">${row.NotificationDate}</span>
                        </div>
                    </div>`
                }
            });
            let notiNum = (sessionStorage.getItem('RoleID') == 0) ?
                NotificationRes.filter(x => x.Status === 1).length :
                NotificationRes.filter(x => x.Status === 0).length;
            $('#listNotifications').html(NotificationList);
            $('#NotiCount').text(`You have ${notiNum} Notifications`);
            notiNum != 0 ? $('#Notiquantity').text(notiNum).removeClass('d-none') : $('#Notiquantity').addClass('d-none');
            
        });
    }
});

function getAllNotification() {
    var url = window.rootpath + "Tenent/_AllNotification";
    $.get(url, function (response) {
        RenderContent.html(response);
        $('#notificationsTab').removeClass('show-dropdown');
        (sessionStorage.getItem('RoleID') == 0) ?
            mainContent.find('#btnAddNotifications').hide() :
            mainContent.find('#btnAddNotifications').show();
        let NotifnArray = convertObjectArray(NotificationTypes);
        $('#tblNotification tbody').empty();
        let rowItem = '';
        $.each(NotificationRes, function (key, row) {
            rowItem += `
                        <tr>
                            <td>
                                <div class="card mb-0" style="height: 108px;">
                                    <div class="card-body vertical-align-middle">
                                        <div class="h5 text-center">${NotificationLetter[row.NotificationType]}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="card mb-0">
                                    <div class="d-flex justify-content-between card-header bg-primary">
                                        <h5 class="text-light">${NotifnArray.filter((x) => x.value == row.NotificationType)[0].name}</h5>
                                        <h5 class="text-light">${row.NotificationDate}</h5>
                                    </div>
                                    <div class="d-flex justify-content-between card-header">
                                        <p>${row.Description} </p>
                                        <div><button class="btn btn-danger" onclick="deleteNotification(${row.NotificationId})">Delete</button></div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    `
        });
        $('#RenderContent #tblNotification tbody').html(rowItem);
    });
}

// Delete Notification
function deleteNotification(id) {
    ManageAjaxCalls.Delete(ApiDictionary.DeleteNotification() + `?id=${Number(id)}`, (res) => {
        console.log(res);
        getNotifications();
        getAllNotification();
    });
}
function saveNotifcation() {
    let notiToSave = JSON.stringify({
        AssetName: sessionStorage.getItem('AssetID'),
        NotificationType: $("#ddlNotifications option:selected").attr('value'),
        Description: $('#txtNotiDesc').val(),
        NotificationDate: getCurrentDate(),
        Status:0
    });
    let assetID = sessionStorage.getItem('AssetID');
    ManageAjaxCalls.Post(ApiDictionary.PostNotification(), notiToSave, () => {
        console.log('Notification Added')
    })        
}

function gotoSaveNotification() {
    let NotificationList = convertObjectArray(NotificationTypes);
    var url = window.rootpath + AdminURLs.SaveNotification;
    $.get(url, function (response) {
        RenderContent.html(response);
        let options = `<option value="0">--Select--</option>`;
        options += NotificationList.map(x => {
            return `<option value=${x.value}>${x.name}</option>`;
        });
        RenderContent.find('#ddlNotifications').html(options)
    });
}