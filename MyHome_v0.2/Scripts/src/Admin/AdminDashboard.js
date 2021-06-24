

function getStatistics() {

    let assetID = sessionStorage.getItem('AssetID');

    var date = new Date();
    var year = date.getFullYear();

    var trnFrom = dateFormat('01/01/' + year);
    var trnTo = dateFormat('31/12/' + year);
    ManageAjaxCalls.GetData(ApiDictionary.GetTransactions() + `?AssetName=${assetID}&trnFrom=${trnFrom}&trnTo=${trnTo}`, (res) => {
        console.log("For graphs", res);
        let yearlyIncome = {
            rent: 0,
            water: 0,
            electricity: 0,
            motor: 0,
            misselleneous: 0
        }
        let yearlyExpense = {
            rent: 0,
            water: 0,
            electricity: 0,
            motor: 0,
            misselleneous: 0
        }
        res && res.length > 0 && res.map(trn => {
            if (trn.TransactionType < 100) {
                switch (Number(trn.TransactionType)) {
                    case 2: yearlyIncome.rent += trn.Amount;
                        break;
                    case 3: yearlyIncome.water += trn.Amount;
                        break;
                    case 4: yearlyIncome.electricity += trn.Amount;
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
        console.log("OverAll-",yearlyIncome, yearlyExpense)
        // OverAll Income Graph
        //var ctx = $(document).find("#yearIncomeChart")[0].getContext('2d');
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

        // MONTH
        graphParams = {
            id: "monthIncomeChart",
            data: [800, 550, 150, 350],
            labels: ["Rent", "Water", "Motor", "Misselleneous"],
            borderColor: ['#2196f38c', '#f443368c', '#3f51b570', '#00968896'],
            bgColor: ['#2196f38c', '#f443368c', '#3f51b570', '#00968896'],
            borderWidth: 1
        }
        drawDoughnutGraph(graphParams);
        graphParams = {
            id: "monthExpenseChart",
            data: [858, 550, 144, 300],
            labels: ["Rent", "Water", "Motor", "Misselleneous"],
            borderColor: ['#2196f38c', '#f443368c', '#3f51b570', '#00968896'],
            bgColor: ['#2196f38c', '#f443368c', '#3f51b570', '#00968896'],
            borderWidth: 1
        }
        drawDoughnutGraph(graphParams);
    });






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
