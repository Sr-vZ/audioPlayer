function visualize2(){

var analyser = Howler.ctx.createAnalyser();
Howler.masterGain.connect(analyser);
analyser.connect(Howler.ctx.destination);
var bufferLength = 128; //analyser.frequencyBinCount;
var frequencyData = new Uint8Array(bufferLength);
analyser.getByteTimeDomainData(frequencyData);

      var labelData = new Array(32);
      
      var data = {
        labels:labelData,
        datasets : [
            {
                fillColor : "rgba(255,0,0,0.5)",
                strokeColor : "rgba(255,0,0,1)",
                pointColor : "rgba(255,0,0,1)",
                pointStrokeColor : "#fff",
                backgroundColor:"rgba(255,0,0,0.5)",
                data : frequencyData
            }
            ]
    }
  var options = {
    legend: {
            display: false
         },
    tooltips: {
            enabled: false
         },
    scales: {
    xAxes: [{
                display: false,
                gridLines: {
                    display:false
                }
            }],
    yAxes: [{
                display: false,
                gridLines: {
                    display:false
                }   
            }]
    }
  }
  var ctx = document.getElementById("visualizer");
  var myBarChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: options
  });
  function addData(chart, data) {
    //chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}
  Chart.defaults.global.tooltips.enabled = false;
  function drawViz(){
    //myBarChart.data.datasets.data.push(frequencyData);
    analyser.getByteFrequencyData(frequencyData);
    //analyser.getByteTimeDomainData(frequencyData);
    //addData(myBarChart,frequencyData);
    //myBarChart.data.datasets.data.push(frequencyData);
    myBarChart.update();
    requestAnimationFrame(drawViz);
  }
  drawViz();
}
