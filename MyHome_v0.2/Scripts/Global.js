

$(document).ready(() => {

    $(".btnTenentDetails").click(() => {
        $('.dashboardAngle').hasClass('angleRotate180') ?
            $('.dashboardAngle').removeClass('angleRotate180')
            : $('.dashboardAngle').addClass('angleRotate180')
    });

    $(".btnAllTransactions").click(() => {
        var url = window.rootpath + "Tenent/_allTransactions";
        $.get(url, function (response) {
            $('#RenderContent').html(response);
            $('#RenderContent').find("#trnFrom , #trnTo").datepicker({ dateFormat: 'dd/mm/yy', changeMonth: true, changeYear: true });
            
        });
    });
    $(".btn_T_Dashboad").click(() => {
        var url = window.rootpath + "Tenent/_tenentDashboard";
        $.get(url, function (response) {
            $('#RenderContent').html(response);
            var ctx = document.getElementById("elecBill").getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
                    datasets: [{
                        label: 'Electricity Bill', // Name the series
                        data: [234, 345, 567, 678,840], // Specify the data values array
                        fill: false,
                        borderColor: '#38ef7d', // Add custom color border (Line)
                        backgroundColor: '#11998e', // Add custom color background (Points and Fill)
                        borderWidth: 1 // Specify bar border width
                    }]
                },
                options: {
                    responsive: true, // Instruct chart js to respond nicely.
                    maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height 
                }
            });

            var ctx = document.getElementById("waterMotorBill").getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
                    datasets: [{
                        label: 'Motor Bill', // Name the series
                        data: [234, 645, 667, 478, 940], // Specify the data values array
                        fill: false,
                        borderColor: '#007bff', // Add custom color border (Line)
                        backgroundColor: '#11998e', // Add custom color background (Points and Fill)
                        borderWidth: 1 // Specify bar border width
                    }]
                },
                options: {
                    responsive: true, // Instruct chart js to respond nicely.
                    maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height 
                }
            });

        });
    });
    $(".btnRentAgreement").click(() => {
        var url = window.rootpath + "Tenent/_tenentDetails";
        $.get(url, function (response) {
            $('#RenderContent').html(response);
        });
    });
    $(".btnDocuments").click(() => {
        var url = window.rootpath + "Tenent/_TenentDocuments";
        $.get(url, function (response) {
            $('#RenderContent').html(response);
        });
    });
    $(".btnHouseDetails").click(() => {
        var url = window.rootpath + "Tenent/_houseDetails";
        $.get(url, function (response) {
            $('#RenderContent').html(response);
        });
    });
    $(".btnEmcyContact").click(() => {
        var url = window.rootpath + "Tenent/_emrcyContact";
        $.get(url, function (response) {
            $('#RenderContent').html(response);
        });
    });
    $(".btnProximity").click(() => {
        var url = window.rootpath + "Tenent/_proximity";
        $.get(url, function (response) {
            $('#RenderContent').html(response);
        });
    });
    $(".btnRaiseReq").click(() => {
        var url = window.rootpath + "Tenent/_raiseRequest";
        $.get(url, function (response) {
            $('#RenderContent').html(response);
        });
    });
    
});