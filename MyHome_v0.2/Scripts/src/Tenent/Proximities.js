const getProximities = () => {
    let assetID = sessionStorage.getItem('AssetID')
    ManageAjaxCalls.GetData(ApiDictionary.GetProximity() + `?AssetName=${assetID}`, (res) => {
         $('#lblRailwayStation').text(res["RailwayStation"]);
         $('#lblBusStation').text(res["BusStation"]);
         $('#lblAirport').text(res["Airport"]);
         $('#lblMetroStation').text(res["MetroStation"]);
         $('#lblSchoolorCollege').text(res["SchoolorCollege"]);
         $('#lblHospital').text(res["Hospital"]);
         $('#lblMarket').text(res["Market"]);
         $('#lblTemple').text(res["Temple"]);
         $('#lblHotel').text(res["Hotel"]);
     });  
}
const getValue = (field) => {
    return RenderContent.find(field).val();
}
function GotosaveProximities() {
    var url = window.rootpath + AdminURLs.SaveProximity;

    $.get(url, function (response) {
        RenderContent.html(response);
        let assetId = Number(sessionStorage.getItem('AssetID'));
        ManageAjaxCalls.GetData(ApiDictionary.GetProximity() + `?AssetName=${assetId}`, (res) => {
            RenderContent.find('#txtRailwayStation').val(res["RailwayStation"]);
            RenderContent.find('#txtBusStation').val(res["BusStation"]);
            RenderContent.find('#txtAirport').val(res["Airport"]);
            RenderContent.find('#txtMetroStation').val(res["MetroStation"]);
            RenderContent.find('#txtSchoolorCollege').val(res["SchoolorCollege"]);
            RenderContent.find('#txtHospital').val(res["Hospital"]);
            RenderContent.find('#txtMarket').val(res["Market"]);
            RenderContent.find('#txtTemple').val(res["Temple"]);
            RenderContent.find('#txtHotel').val(res["Hotel"]);
        });
    });
}

function saveProximity() {
    let ProximityToSave = JSON.stringify({
        AssetName: sessionStorage.getItem('AssetID'),
        RailwayStation: getValue('#txtRailwayStation'),
        BusStation: getValue('#txtBusStation'),
        Airport: getValue('#txtAirport'),
        MetroStation: getValue('#txtMetroStation'),
        SchoolorCollege: getValue('#txtSchoolorCollege'),
        Hospital: getValue('#txtHospital'),
        Market: getValue('#txtMarket'),
        Temple: getValue('#txtTemple'),
        Hotel: getValue('#txtHotel'),
    });
    let addetID = sessionStorage.getItem('AssetID');
    console.log(ApiDictionary.PutProximity() + `?id=${addetID}`, ProximityToSave)
    ManageAjaxCalls.Put(ApiDictionary.PutProximity() + `?id=${addetID}`, ProximityToSave, (res) => {
        console.log('Proximity Saved', res)
    });
}

// DELETE Confirmation Modal
function SetProximityDeleteModal(id) {
    let deleteButtons = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal" onclick="ProximityDelete(${id})">Delete</button>`;
    $('#deleteModal .modal-title').text("Asset");
    $('#deleteModal .modal-footer').html(deleteButtons);
    $('#deleteModal').modal('show');
}

// DELETE PROPERTY TAX
function ProximityDelete() {
    let id = sessionStorage.getItem("AssetID")
    ManageAjaxCalls.Delete(ApiDictionary.ProximityDelete() + '?id=' + id, (res) => {
        console.log('Deleted Successfully', res);
        CustomeToast("Tenant Agreement", "Proximity Deleted Successfully", "bg-danger");
    });
}