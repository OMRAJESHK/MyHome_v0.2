var NotificationRes = '';
$(document).ready(() => {
        if(isAdmin() == false) getNotifications();
    $('#btnAllNotifn').prop('disabled', true);

    async function getNotifications() {
        let NotificationRes = await GetAjax(ApiDictionary.GetNotification() + `?AssetName=${sessionStorage.getItem('AssetID')}`);
        let NotificationList = '';
        $('#btnAllNotifn').prop('disabled', false);
        let list = convertObjectArray(NotificationTypes);
        NotificationRes.map(row => {
            if (row.Status == 0) {
                let date = dateFormat(getDateOnly(row.NotificationDate));
                NotificationList += `
                    <div class="notifi__item">
                        <div class="bg-c3 img-cir img-40">
                            <label class="notifnLetter">${NotificationLetter[row.NotificationType]}</label>
                        </div>
                        <div class="content">
                             <p>${list[row.NotificationType].name}</p><span class="date">${date}</span>
                        </div>
                    </div>`
            }
        });
        let notiNum = isAdmin() ?
            NotificationRes.filter(x => x.Status === 0).length :
            NotificationRes.filter(x => x.Status === 1).length;
        $('#listNotifications').html(NotificationList);
        $('#NotiCount').text(`You have ${notiNum} Notifications`);
        notiNum != 0 ? $('#Notiquantity').text(notiNum).removeClass('d-none') : $('#Notiquantity').addClass('d-none');
    }
});

async function getAllNotification() {
    var url = window.rootpath + TenantURLs.AllNotification;
    let notiData = await GetAjax(ApiDictionary.GetNotification() + `?AssetName=${sessionStorage.getItem('AssetID')}`);
    $.get(url, function (response) {
        RenderContent.html(response);
        $('#notificationsTab').removeClass('show-dropdown');
        isAdmin() ?
            mainContent.find('#btnAddNotifications').show() :
            mainContent.find('#btnAddNotifications').hide();
        let NotifnArray = convertObjectArray(NotificationTypes);
        let thead = isAdmin() ? ` <tr><th>Notification Type</th><th>Date</th><th>Description</th><th>Action</th></tr>`
                              : ` <tr><th>Notification Type</th><th>Date</th><th>Description</th></tr>`;
        $('#tblNotification thead').html(thead);
        $('#tblNotification tbody').empty();
        let rowItem = '';
        $.each(notiData, function (key, row) {
            let date = dateFormat(getDateOnly(row.NotificationDate));
            rowItem +=
                isAdmin() ?
                        `<tr>
                            <td>${NotifnArray.filter((x) => x.value == row.NotificationType)[0].name}</td>
                            <td>${date}</td>
                            <td>${row.Description}</td>
                            <td>
                                <div class="text-center">
                                    <button title="Delete" class="btn">
                                         <i class="fas fa-trash-alt fontSize_20 text-danger" onclick="SetNotificationDeleteModal(${row.NotificationId})"></i>
                                    </button>
                                <div>
                            </td>
                        </tr>`: `<tr>
                            <td>${NotifnArray.filter((x) => x.value == row.NotificationType)[0].name}</td>
                            <td>${date}</td>
                            <td>${row.Description}</td>
                        </tr>`
        });
        $('#RenderContent #tblNotification tbody').html(rowItem);
        rowItem = ``;
        $('#RenderContent #tblNotification').DataTable({
            "bLengthChange": false,"bFilter": true,"bInfo": true,
            "bPaginate": true,"bAutoWidth": false,'bDestroy': true,"bSort": true,
            language: { search: `` },
        }); 
    });
}

// Delete Notification
async function deleteNotification(id) {
    let deleteDocumentData = await DeleteAjax(ApiDictionary.DeleteMailLogs() + `?id=${Number(id)}`);
    console.log(deleteDocumentData);
    getNotifications();
    getAllNotification();
    CustomeToast("Notification", "Deleted Successfully", "bg-danger");
}

// DELETE Confirmation Modal
function SetNotificationDeleteModal(id) {
    let deleteButtons = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal" onclick="deleteNotification(${id})">Delete</button>`;
    $('#deleteModal .modal-title').text("Set Reminder")
    $('#deleteModal .modal-footer').html(deleteButtons);
    $('#deleteModal').modal('show');
}

async function saveNotifcation() {
    let notiToSave = JSON.stringify({
        AssetName: sessionStorage.getItem('AssetID'),
        NotificationType: $("#ddlNotifications option:selected").attr('value'),
        Description: $('#txtNotiDesc').val(),
        NotificationDate: getCurrentDate(),
        Status:0
    });
    let postNotificationData = await PostAjax(ApiDictionary.PostNotification(), notiToSave,);
    console.log('Notification Added', postNotificationData);
    CustomeToast("Notification", "Saved Successfully", "bg-success")
    
}
