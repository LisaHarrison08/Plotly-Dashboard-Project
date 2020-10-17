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
    });
  }
  //Names added to the dropdown
  init();
