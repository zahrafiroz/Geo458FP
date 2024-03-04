 // Load the Visualization API and the corechart package.
 google.charts.load('current', {'packages':['corechart']});

 // Set a callback to run when the Google Visualization API is loaded.
 google.charts.setOnLoadCallback(drawChart);

 // Callback that creates and populates a data table,
 // instantiates the pie chart, passes in the data and
 // draws it.
 function drawChart() {

   // Create the data table.
   var data1 = new google.visualization.DataTable();
   data1.addColumn('string', 'Year');
   data1.addColumn('number', 'Total Precipitation (inches)');
   data1.addRows([
    ['2015', 44.38],
    ['2016', 45.18],
    ['2017', 47.87],
    ['2018', 35.73],
    ['2019', 33.88],
    ['2020', 41.32]
   ]);

   // Set chart options
   var options1 = {'title':'Seattle Annual Precipitation (2015 - 2020)',
   'backgroundColor': '#201d1d',
   'is3D': true,
   'titleTextStyle': {
       'color': 'white' // Set the text color to white
   },
   'legend': {
    'position': 'none',
  },
  'width': 600, // Set the width of the chart
  'height': 400, // Set the height of the chart
}

   // Instantiate and draw our chart, passing in some options.
   var chart1 = new google.visualization.PieChart(document.getElementById('chart_div'));
   chart1.draw(data1, options1);
 }