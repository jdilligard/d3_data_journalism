$(document).ready(function() {


});


// set the dimensions and margins of the graph
var margin = { top: 100, right: 5, bottom: 122, left: 60 },
    width = 1500 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

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
    var healthcare = parseFloat(data.map(d => d.healthcare));
    var poverty = parseFloat(data.map(d => d.poverty));
    var abbr = data.map(d => d.abbr);
    console.log(data)

    // Add X axis
    var x = d3.scaleLinear()
        .domain([8, 28])
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
        .attr("r", 11)
        .attr("stroke", "blue")
        .attr("stroke-width", 1.5)
        .attr("fill", "red");




    //

    svg.selectAll("text") // Note "text", not "circle" or "rect"
        .data(data)
        .enter()
        .append("text") // Same here!
        .text(function(d) {
            return d.abbr;
        })
        .attr("x", function(d) { return x(d.poverty) - 8; })
        .attr("y", function(d) { return y(d.healthcare - 0.2); })
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "white");



    //
    //xaxis labels
    svg.append("text")
        .attr("transform",
            "translate(" + (width / 2) + " ," +
            (height + margin.top - 40) + ")")
        .attr("font-size", "30px")
        .style("text-anchor", "middle")
        .text("My Data");

    //yaxis labels
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -10 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("font-size", "30px")

    .style("text-anchor", "middle")
        .text("Value");

    svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "36px")
        .style("text-decoration", "underline")
        .text("Value vs Date Graph");





});