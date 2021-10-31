let remindersList = [];
let reminderIsEdit = false;
let reminderselectedID = '';
let ReminderTypesList = convertObjectArray(ReminderTypes);
const gotoSetReminder = () => {
    var url = window.rootpath + TenantURLs.SetReminder;
    $.get(url, function (response) {
        RenderContent.html(response);
        customizeUI();  
        generateOptions(ReminderTypesList, "ddlReminderType");
        getReminderData();
    });
}

const getReminderData = async () => {
    try {
        let RoleId = Number(sessionStorage.getItem('RoleID'));
        let getRequestsData = await GetAjax(ApiDictionary.GetRemindersByRole() + `?RoleId=${RoleId}`);
        remindersList = getRequestsData;
        RenderContent.find('#tblSetReminder').DataTable({
            "bLengthChange": false,
            "bFilter": true,
            "bInfo": true,
            "bPaginate": true,
            "bAutoWidth": false,
            "bDestroy": true,
            "bSort": true,
            data: remindersList,
            columns: [
                {
                    data: 'Type',
                    render: function (data) { return '<div>' + ReminderTypesList.filter(x => x.value == data)[0].name + '</div>'; }
                },
                { data: 'Description', },
                { data: 'SetReminder', render: function (data) { return `<div>${data} </div>` } },
                {
                    data: 'ReminderId', render: function (data) {
                        return `<div class="d-flex justify-content-center">
                                <button title="Edit" class="btn"><i class="fas fa-edit fontSize_20 text-info" onclick="SetReminderEdit(${data})"></i></button>
                                <button title="Delete" class="btn"><i class="fas fa-trash-alt fontSize_20 text-danger" onclick="SetReminderDeleteModal(${data})"></i></button></div>`;
                    }
                },
            ],
        });
    } catch (err) {
        console.log("getReminderData",err)
        CustomeToast("", "No Tenant Available", "bg-danger");
    }

}

// SAVE Reminder
function saveReminderDetails() {
    let description = RenderContent.find("#txtDescription").val();
    let setdate = RenderContent.find("#txtSetTime").val();
    let assetID = Number(sessionStorage.getItem('AssetID'));
    let type = Number(RenderContent.find("#ddlReminderType").val());
    let RoleId = Number(sessionStorage.getItem('RoleID'));

    let setReminderToSave = JSON.stringify({
        AssetName: assetID,
        Description: description,
        SetReminder: setdate,
        CreatedDate: getCurrentDate(),
        RoleId: RoleId,
        Type: type
    });

    reminderIsEdit ?
        ManageAjaxCalls.Put(ApiDictionary.PutReminders() + '?id=' + reminderselectedID, setReminderToSave, (res) => {
            console.log('modified', res);
            getReminderData();
        }) :
        (async function () {
            let postRemindersData = await PostAjax(ApiDictionary.PostReminders(), setReminderToSave);
            console.log('res', postRemindersData);
            getReminderData();
        }());
    reminderIsEdit = false;
    reminderselectedID = '';
}

// EDIT Reminder 
function SetReminderEdit(id) {
    reminderIsEdit = true;
    reminderselectedID = id;
    let currentRow = remindersList.filter(x => x.ReminderId === id);
    RenderContent.find('#txtDescription').val(currentRow[0].Description);
    RenderContent.find('#txtSetTime').val(currentRow[0].SetReminder);
    RenderContent.find("#ddlReminderType").val(currentRow[0].Type).change();
    RenderContent.find('#txtTaxRemarks').val(currentRow[0].Remarks);
}

// DELETE Reminder Modal
function SetReminderDeleteModal(id) {

    let deleteButtons = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" onclick="SetReminderDelete(${id})">Delete</button>`;
    $('#deleteModal .modal-title').text("Set Reminder")
    $('#deleteModal .modal-footer').html(deleteButtons);
    $('#deleteModal').modal('show');
   
}

// DELETE Reminder
async function SetReminderDelete(id) {
    let deleteRemindersData = await DeleteAjax(ApiDictionary.DeleteReminders() + `?AssetName=${Number(id)}`);
    console.log('Deleted Successfully', deleteRemindersData);
    CustomeToast("SetReminder Delete", "Deleted Successfully", "bg-info");
    getReminderData();
    $('#deleteModal').modal('hide');
}