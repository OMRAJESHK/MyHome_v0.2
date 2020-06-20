$(document).ready(() => {
    $('#btnAssetRegistration').click(() => {
        $.ajax({
            type: "POST",
            contentType: "application/json;charset=utf-8",
            url: "/api/Employees/",
            data: JSON.stringify({
                EmployeeID: $("#empID").val(),
                Name: $("#empName").val(),
                Position: $("#empPosition").val(),
                Age: $("#empAge").val(),
                Salary: $('#empSalary').val()

            }),
            dataType: "JSON",
            success: function (data) {
                $("table").find("tr:gt(0)").remove();
                $('table tr:gt(0)').remove();
                $.getJSON("/api/Employees", function (data) {
                    $.each(data, function (k, v) {
                        $('<tr><td>' + v.EmployeeID + '</td><td>' + v.Name + '</td><td>' + v.Position + '</td><td>' + v.Age + '</td><td>' + v.Salary + '</td></tr>').appendTo('table')
                    });
                });



            }
        });
    })
})