var parseDate = d3.timeParse("%Y");

d3.csv("InwonersDilbeek.csv")
  .row(function(d){return {jaar:parseDate(d.jaar),inwoners:Number(d.inwoners.trim())};})
  .get(function(error,data){
  
  console.log(data);
  
  var height = 300;
  var width = 600;
  
  var max = d3.max(data,function(d){return d.inwoners;})
  console.log(max);
  
  var minDate = d3.min(data,function(d){return d.jaar;})
  console.log(minDate);
  var maxDate = d3.max(data,function(d){return d.jaar;})
  console.log(maxDate);
  
  var y = d3.scaleLinear()
      .domain([0,max])
      .range([height,0]);
  
  var x = d3.scaleTime()
      .domain([minDate,maxDate])
      .range([0,width]);
  
  var yAxis = d3.axisLeft(y);
  var xAxis = d3.axisBottom(x);
  
  var svg = d3.select("body").append("svg").attr("height","100%").attr("width","100%");
  
  var margin = {left:50,right:50,top:40,bottom:0};
  
  var chartGroup = svg.append("g")
      .attr("transform","translate("+margin.left+","+margin.top+")");
  
  var line = d3.line().x(function(d){ return x(d.jaar); }).y(function(d){ return y(d.inwoners); });
  
  // Define the div for the tooltip
var div = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);

  chartGroup.append("path").attr("d",line(data));
  chartGroup.append("g").attr("class","x axis").attr("transform","translate(0,"+height+")").call(xAxis);
  chartGroup.append("g").attr("class","y axis").call(yAxis);
  
  // Data line and dots group
    var lineAndDots = chartGroup.append("g")
    		.attr("class", "line-and-dots")
        .attr("transform", "translate(" + ((margin.left + margin.right) / 2) + "," + 0 + ")")

    // Data dots
    lineAndDots.selectAll("line-circle")
    		.data(data)
    	.enter().append("circle")
        .attr("class", "data-circle")
        .attr("r", 8)
        .attr("cx", function(d) { return x(d.jaar-100); })
        .attr("cy", function(d) { return y(d.inwoners); })
        .on("mouseover", function(d) {		
            console.log(d.inwoners);
            document.getElementById("inwoners").innerHTML = d.inwoners;
            })					
        
  
});


  
