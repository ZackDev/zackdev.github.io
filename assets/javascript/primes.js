var primes = [1, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997]
var distances = [1, 2, 2, 2, 4, 2, 4, 2, 4, 6, 2, 6, 4, 2, 4, 6, 6, 2, 6, 4, 2, 6, 4, 6, 8, 4, 2, 4, 2, 4, 14, 4, 6, 2, 10, 2, 6, 6, 4, 6, 6, 2, 10, 2, 4, 2, 12, 12, 4, 2, 4, 6, 2, 10, 6, 6, 6, 2, 6, 4, 2, 10, 14, 4, 2, 4, 14, 6, 10, 2, 4, 6, 8, 6, 6, 4, 6, 8, 4, 8, 10, 2, 10, 2, 6, 4, 6, 8, 4, 2, 4, 12, 8, 4, 8, 4, 6, 12, 2, 18, 6, 10, 6, 6, 2, 6, 10, 6, 6, 2, 6, 6, 4, 2, 12, 10, 2, 4, 6, 6, 2, 12, 4, 6, 8, 10, 8, 10, 8, 6, 6, 4, 8, 6, 4, 8, 4, 14, 10, 12, 2, 10, 2, 4, 2, 10, 14, 4, 2, 4, 14, 4, 2, 4, 20, 4, 8, 10, 8, 4, 6, 6, 14, 4, 6, 6, 8, 6]


Chart.defaults.global.defaultFontFamily = "'Myriad Pro', 'Calibri', Helvetica, sans-serif";
Chart.defaults.global.defaultFontSize = 16;

var cg = document.getElementById('chart_primes').getContext('2d');
var primes_chart = new Chart(cg, {
  type: 'line',
  data: {
    labels: primes,
    datasets: [{
      label: 'primes',
      backgroundColor: 'rgb(00, 144, 255)',
      borderColor: 'rgb(00, 144, 255)',
      data: primes,
      fill: false,
      yAxisID: 'total-y-axis'
    },{
      label: 'distances',
      backgroundColor: 'rgb(46, 46, 46)',
      borderColor: 'rgb(46, 46, 46)',
      data: distances,
      fill: true,
      yAxisID: 'daily-y-axis',
      type: 'bar'
    }]
  },
  options: {
    scales: {
      xAxes: [{
        gridLines: {
          display: false
        }
      }],
      yAxes: [{
        id: 'total-y-axis',
        type: 'linear',
        position: 'left',
        gridLines: {
          display: false
        },
        scaleLabel: {
          display: true,
          labelString: 'primes',
          fontColor: 'rgb(00, 144, 255)'
        }
      },{
        id: 'daily-y-axis',
        type: 'linear',
        position: 'right',
        gridLines: {
          display: false
        },
        scaleLabel: {
          display: true,
          labelString: 'distances',
          fontColor: 'rgb(46, 46, 46)'
        }
      }]
    }
  }
});
