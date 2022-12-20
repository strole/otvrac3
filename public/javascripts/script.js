$.ajax({
  url: "/boats",
  dataType: "json",
  type: "GET",
  contentType: "application/json; charset=utf-8",

  success: function (data) {
    var tr =
      "<thead><tr><th>Name</th><th>Model</th><th>Type</th><th>Year</th><th>Length</th><th>Beam</th><th>Cabins</th><th>Berths</th><th>WC</th><th>Base name</th><th>Base number</th><th>Skipper name</th><th>Skipper surname</th><th>Skipper licence</th></tr></thead>";
    tr +=
      "<tfoot><tr><th>Name</th><th>Model</th><th>Type</th><th>Year</th><th>Length</th><th>Beam</th><th>Cabins</th><th>Berths</th><th>WC</th><th>Base name</th><th>Base number</th><th>Skipper name</th><th>Skipper surname</th><th>Skipper licence</th></tr></tfoot>";

    tr += "<tbody>";
    for (let i = 0; i < data.length; i++) {
      tr += "<tr>";
      tr += "<td>" + data[i].name + "</td>";
      tr += "<td>" + data[i].model + "</td>";
      tr += "<td>" + data[i].type + "</td>";
      tr += "<td>" + data[i].year + "</td>";
      tr += "<td>" + data[i].length + "</td>";
      tr += "<td>" + data[i].beam + "</td>";
      tr += "<td>" + data[i].cabins + "</td>";
      tr += "<td>" + data[i].berths + "</td>";
      tr += "<td>" + data[i].wc + "</td>";
      tr += "<td>" + data[i].base.name + "</td>";
      tr += "<td>" + data[i].base.number + "</td>";
      tr += "<td>" + data[i].skipper.name + "</td>";
      tr += "<td>" + data[i].skipper.surname + "</td>";
      tr += "<td>" + data[i].skipper.licence + "</td>";

      tr += "</tr>";
    }
    tr += "</body>";

    $("#boatsTable").append(tr);
    $("#boatsTable tfoot th").each(function () {
      var title = $(this).text();
      $(this).html('<input type="text" placeholder="' + title + '" />');
    });
    tblFormation();
    $(".dataTables_scrollFoot").css({ overflow: "scroll" });
  },
  error: function (xhr) {
    console.error("error");
  },
});
function tblFormation() {
  $("#boatsTable").DataTable({
    initComplete: function () {
      // Apply the search
      this.api()
        .columns()
        .every(function () {
          var that = this;

          $("input", this.footer()).on("keyup change clear", function () {
            if (that.search() !== this.value) {
              that.search(this.value).draw();
            }
          });
        });
    },
    searching: true,
    processing: true,
    scrollY: 700,
    deferRender: true,
    scroller: true,
    dom: "Bfrtip",
    buttons: [
      {
        text: "JSON",
        action: function (e, dt, button, config) {
          var data = dt.buttons.exportData();
          $.fn.dataTable.fileSave(
            new Blob([csvJSON(dataToCSV(data))]),
            "Export.json"
          );
        },
      },
      {
        text: "CSV",
        action: function (e, dt, button, config) {
          var data = dt.buttons.exportData();
          $.fn.dataTable.fileSave(new Blob([dataToCSV(data)]), "Export.csv");
        },
      },
    ],
  });
}
function dataToCSV(data) {
  csv = "";
  data.header.forEach((element) => {
    csv += element + ",";
  });
  csv = csv.slice(0, -1);
  csv += "\n";
  data.body.forEach((element) => {
    csv += element + "\n";
  });
  csv = csv.slice(0, -1);
  return csv;
}
function csvJSON(csv) {
  var lines = csv.split("\n");

  var result = [];
  var headers = lines[0].split(",");

  for (var i = 1; i < lines.length; i++) {
    var obj = {};
    var currentline = lines[i].split(",");

    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }

    result.push(obj);
  }
  return JSON.stringify(result);
}
