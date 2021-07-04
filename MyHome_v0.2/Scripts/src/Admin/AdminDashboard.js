

function getStatistics() {
    var date = new Date();
    var year = date.getFullYear();
    console.log("ererererer", year);
    let assetID = sessionStorage.getItem('AssetID');
    let yearlyddlhtml = '';
    [1, 2, 3, 4, 5].map((num,index) => {
        yearlyddlhtml += `<option value=${year - index}>${year - index}</option>`;
    })
    $("#yearlyDdl").html(yearlyddlhtml);
    var trnFrom = dateFormat('01/01/' + year);
    var trnTo = dateFormat('31/12/' + year);
    ManageAjaxCalls.GetData(ApiDictionary.GetTransactions() + `?AssetName=${assetID}&trnFrom=${trnFrom}&trnTo=${trnTo}`, TransactionsRes);
}

const TransactionsRes = (res) => {
    var date = new Date();
    var year = date.getFullYear();
    let status = {
        rent: {
            "1": false, "2": false, "3": false, "4": false, "5": false, "6": false,
            "7": false, "8": false, "9": false, "10": false, "11": false, "12": false,
        },
        water: {
            "1": false, "2": false, "3": false, "4": false, "5": false, "6": false,
            "7": false, "8": false, "9": false, "10": false, "11": false, "12": false,
        },
        electricy: {
            "1": false, "2": false, "3": false, "4": false, "5": false, "6": false,
            "7": false, "8": false, "9": false, "10": false, "11": false, "12": false,
        }
    }

    let yearlyIncome = { rent: 0, water: 0, electricity: 0, motor: 0, misselleneous: 0 }
    let yearlyExpense = { rent: 0, water: 0, electricity: 0, motor: 0, misselleneous: 0 }

    res && res.length > 0 && res.map(trn => {
        if (trn.TransactionType < 100) {
            switch (Number(trn.TransactionType)) {
                case 2: yearlyIncome.rent += trn.Amount;
                    status.rent[Number(trn.Date.split("-")[1])] = trn.Status == 1 ? true : false;
                    break;
                case 3: yearlyIncome.water += trn.Amount;
                    status.water[Number(trn.Date.split("-")[1])] = trn.Status == 1 ? true : false;
                    break;
                case 4: yearlyIncome.electricity += trn.Amount;
                    status.electricy[Number(trn.Date.split("-")[1])] = trn.Status == 1 ? true : false;
                    break;
                case 5: yearlyIncome.motor += trn.Amount;
                    break;
                default: yearlyIncome.misselleneous += trn.Amount;
                    break;
            }
        } else {
            switch (Number(trn.TransactionType)) {
                case 2: yearlyExpense.rent += trn.Amount;
                    break;
                case 3: yearlyExpense.water += trn.Amount;
                    break;
                case 4: yearlyExpense.electricity += trn.Amount;
                    break;
                case 5: yearlyExpense.motor += trn.Amount;
                    break;
                default: yearlyExpense.misselleneous += trn.Amount; break;
            }
        }
    });

    // card body electricy Check
    let rentCheckHtml = "";
    for (const key in status.rent) {
        rentCheckHtml += status.rent[key] ?
            `<div class="col px-2">
                     <div class="label text-success fontSize_18"><span>${Months[key]}</span><span class="pl-2 font-weight-bold">&#10003;</span></div>
                </div>`:
            `<div class="col px-2">
                      <div class="label text-danger fontSize_18"><span>${Months[key]}</span><span class="pl-2 font-weight-bold">&#128473;</span></div>
                </div>`
    }
    $(".row#crdbdyRentCheck ").html(rentCheckHtml);

    // card body electricy Check
    let electricityCheckHtml = '';
    for (const key in status.electricy) {
        electricityCheckHtml += status.electricy[key] ?
            `<div class="col px-2">
                     <div class="label text-success fontSize_18"><span>${Months[key]}</span><span class="pl-2 font-weight-bold">&#10003;</span></div>
                </div>`:
            `<div class="col px-2">
                      <div class="label text-danger fontSize_18"><span>${Months[key]}</span><span class="pl-2 font-weight-bold">&#128473;</span></div>
                </div>`
    }
    $(".row#crdbdyElectricityCheck").html(electricityCheckHtml);

    // card body electricy Check
    let waterCheckHtml = '';
    for (const key in status.water) {
        waterCheckHtml += status.water[key] ?
            `<div class="col px-2">
                     <div class="label text-success fontSize_18"><span>${Months[key]}</span><span class="pl-2 font-weight-bold">&#10003;</span></div>
                </div>`:
            `<div class="col px-2">
                      <div class="label text-danger fontSize_18"><span>${Months[key]}</span><span class="pl-2 font-weight-bold">&#128473;</span></div>
                </div>`
    }
    $(".row#crdbdyWaterCheck ").html(waterCheckHtml);


    // OverAll Income Graph
    // YEAR
    let graphParams = {
        id: "yearIncomeChart",
        data: [yearlyIncome.rent, yearlyIncome.water, yearlyIncome.electricity, yearlyIncome.motor, yearlyIncome.misselleneous],
        labels: ["Rent", "Water", "Electricity", "Motor", "Misselleneous"],
        borderColor: ['#2196f38c', '#00961234', '#f443368c', '#3f51b570', '#00968896'],
        bgColor: ['#2196f38c', '#00961345', '#f443368c', '#3f51b570', '#00968896'],
        borderWidth: 1
    }
    drawDoughnutGraph(graphParams);

    // OverAll Expense Graph

    graphParams = {
        id: "yearExpenseChart",
        data: [yearlyExpense.rent, yearlyExpense.water, yearlyExpense.electricity, yearlyExpense.motor, yearlyExpense.misselleneous],
        labels: ["Rent", "Water", "Electricity", "Motor", "Misselleneous"],
        borderColor: ['#2196f38c', '#00961234', '#f443368c', '#3f51b570', '#00968896'],
        bgColor: ['#2196f38c', '#00961345', '#f443368c', '#3f51b570', '#00968896'],
        borderWidth: 1
    }
    drawDoughnutGraph(graphParams);


    let yearlyTotalIncome = 0;
    for (const key in yearlyIncome) {
        yearlyTotalIncome += yearlyIncome[key];
    }
    $("#totalInc").html(`&#8377; ${yearlyTotalIncome}`);

    let yearlyTotalExp = 0;
    for (const key in yearlyExpense) {
        yearlyTotalExp += yearlyExpense[key];
    }
    $("#totalExp").html(`&#8377; ${yearlyTotalExp}`);

    var currMonth = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    //Months

    let monthlyIncome = { rent: 0, water: 0, electricity: 0, motor: 0, misselleneous: 0 }
    let monthlyExpense = { rent: 0, water: 0, electricity: 0, motor: 0, misselleneous: 0 }
    let MonthlyRes = res.filter(x => Number(x.Date.split("-")[1]) == Number(currMonth));

    MonthlyRes?.length > 0 && MonthlyRes.map(trn => {
        if (trn.TransactionType < 100) {
            switch (Number(trn.TransactionType)) {
                case 2: monthlyIncome.rent += trn.Amount;
                    status.rent[Number(trn.Date.split("-")[1])] = trn.Status == 1 ? true : false;
                    break;
                case 3: monthlyIncome.water += trn.Amount;
                    status.water[Number(trn.Date.split("-")[1])] = trn.Status == 1 ? true : false;
                    break;
                case 4: monthlyIncome.electricity += trn.Amount;
                    status.electricy[Number(trn.Date.split("-")[1])] = trn.Status == 1 ? true : false;
                    break;
                case 5: monthlyIncome.motor += trn.Amount;
                    break;
                default: monthlyIncome.misselleneous += trn.Amount;
                    break;
            }
        } else {
            switch (Number(trn.TransactionType)) {
                case 2: monthlyExpense.rent += trn.Amount;
                    break;
                case 3: monthlyExpense.water += trn.Amount;
                    break;
                case 4: monthlyExpense.electricity += trn.Amount;
                    break;
                case 5: monthlyExpense.motor += trn.Amount;
                    break;
                default: monthlyExpense.misselleneous += trn.Amount; break;
            }
        }
    });


    // MONTH
    graphParams = {
        id: "monthIncomeChart",
        data: [monthlyIncome.rent, monthlyIncome.water, monthlyIncome.electricity, monthlyIncome.motor, monthlyIncome.misselleneous],
        labels: ["Rent", "Water", "Electricity", "Motor", "Misselleneous"],
        borderColor: ['#2196f38c', '#00961234', '#f443368c', '#3f51b570', '#00968896'],
        bgColor: ['#2196f38c', '#00961345', '#f443368c', '#3f51b570', '#00968896'],
        borderWidth: 1
    }
    drawDoughnutGraph(graphParams);
    graphParams = {
        id: "monthExpenseChart",
        data: [monthlyExpense.rent, monthlyExpense.water, monthlyExpense.electricity, monthlyExpense.motor, monthlyExpense.misselleneous],
        labels: ["Rent", "Water", "Electricity", "Motor", "Misselleneous"],
        borderColor: ['#2196f38c', '#00961234', '#f443368c', '#3f51b570', '#00968896'],
        bgColor: ['#2196f38c', '#00961345', '#f443368c', '#3f51b570', '#00968896'],
        borderWidth: 1
    }
    drawDoughnutGraph(graphParams);
    let monthlyTotalIncome = 0;
    for (const key in monthlyIncome) {
        monthlyTotalIncome += monthlyIncome[key];
    }
    $("#totalMonthlyInc").html(`&#8377; ${monthlyTotalIncome}`);

    let monthlyTotalExp = 0;
    for (const key in monthlyExpense) {
        monthlyTotalExp += monthlyExpense[key];
    }
    $("#totalMonthlyExp").html(`&#8377; ${monthlyTotalExp}`);
}

const drawDoughnutGraph = (graphParams) => {
    const { id, labels, data, borderColor, bgColor, borderWidth } = graphParams
    var ctx = document.getElementById(id).getContext('2d');
    var myChart = new Chart(ctx, {
        responsive: true,
        maintainAspectRatio: true,
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data, // Specify the data values array
                borderColor: borderColor, // Add custom color border
                backgroundColor: bgColor, // Add custom color background (Points and Fill)
                borderWidth: borderWidth // Specify bar border width
            }]
        },
        options: {
            responsive: true, // Instruct chart js to respond nicely.
            maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height
        }
    });
}


function yearlyDdlChange() {
    let year = $('select#yearlyDdl option:selected').val();

    let assetID = sessionStorage.getItem('AssetID');
    console.log("ererererer", year);

    var trnFrom = dateFormat('01/01/' + year);
    var trnTo = dateFormat('31/12/' + year);
    ManageAjaxCalls.GetData(ApiDictionary.GetTransactions() + `?AssetName=${assetID}&trnFrom=${trnFrom}&trnTo=${trnTo}`, TransactionsRes);
}