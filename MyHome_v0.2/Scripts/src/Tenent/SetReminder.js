let remindersList = [];
let reminderIsEdit = false;
let reminderselectedID = '';
let ReminderTypesList = convertObjectArray(ReminderTypes);
let YearlyEvents = [];
let MonthlyEvents = [];
let WeeklyEvents = [];
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
        console.log("remindersList", remindersList);
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

// SAVE ReminderPostAjax
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
            console.log('Remindersres', postRemindersData);
            CustomeToast("Reminders", "Reminders Saved Successfully", "bg-success");
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
    CustomeToast("Reminders", "Deleted Successfully", "bg-info");
    getReminderData();
    $('#deleteModal').modal('hide');
}



/* UNDER PROGRESS FOR NEXT SUCCESSFUL VERSION */
//Calender Code

function getCalender() {
    function c() {
        p(); var e = h(); var r = 0; var u = false;
        l.empty();
        while (!u) {
            if (s[r] == e[0].weekday) { u = true }
            else { l.append('<div class="blank"></div>'); r++ }
        }
        for (var c = 0; c < 42 - r; c++) {
            if (c >= e.length) { l.append('<div class="blank"></div>') }
            else {
                var v = e[c].day; var m = g(new Date(t, n - 1, v)) ? '<div class="today">' : "<div id=" + v + ">";
                l.append(m + "" + v + "</div>")
            }
        }
        var y = o[n - 1];
        a.css("background-color", y).find("h1").text(i[n - 1] + " " + t);
        f.find("div").css("color", y);
        l.find(".today").css("background-color", y);
        d();
    }
    function d() {
        var t; var n = $("#calendar").css("width", e + "px");
        n.find(t = "#calendar_weekdays, #calendar_content").css("width", e + "px").find("div").css({ width: e / 7 + "px", height: e / 7 + "px", "line-height": e / 7 + "px" });
        n.find("#calendar_header").css({ height: e * (1 / 7) + "px" }).find('i[class^="bx"]').css("line-height", e * (1 / 7) + "px");
    }
    function h() { var e = []; for (var r = 1; r < v(t, n) + 1; r++) { e.push({ day: r, weekday: s[m(t, n, r)] }) } return e }
    function p() { f.empty(); for (var e = 0; e < 7; e++) { f.append("<div>" + s[e].substring(0, 3) + "</div>") } }
    function v(e, t) { return (new Date(e, t, 0)).getDate() }
    function m(e, t, n) { return (new Date(e, t - 1, n)).getDay() }
    function g(e) { return y(new Date) == y(e) }
    function y(e) { return e.getFullYear() + "/" + (e.getMonth() + 1) + "/" + e.getDate() }
    function b() { var e = new Date; t = e.getFullYear(); n = e.getMonth() + 1 }
    var e = 480; var t = 2013; var n = 9; var r = [];
    var i = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
    var s = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var o = ["#16a085", "#1abc9c", "#c0392b", "#27ae60", "#FF6860", "#f39c12", "#f1c40f", "#e67e22", "#2ecc71", "#e74c3c", "#d35400", "#2c3e50"];
    var u = $("#calendar"); var a = u.find("#calendar_header"); var f = u.find("#calendar_weekdays"); var l = u.find("#calendar_content");
    b(); c();
    a.find('i[class^="bx"]').on("click", function () {
        getEvents();
        var e = $(this);
        var r = function (e) {
            n = e == "next" ? n + 1 : n - 1; if (n < 1) { n = 12; t-- } else if (n > 12) { n = 1; t++ } c()
        };
        if (e.attr("class").indexOf("left") != -1) { r("previous") }
        else { r("next") }
    })
}

function getEvents() {
    console.log("eventsstts")
}