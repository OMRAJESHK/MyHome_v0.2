let ProxisEdit = false;

const getProximities = () => {
    let assetID = sessionStorage.getItem('AssetID')
    ManageAjaxCalls.GetData(ApiDictionary.GetProximity() + `?AssetName=${assetID}`, (res) => {
        if (isAdmin()) {
            if (res.length == 0) {
                mainContent.find('#btnEditProximities').hide();
                mainContent.find('#btnAddProximities').show();
            } else if (res.length != 0){
                mainContent.find('#btnEditProximities').show();
                mainContent.find('#btnAddProximities').hide()
            }
        } else {
            mainContent.find('#btnEditProximities').hide()
        }
        const checkFields = (val) => {
            if (val) return val && val[0] == "" ? "N/A" : `${val[0]} (${val[1]}KM)`
        }
        if (res.length > 0) {
            globalProximity = res;
            $('#lblRailwayStation').text(checkFields(res[0]["RailwayStation"].split("-")));
            $('#lblBusStation').text(checkFields(res[0]["BusStation"].split("-")));
            $('#lblAirport').text(checkFields(res[0]["Airport"].split("-")));
            $('#lblMetroStation').text(checkFields(res[0]["MetroStation"].split("-")));
            $('#lblSchoolorCollege').text(checkFields(res[0]["SchoolorCollege"].split("-")));
            $('#lblHospital').text(checkFields(res[0]["Hospital"].split("-")));
            $('#lblMarket').text(checkFields(res[0]["Market"].split("-")));
            $('#lblTemple').text(checkFields(res[0]["Temple"].split("-")));
            $('#lblHotel').text(checkFields(res[0]["Hotel"].split("-")));
        } else {
            $('#lblRailwayStation,#lblBusStation,#lblAirport,#lblMetroStation,#lblSchoolorCollege,#lblHospital,#lblMarket,#lblTemple,#lblHotel').text("N/A");
            $("#airportDistance,#RailwayStationDistance,#BusStationDistance,#MetroDistance,#SchoolCollegeDistance,#HospitalDistance,#MarketDistance,#HotelDistance,#TempleDistance").text("");
        }
        
        setTimeout(() => {
            setScreenLoader(false)
        }, 500);
    }, () => {
            setScreenLoader(false);
            mainContent.find('#btnEditProximities').hide();
            mainContent.find('#btnAddProximities').hide();
            mainContent.find('#btnDeleteProximities').hide();
            
    });  
}
const getValue = (field) => {
    return RenderContent.find(field).val();
}
function GotosaveProximities(isEdit) {
    var url = window.rootpath + AdminURLs.SaveProximity;
    ProxisEdit = isEdit;
    $.get(url, function (response) {
        RenderContent.html(response);
        let assetId = Number(sessionStorage.getItem('AssetID'));
        ["ddlAirportDistance", "ddlRailwayStationDistance", "ddlBusStationDistance",
            "ddlMetroStationDistance", "ddlSchoolCollegeDistance", "ddlHospitalDistance",
            "ddlMarketDistance", "ddlHotelDistance", "ddlTempleDistance"].map(itm => {
                console.log("convertObjectArray", convertObjectArray(Distance))
                generateOptions(convertObjectArray(Distance), itm);
            });
        ManageAjaxCalls.GetData(ApiDictionary.GetProximity() + `?AssetName=${assetId}`, (res) => {
            console.log("resres", res)
            RenderContent.find('#txtRailwayStation').val(res[0]["RailwayStation"].split("-")[0]);
            RenderContent.find('#txtBusStation').val(res[0]["BusStation"].split("-")[0]);
            RenderContent.find('#txtAirport').val(res[0]["Airport"].split("-")[0]);
            RenderContent.find('#txtMetroStation').val(res[0]["MetroStation"].split("-")[0]);
            RenderContent.find('#txtSchoolorCollege').val(res[0]["SchoolorCollege"].split("-")[0]);
            RenderContent.find('#txtHospital').val(res[0]["Hospital"].split("-")[0]);
            RenderContent.find('#txtMarket').val(res[0]["Market"].split("-")[0]);
            RenderContent.find('#txtTemple').val(res[0]["Temple"].split("-")[0]);
            RenderContent.find('#txtHotel').val(res[0]["Hotel"].split("-")[0]);

            RenderContent.find("#ddlAirportDistance").val(res[0]["Airport"].split("-")[1]).change();
            RenderContent.find("#ddlRailwayStationDistance").val(res[0]["RailwayStation"].split("-")[1]).change();
            RenderContent.find("#ddlBusStationDistance").val(res[0]["BusStation"].split("-")[1]).change();
            RenderContent.find("#ddlMetroStationDistance").val(res[0]["MetroStation"].split("-")[1]).change();
            RenderContent.find("#ddlSchoolCollegeDistance").val(res[0]["SchoolorCollege"].split("-")[1]).change();
            RenderContent.find("#ddlHospitalDistance").val(res[0]["Hospital"].split("-")[1]).change();
            RenderContent.find("#ddlMarketDistance").val(res[0]["Market"].split("-")[1]).change();
            RenderContent.find("#ddlHotelDistance").val(res[0]["Hotel"].split("-")[1]).change();
            RenderContent.find("#ddlTempleDistance").val(res[0]["Temple"].split("-")[1]).change();
        });
    });
}

function saveProximity() {
    let airport = `${getValue('#txtAirport')}-${RenderContent.find("#ddlAirportDistance :selected").val()}`;
    let RailwayStation = `${getValue('#txtRailwayStation')}-${RenderContent.find("#ddlRailwayStationDistance :selected").val()}`;
    let BusStation = `${getValue('#txtBusStation')}-${RenderContent.find("#ddlBusStationDistance :selected").val()}`;
    let MetroStation = `${getValue('#txtMetroStation')}-${RenderContent.find("#ddlMetroStationDistance :selected").val()}`;
    let SchoolorCollege = `${getValue('#txtSchoolorCollege')}-${RenderContent.find("#ddlSchoolCollegeDistance :selected").val()}`;
    let Hospital = `${getValue('#txtHospital')}-${RenderContent.find("#ddlHospitalDistance :selected").val()}`;
    let Market = `${getValue('#txtMarket')}-${RenderContent.find("#ddlMarketDistance :selected").val()}`;
    let Temple = `${getValue('#txtTemple')}-${RenderContent.find("#ddlHotelDistance :selected").val()}`;
    let Hotel = `${getValue('#txtHotel')}-${RenderContent.find("#ddlTempleDistance :selected").val()}`;

    let ProximityToSave = JSON.stringify({
        AssetName: sessionStorage.getItem('AssetID'), RailwayStation: RailwayStation, BusStation: BusStation,
        Airport: airport, MetroStation: MetroStation, SchoolorCollege: SchoolorCollege, Hospital: Hospital,
        Market: Market, Temple: Temple, Hotel: Hotel,
    });
    let addetID = sessionStorage.getItem('AssetID');
    console.log(ApiDictionary.PutProximity() + `?id=${addetID}`, ProximityToSave);
    ProxisEdit?
        ManageAjaxCalls.Put(ApiDictionary.PutProximity() + `?id=${addetID}`, ProximityToSave, (res) => {
            CustomeToast("Proximity", 'Modified Successfully', "bg-info");
            console.log('Proximity Modified', res)
    }) : ManageAjaxCalls.Post(ApiDictionary.PostProximity(), ProximityToSave, (res) => {
        CustomeToast("Proximity", 'Saved Successfully', "bg-success");
        console.log("Proximity Saved", res)
    });
}

// DELETE Confirmation Modal
function SetProximityDeleteModal() {
    let deleteButtons = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal" onclick="ProximityDelete()">Delete</button>`;
    $('#deleteModal .modal-title').text("Asset");
    $('#deleteModal .modal-footer').html(deleteButtons);
    $('#deleteModal').modal('show');
}

// DELETE Proximity TAX
function ProximityDelete() {
    let id = sessionStorage.getItem("AssetID")
    ManageAjaxCalls.Delete(ApiDictionary.DeleteProximity() + '?AssetName=' + id, (res) => {
        console.log('Deleted Successfully', res);
        CustomeToast("Tenant Agreement", "Proximity Deleted Successfully", "bg-danger");
        $('#lblRailwayStation,#lblBusStation,#lblAirport,#lblMetroStation,#lblSchoolorCollege,#lblHospital,#lblMarket,#lblTemple,#lblHotel').text("N/A");
        $("#airportDistance,#RailwayStationDistance,#BusStationDistance,#MetroDistance,#SchoolCollegeDistance,#HospitalDistance,#MarketDistance,#HotelDistance,#TempleDistance").text("");
    });
}