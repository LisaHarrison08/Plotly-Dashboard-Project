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

      demoInfo(names[0]);
    });
  }
  //Names added to the dropdown
  init();

  d3.selectAll("#selDataset").on("change", dashFunctions);

  // Function to initiate plots
  function dashFunctions() {
    var testSubject = d3.select("#selDataset").node().value;
    demoInfo(testSubject);
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
// Use otu_labels as the hovertext for the chart