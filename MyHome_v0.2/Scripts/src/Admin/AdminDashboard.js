

function getStatistics() {
    // OverAll Income Graph
    //var ctx = $(document).find("#yearIncomeChart")[0].getContext('2d');
    // YEAR
    let graphParams = {
        id: "yearIncomeChart",
        data: [1958, 1450, 1244, 1450],
        labels: ["Rent", "Water", "Motor", "Misselleneous"],
        borderColor: ['#2196f38c', '#f443368c', '#3f51b570', '#00968896'],
        bgColor: ['#2196f38c', '#f443368c', '#3f51b570', '#00968896'],
        borderWidth: 1
    }
    drawDoughnutGraph(graphParams);

    // OverAll Expense Graph

    graphParams = {
        id: "yearExpenseChart",
        data: [1858, 1550, 1144, 1300],
        labels: ["Rent", "Water", "Motor", "Misselleneous"],
        borderColor: ['#2196f38c', '#f443368c', '#3f51b570', '#00968896'],
        bgColor: ['#2196f38c', '#f443368c', '#3f51b570', '#00968896'],
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
