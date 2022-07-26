const personagensContador = document.getElementById('personagens');
const luasContador = document.getElementById('luas');
const planetasContador = document.getElementById('planetas');
const navesContador = document.getElementById('naves');


preencherContadores();
preencherTabela();

google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(desenharGrafico);

      async function desenharGrafico() {
        const response = await swapiGet('vehicles/');
        const vehiclesArray = response.data.results;
        console.log(vehiclesArray);
        
        const dataArray = [];
            dataArray.push(["veículos", "Passageiros"]);
            vehiclesArray.forEach((vehicle) => {
                dataArray.push([vehicle.name, Number(vehicle.passengers)]);
            });

        var data = google.visualization.arrayToDataTable(dataArray);

        var options = {
          title: 'Maiores veículos',
          legend: "none"
        };

        var chart = new google.visualization.PieChart(
            document.getElementById('piechart'));

        chart.draw(data, options);
    };

function preencherContadores() {
    Promise.all([
        swapiGet('people/'),
        swapiGet('vehicles/'),
        swapiGet('planets/'),
        swapiGet('starships/'),   
    ]).then(function (results) {
                console.log(results);
                personagensContador.innerHTML = results[0].data.count;
                luasContador.innerHTML = results[1].data.count;
                planetasContador.innerHTML = results[2].data.count;
                navesContador.innerHTML = results[3].data.count;
    });     
}

async function preencherTabela() {
    const response = await swapiGet("films/");
    const tableData = response.data.results;
    console.log(tableData);
    tableData.forEach(function (_Film) {
        $("#filmTable").append(`<tr>
        <td>${_Film.title}</td>
        <td>${moment(_Film.release_date).format('DD/MM/YYYY')}</td>
        <td>${_Film.director}</td>
        <td>${_Film.episode_id}</td>    
        </tr>`);
    });
}

function swapiGet(param) {
    return axios.get(`https://swapi.dev/api/${param}`);
}
