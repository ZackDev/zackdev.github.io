---
layout: default
title: homepage
---

{% include chart.html %}

<canvas id="corona_germany" width="400" height="400"></canvas>

<script>
  var context = document.getElementById('corona_germany').getContext('2d');
  var coronachart = new Chart(context, {
    type: 'line',
    data: {
      labels: ['1', '2', '3'],
      datasets: [{
        label: 'corona confirmed',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [1,2,3]
      }]
    },
    options: {}
  });
</script>
build date: {{ site.time }}
