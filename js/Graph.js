var Chart = require('chart.js');


function MakeGraphGreatAgain() {
    var ctx = document.getElementById('Vente_Graph').getContext('2d')

        var data = {
            labels: ['Janvier', 'Février', 'Mars', 'Avril'],
            datasets: [{
                backgroundColor: 'rgb(144, 12, 63)',
                borderColor: '#00000',
                data: [10, 20, 30, 40, 20],
                label: "Technologique"
            },
            {
                backgroundColor: 'rgb(110, 110, 211)',
                data: [60, 40, 30, 50],
                label: "Alimentaire"
            }]
        }

        var options = {
            title: {
                display: true,
                text: 'Ventes par produits'
            },
            animation: {
                duration: 1000,
                easing: 'easeInQuad'
            }
        }

        var config = {
            type : 'line',
            data: data,
            options: options
        }
        var graph1 = new Chart(ctx, config)
}