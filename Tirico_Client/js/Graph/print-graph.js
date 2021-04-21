var ctx;
var data;
var options;

function Show_Graph() {
    console.log("On montre les graphes");
    Affluence_LineGraph();
    CA_BarGraph();
    MakeVenteLineGraph();
    MakeBarVente();
    MakeAraignee();
    MakeCercle();
    if (lastFunction !== Data_ForMonthly)
    {
        MakeCommun();
        MakeCommunVente();
        MakeCommunCA();
    }
    console.log("on finit de montrer");
}

var graph1;
function Affluence_LineGraph() {
    if (graph1 != null)
    {
        graph1.destroy();
    }

    console.log(datas.length);
    ctx = document.getElementById('Vente').getContext('2d')

    data = {
        labels: Graphe_Label,
        datasets: [{
            backgroundColor: '#2d9ae0',
            borderColor: '#2d9ae0',
            data: datas,
            label: "Personne"
        }]
    };
    options = {
        title: {
            display: true,
            position: 'top',
            fontSize: '18',
            fontFamily: 'Tahoma',
            fontColor: colorTitre,
            fontStyle: 'bold',
            padding: '0',
            lineHeight: '1.5',
            text: titre[0]
        },
        animation: {
            duration: 1000,
            easing: 'easeInQuad'
        }
    };

    graph1 = new Chart(ctx, {
        type: 'line',
        data: data,
        options : options
    });
}
var colorTitre = '#fff';
var graph2; 
function CA_BarGraph()
{
    if (graph2 != null)
    {
        graph2.destroy();
    }
    ctx = document.getElementById('graph5').getContext('2d')
    data = {
        labels: Graphe_Label,
        datasets: [{
            backgroundColor: '#FFC300',
            hoverBackgroundColor: '#fff',
            hoverBorderWidth: '#fff',
            borderColor: 'rgb(255, 99, 132)',
            label: "Chiffre d'affaires en euros (€)",
            data: datas_CA
        }]
    };
    options = {
        title: {
            display: true,
            position: 'top',
            fontSize: '18',
            fontFamily: 'Tahoma',
            fontColor: colorTitre,
            fontStyle: 'bold',
            padding: '0',
            lineHeight: '1.5',
            text: titre[2],
        },
        animation: {
            duration: 1000,
            easing: 'easeInQuad'
        }
    };
    graph2 = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
    });
}

var graphVente;
function MakeVenteLineGraph() {
    if (graphVente != null)
    {
        graphVente.destroy();
    }
    ctx = document.getElementById('graph3').getContext('2d')

    data = {
        labels: Graphe_Label,
        datasets: [{
            backgroundColor: '#900C3F',
            data: datas_ventes,
            label: "Vente"
        }]
    };
    options = {
        title: {
            display: true,
            position: 'top',
            fontSize: '18',
            fontFamily: 'Tahoma',
            fontColor: colorTitre,
            fontStyle:'bold',
            padding: '0',
            lineHeight: '1.5',
            text: titre[1]
        },
        animation: {
            duration: 1000,
            easing: 'easeInQuad'
        }
    };

    graphVente = new Chart(ctx, {
        type: 'line',
        data: data,
        options : options
    });
}

var graphVenteBar; 
function MakeBarVente()
{
    if (graphVenteBar != null)
    {
        graphVenteBar.destroy();
    }
    ctx = document.getElementById('graph6').getContext('2d')

    data = {
        labels: Graphe_Label,
        datasets: [{
            backgroundColor: '#2d9ae0',
            hoverBackgroundColor: '#fff',
            hoverBorderWidth: '#fff',
            borderColor: 'rgb(255, 99, 132)',
            label: 'Nombre de personne',
            data: datas
        },
        {
            backgroundColor: '#900C3F',
            hoverBackgroundColor: '#fff',
            hoverBorderWidth: '#fff',
            borderColor: 'rgb(255, 99, 132)',
            label: 'Nombre de produits vendus',
            data: datas_ventes
        },
        {
            backgroundColor: '#FFC300',
            hoverBackgroundColor: '#fff',
            hoverBorderWidth: '#fff',
            borderColor: 'rgb(255, 99, 132)',
            label: "Chiffre d'affaires",
            data: datas_CA
        }
    ]
    };
    options = {
        title: {
            display: true,
            position: 'top',
            fontSize: '18',
            fontFamily: 'Tahoma',
            fontColor: colorTitre,
            fontStyle:'bold',
            padding: '0',
            lineHeight: '1.5',
            text: "Tous les graphes",
        },
        animation: {
            duration: 1000,
            easing: 'easeInQuad'
        }
    };
    graphVenteBar = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
    });
}

var graph5;
function MakeCercle() {

    var t = [];
    datas.forEach(function(item, index, array) {
        t.push('rgb(' + Math.random() * 255 + ', ' + Math.random() * 255 + ', ' + Math.random() * 255 + ')');
    })


    if (graph5 != null)
    {
        graph5.destroy();
    }
    ctx = document.getElementById('graph2').getContext('2d')

    data = {
        labels: Graphe_Label,
        datasets: [{
            backgroundColor: t,
            borderColor: '#0000',
            data: datas
        }]
    }

    options = {
        title: {
            display: true,
            position: 'top',
            fontSize: '18',
            fontFamily: 'Tahoma',
            fontColor: colorTitre,
            fontStyle:'bold',
            padding: '0',
            lineHeight: '1.5',
            text: titre[0]
        },
        animation: {
            duration: 1000,
            easing: 'easeInQuad'
        }
    }

    graph5 = new Chart(ctx, {
    type: 'polarArea',
    data: data,
    options: options
});
}

var graph6;
function MakeAraignee() 
{
    if (graph6 != null)
    {
        graph6.destroy();
    }
    ctx = document.getElementById('graph4').getContext('2d')

    data = {
        label: 'Vente',
    labels: Graphe_Label,
    datasets: [{
        label: titre[0],
        backgroundColor: '#900C3F',
        borderColor: '#44061E',
        fill: true,
        pointBorderColor: '#fff',
        pointBackgroundColor: '#900C3F',
        data: datas
    }]
}
    options = {
        title: {
            display: true,
            position: 'top',
            fontSize: '18',
            fontFamily: 'Tahoma',
            fontColor: colorTitre,
            fontStyle:'bold',
            padding: '0',
            lineHeight: '1.5',
            text: titre[1]
        },
            animation: {
                duration: 1000,
                easing: 'easeInQuad'
            },
            scale: {
            }
        }

    graph6 = new Chart(ctx, {
        type: 'radar',
        data: data,
        options: options
    });

}


var graphCommun;
function MakeCommun() {
    if (graphCommun != null)
    {
        graphCommun.destroy();
    }
    ctx = document.getElementById('graphCommun').getContext('2d')

    data = {
        labels: Graphe_Label,
        datasets: [{
            backgroundColor: '#2d9ae0',
            hoverBackgroundColor: '#fff',
            hoverBorderWidth: '#fff',
            label: 'Affluence du magasin 0',
            data: datas_magasin[0][0]
        },
        {
            backgroundColor: '#267BB1',
            hoverBackgroundColor: '#fff',
            hoverBorderWidth: '#fff',
            label: 'Affluence du magasin 1',
            data: datas_magasin[1][0]
        },
        {
            backgroundColor: '#175881',
            hoverBackgroundColor: '#fff',
            hoverBorderWidth: '#fff',
            label: "Affluence du magasin 2",
            data: datas_magasin[1][0]
        }
    ]
    };
    options = {
        title: {
            display: true,
            position: 'top',
            fontSize: '18',
            fontFamily: 'Tahoma',
            fontColor: colorTitre,
            fontStyle:'bold',
            padding: '0',
            lineHeight: '1.5',
            text: "Affluence de tous les magasins",
        },
        animation: {
            duration: 1000,
            easing: 'easeInQuad'
        },
        scales : {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };
    graphCommun = new Chart(ctx, {
        type: typeOfGraphicsCommun,
        data: data,
        options: options
    });
}

var graphCommunVente;
function MakeCommunVente() {
    if (graphCommunVente != null)
    {
        graphCommunVente.destroy();
    }
    ctx = document.getElementById('graphCommunVente').getContext('2d')

    data = {
        labels: Graphe_Label,
        datasets: [{
            backgroundColor: '#C31156',
            hoverBackgroundColor: '#fff',
            hoverBorderWidth: '#fff',
            label: 'Vente du magasin 0',
            data: datas_magasin[0][1]
        },
        {
            backgroundColor: '#900C3F',
            hoverBackgroundColor: '#fff',
            hoverBorderWidth: '#fff',
            label: 'Vente du magasin 1',
            data: datas_magasin[1][1]
        },
        {
            backgroundColor: '#630529',
            hoverBackgroundColor: '#fff',
            hoverBorderWidth: '#fff',
            label: "Vente du magasin 2",
            data: datas_magasin[1][1]
        }
    ]
    };
    options = {
        title: {
            display: true,
            position: 'top',
            fontSize: '18',
            fontFamily: 'Tahoma',
            fontColor: colorTitre,
            fontStyle:'bold',
            padding: '0',
            lineHeight: '1.5',
            text: "Ventes de tous les magasins",
        },
        animation: {
            duration: 1000,
            easing: 'easeInQuad'
        },
        scales : {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };
    graphCommunVente = new Chart(ctx, {
        type: typeOfGraphicsCommun,
        data: data,
        options: options
    });
}

var typeOfGraphicsCommun = 'bar';
var graphCommunCA;
function MakeCommunCA() {
    if (graphCommunCA != null)
    {
        graphCommunCA.destroy();
    }
    ctx = document.getElementById('graphCommunCA').getContext('2d')

    data = {
        labels: Graphe_Label,
        datasets: [{
            backgroundColor: '#FFC300',
            hoverBackgroundColor: '#fff',
            hoverBorderWidth: '#fff',
            label: 'CA du magasin 0',
            data: datas_magasin[0][2]
        },
        {
            backgroundColor: '#C99A00',
            hoverBackgroundColor: '#fff',
            hoverBorderWidth: '#fff',
            label: 'CA du magasin 1',
            pointRadius: 0.5,
            data: datas_magasin[1][2]
        },
        {
            backgroundColor: '#867200',
            hoverBackgroundColor: '#fff',
            hoverBorderWidth: '#fff',
            label: "CA du magasin 2",
            data: datas_magasin[1][2]
        }
    ]
    };
    options = {
        title: {
            display: true,
            position: 'top',
            fontSize: '18',
            fontFamily: 'Tahoma',
            fontColor: colorTitre,
            fontStyle:'bold',
            padding: '0',
            lineHeight: '1.5',
            text: "Chiffre d'affaires de tous les magasins",
        },
        animation: {
            duration: 1000,
            easing: 'easeInQuad'
        },
        scales : {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };
    graphCommunCA = new Chart(ctx, {
        type: typeOfGraphicsCommun,
    
        data: data,
        options: options
    });
}