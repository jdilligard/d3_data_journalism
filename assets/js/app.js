$(document).ready(function() {


});


// set the dimensions and margins of the graph
var margin = { top: 10, right: 20, bottom: 30, left: 50 },
    width = 800 - margin.left - margin.right,
    height = 620 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");





d3.csv('assets/data/data.csv').then(function(data) {
    console.log(data[0].healthcare);
    var healthcare = data.map(d => d.healthcare);
    var poverty = data.map(d => d.poverty);
    var abbr = data.map(d => d.abbr);
    console.log(abbr)

    // Add X axis
    var x = d3.scaleLinear()
        .domain([0, 25])
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, 25])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // Add dots
    svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function(d) { return x(d.poverty); })
        .attr("cy", function(d) { return y(d.healthcare); })
        .attr("r", 10)
        .attr("stroke", "#32CD32")
        .attr("stroke-width", 1.5)
        .attr("fill", "#FFFFFF");

    var gdots = svg.selectAll("g.dot")
        .data(data)
        .enter().append('g');


});