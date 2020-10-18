// Belly Button Biodiversity - Plotly.js

// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument

function init() {
    d3.json("samples.json").then((importedData) => {
      // console.log(importedData);
      // global variable
      data = importedData;
      var names = data.names;
  
      // Grab a Reference to the Dropdown Select Element
      var selector = d3.select("#selDataset");
  
      // Use the list of names to populate the Test Subject ID no. dropdown
      names.forEach((value) => {
        selector
          .append("option")
          .text(value)
          .attr("value", value);
      });
      // Populate Test Subject
      demoInfo(names[0]);
      barChart(names[0]);
      bubbleChart(names[0]);
      gaugeChart(names[0]);
    });
  }
  //Names added to the dropdown
  init();

  d3.selectAll("#selDataset").on("change", dashFunctions);

  // Function to initiate plots
  function dashFunctions() {
    var testSubject = d3.select("#selDataset").node().value;
    demoInfo(testSubject);
    barChart(testSubject);
    bubbleChart(testSubject);
    gaugeChart(testSubject);
  }

//Function to build demographic info
function demoInfo(testSubject) {
  // console.log(testSubject);
  var mdata = data.metadata.filter((value) => value.id == testSubject);
  var dInfo = d3.select(".panel-body");
  dInfo.html("");
  dInfo.append("p").text(`id: ${mdata[0].id}`);
  dInfo.append("p").text(`Ethnicity: ${mdata[0].ethnicity}`);
  dInfo.append("p").text(`Gender: ${mdata[0].gender}`);
  dInfo.append("p").text(`Age: ${mdata[0].age}`);
  dInfo.append("p").text(`Location: ${mdata[0].location}`);
  dInfo.append("p").text(`bbtype: ${mdata[0].bbtype}`);
  dInfo.append("p").text(`wfreq: ${mdata[0].wfreq}`);
}

//Function to build a Horizontal Bar Chart using sample data

function barChart(name){
  var sample = data.samples.filter(obj => obj.id == name)[0];  
// console.log(sample);
// Variable for 10 colors to apply to bar chart
  var tenColors = ['#00CED1', '#FFFF00', '#FF7F50', '#00FF00', '#9932CC', '#C71585', '#708090', '#7B68EE', '#F08080', '#00FA9A'];
  
var trace1 = {
  x : sample.sample_values.slice(0,10).reverse(),
  y : sample.otu_ids.slice(0,10).reverse().map(y => `OTU ${y}`),
  type:'bar',
  orientation:'h',
  mode:'markers',
  marker:{
    color: tenColors,
   }
  }
  var barData = [trace1];

  //  Apply the group bar mode to the layout
  var layout1 = {
    title: "Test Subject Top OTUs",
    // width: 300, height: 400
    margin: {
      l: 150,
      r: 50,
      t: 50,
      b: 50
    }
  };
  
//  Render the plot to the id "#bar" 
  Plotly.newPlot('bar',barData,layout1);
};

// Function to build a Bubble Chart that displays each sample

function bubbleChart(test) {
  var sampled = data.samples.filter(obj => obj.id == test)[0];
  
  var trace2 = {
    x : sampled.otu_ids,
    y : sampled.sample_values,
    text: sampled.otu_labels,
    mode: 'markers',
    marker: {
        color: sampled.otu_ids,
        size: sampled.sample_values,
      }
  };
  var bubbleT = [trace2];

  // Apply the layout
  var layout2 = {
    title: "Test Subject Samples",
    xaxis: {
      autorange: true,
      title: "Operational Taxonomic Unit (OTU) ID"
    },
    yaxis: {
      autorange: true,
      title: "Sample Values"
    }
  };
  
//  Render the plot to the id "#bubble" 
  Plotly.newPlot('bubble',bubbleT,layout2);
};

//Function to build a Gauge Chart to plot the weekly washing frequency
// Need to modify the example gauge code for values ranging 1-10
function gaugeChart(noname) {
  var filterValue = data.metadata.filter(obj => obj.id == noname)[0].wfreq;

  var gdata = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      title: {
        text: "Belly Button Washing Frequency"
      },
      type: "indicator",

      mode: "gauge",
      gauge: {
        axis: {
          range: [0, 9],
          tickvals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          ticks: "outside"
        },

        steps: [
          { range: [0, 1], color: "#FFEFD5" },
          { range: [1, 2], color: "#FFDAB9" },
          { range: [2, 3], color: "#FFA07A" },
          { range: [3, 4], color: "#FA8072" },
          { range: [4, 5], color: "#F08080" },
          { range: [5, 6], color: "#98FB98" },
          { range: [6, 7], color: "#90EE90" },
          { range: [7, 8], color: "#3CB371" },
          { range: [8, 9], color: "#2E8B57" }
        ],
        threshold: {
          line: { color: "#800000", width: 8 },
          thickness: 4,
          value: filterValue
        }
      }
    }
  ];

  var layout = { width: 700, height: 400, margin: { t: 0, b: 0 } };
  Plotly.newPlot("gauge", gdata, layout);
}
