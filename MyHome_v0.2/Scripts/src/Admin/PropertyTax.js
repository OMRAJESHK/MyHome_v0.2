function getPropertyTaxLogs() {
    let assetID = sessionStorage.getItem('AssetID');
    let StatusList = convertObjectArray(Status);
    ManageAjaxCalls.GetData(ApiDictionary.GetPropertyTaxes() + `?AssetName=${assetID}`, (res) => {
        $('#tblPropertyTaxLogs tbody').empty();
        let rowItem = '';
        if (res.length > 0) {
            $.each(res, function (key, row) {
                rowItem += '<tr><td>' +
                    row.TaxDate + '</td><td>' +
                    row.TaxAmount + '</td><td>' +
                    StatusList.filter(x => x.value === row.Status)[0].name + '</td><td>' +
                    row.Remarks + '</td></tr>';
            });
        }
        else {
            rowItem = `<tr><td colspan="9" class="noRecords">No Records</td></tr>`
        }
        $('#RenderContent #tblPropertyTaxLogs tbody').html(rowItem);
    });
}

function gotoSavePropertyTax() {
    var url = window.rootpath + AdminURLs.SavePropertyTax;
    $.get(url, function (response) {
        RenderContent.html(response);
    });
}