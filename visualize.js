function visualize(){
  
  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  var audioElement = document.getElementById('audioElement');
  var audioSrc = audioCtx.createMediaElementSource(audioElement);
  var analyser = audioCtx.createAnalyser();
  // Create an analyser node in the Howler WebAudio context
//var analyser = Howler.ctx.createAnalyser();

// Connect the masterGain -> analyser (disconnecting masterGain -> destination)
//Howler.masterGain.connect(analyser);

// Connect the analyser -> destination
//analyser.connect(Howler.ctx.destination);

  // Bind our analyser to the media element source.
  audioSrc.connect(analyser);
  audioSrc.connect(audioCtx.destination);
  //audioSrc.connect(Howler.ctx.destination);
  var frequencyData = new Uint8Array(analyser.frequencyBinCount);
  //var frequencyData = new Uint8Array(200);

  var svgHeight = '300';
  var svgWidth = '1200';
  var barPadding = '1';

  function createSvg(parent, height, width) {
    return d3.select(parent).append('svg').attr('height', height).attr('width', width);
  }

  var svg = createSvg('body', svgHeight, svgWidth);

  // Create our initial D3 chart.
  svg.selectAll('rect')
     .data(frequencyData)
     .enter()
     .append('rect')
     .attr('x', function (d, i) {
        return i * (svgWidth / frequencyData.length);
     })
     .attr('width', svgWidth / frequencyData.length - barPadding);

  // Continuously loop and update chart with frequency data.
  function renderChart() {
     requestAnimationFrame(renderChart);
     //setInterval(renderChart,500);
     // Copy frequency data to frequencyData array.
     //analyser.getByteFrequencyData(frequencyData);
     analyser.getByteTimeDomainData(frequencyData);
     
     //console.log(frequencyData);
     // Update d3 chart with new data.
     svg.selectAll('rect')
        .data(frequencyData)
        .attr('y', function(d) {
           return svgHeight - d;
        })
        .attr('height', function(d) {
           return d;
        })
        .attr('width',10)
        .attr('padding',5)
        .attr('fill', function(d) {
           return 'rgb('+d+','+0+',' + 0 + ')';
        });
  }

  // Run the loop
  renderChart();
  var ctx = document.getElementById("visualizer");
  var myBarChart = new Chart(ctx, {
    type: 'bar',
    data: frequencyData,
    options: options
  });
  function drawViz(){
    myBarChart.data = frequencyData;
  }
}