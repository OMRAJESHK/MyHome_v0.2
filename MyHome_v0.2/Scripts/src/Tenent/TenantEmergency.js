
let emcyIsEdit = false;
let emcySelectedID = '';
let emcyConResData = [];
let assetID = Number(sessionStorage.getItem('AssetID'));
// Get Emergency Contact Details - Tenants
const getEmergencyContactList = () => {
    let assetID = Number(sessionStorage.getItem('AssetID'));
    ManageAjaxCalls.GetData(ApiDictionary.GetEmergencyContactsByAsset() + `?AssetName=${assetID}&IsVisible=1`, EmergencyContactRes)
}

const EmergencyContactRes = (res) => {
    console.log(res, isAdmin(), mainContent);
    let emcyConResData = res;
    var url = window.rootpath + "Tenent/_emrcyContact";

    $.get(url, function (response) {
        RenderContent.html(response);
        isAdmin() ?
            mainContent.find('#btnAddEmergancies').show() :
            mainContent.find('#btnAddEmergancies').hide();
        $('#tblEmergancyContact tbody').empty();
        $('#tblEmergancyContact thead').html(`<tr class="global-bg-primary">
                        <th>Name</th>
                        <th>Contact Number</th>
                        <th>Profession</th> 
                    </tr>`);

        $('#RenderContent #tblEmergancyContact').DataTable({
            "bLengthChange": false, "bFilter": true, "bInfo": true, "bPaginate": true, "bAutoWidth": false, 'bDestroy': true, "bSort": true,
            data: emcyConResData,
            columns: [
                { data: 'ContactName', },
                { data: 'ContactNumber' },
                { data: 'Profession', render: function (data) { return Professions[data] } },
            ],
        });
    });
}


// Get Emergency Contact Details - Admins
const getEmergencyContacts = () => {
    ManageAjaxCalls.GetData(ApiDictionary.GetEmergencyContacts() + `?AssetName=${assetID}`, EmergencyContactResponse);
}

const EmergencyContactResponse = (res) => {
    console.log(res);
    emcyConResData = res;
    var url = window.rootpath + "Tenent/_emrcyContact";
    $.get(url, function (response) {
        RenderContent.html(response);
        $('#tblEmergancyContact tbody').empty();
        $('#tblEmergancyContact thead').html(`
                    <tr class="global-bg-primary">
                        <th>Name</th> <th>Contact Number</th><th>Profession</th> 
                        <th>IsVisible</th><th>Action</th>
                    </tr>`);
        $('#RenderContent #tblEmergancyContact').DataTable({
            "bLengthChange": false, "bFilter": true, "bInfo": true, "bPaginate": true, "bAutoWidth": false, 'bDestroy': true, "bSort": true,
            data: emcyConResData,
            columns: [
                { data: 'ContactName', },
                { data: 'ContactNumber' },
                { data: 'Profession', render: function (data) { return Professions[data] } },
                {
                    data: 'IsVisible', render: function (data) {
                        return `<div class="col px-2">
                            <div class="label ${data == 1 ? "text-success" : "text-danger"} text-center fontSize_30" ><span class="pl-2 font-weight-bold">${data == 1 ? "&#10003;" : "&#128473;"}</span></div>
                        </div>` },
                },
                {
                    data: 'EmcyContactId', render: function (data) {
                        ;
                        return `<div class="d-flex justify-content-center">
                                <button title="Edit" class="btn"><i class="fas fa-edit fontSize_20 text-info" onclick="emergancyTaxEdit(${data})"></i></button>
                                <button title="Delete" class="btn"><i class="fas fa-trash-alt fontSize_20 text-danger" onclick="emergancyDelete(${data})"></i></button></div>`;
                    }
                },
            ],
        });
    });
}

const EmergencyContactEdit = (id) => {
    console.log(id)
}

const gotoSaveEmergancyContact = () => {
    var url = window.rootpath + AdminURLs.SaveEmergancyContact;
    let ProfessionsList = convertObjectArray(Professions);
    console.log(ProfessionsList)

    $.get(url, function (response) {
        RenderContent.html(response);
        let options = `<option value="0">--Select--</option>`;
        options += ProfessionsList.map(x => {
            return `<option value=${x.name}>${x.value}</option>`;
        });
        RenderContent.find('#ddlemcyProfessions').html(options)

    });
}

// SAVE Emergancy Contacts

const saveEmergancyContactsDetails = () => {
    let emcyName = RenderContent.find("#txtemcyContactName").val();
    let emcyNumber = RenderContent.find("#txtemcyContactNumber").val();
    let emcyProjession = Number(RenderContent.find("#ddlemcyProfessions option:selected ").val());
    let isVisible = RenderContent.find("#ckbemcyIsVisible").is(':checked') ? 1 : 0;

    let EmcyContactToSave = JSON.stringify({
        AssetName: assetID,
        ContactName: emcyName,  
        ContactNumber: emcyNumber,
        Profession: emcyProjession,
        IsVisible: isVisible,
       
    });
    console.log('isEdit', emcyIsEdit)
    emcyIsEdit ?
        ManageAjaxCalls.Put(ApiDictionary.PutEmergency() + '?id=' + selectedID, EmcyContactToSave, (res) => {
            console.log('modified', res)
        }) :
        ManageAjaxCalls.Post(ApiDictionary.PostEmergency(), EmcyContactToSave, (res) => {
            console.log('res', res)
        });
    emcyIsEdit = false;
    selectedID = '';
}

// EDIT PROPERTY TAX
function emergancyTaxEdit(id) {
    var url = window.rootpath + AdminURLs.SaveEmergancyContact;
    emcyIsEdit = true;
    selectedID = id;
    let ProfessionsList = convertObjectArray(Professions);
    $.get(url, function (response) {
        RenderContent.html(response);
        let options = `<option value="0">--Select--</option>`;
        options += ProfessionsList.map(x => {
            return `<option value=${x.name}>${x.value}</option>`;
        });
        RenderContent.find('#ddlemcyProfessions').html(options);

        let currentRow = emcyConResData.filter(x => x.EmcyContactId === id);
        RenderContent.find("#txtemcyContactName").val(currentRow[0].ContactName);
        RenderContent.find("#txtemcyContactNumber").val(currentRow[0].ContactNumber);
        RenderContent.find("#ddlemcyProfessions").val(currentRow[0].Profession).change();
        RenderContent.find("#ckbemcyIsVisible").attr('checked', currentRow[0].IsVisible==1 ? true :false) ;
    });
}

// DELETE Emergancy Contact TAX
function emergancyDelete(id) {
    ManageAjaxCalls.Delete(ApiDictionary.DeleteEmergency() + '?id=' + id, (res) => {
        console.log('DEleted Successfully', res)
    });
}