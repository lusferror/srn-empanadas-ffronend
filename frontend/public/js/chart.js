function getTotalType(empanadas, type) {
  if (!Array.isArray(empanadas)) return 0;
  return empanadas.reduce((total, empanada) => {
    return empanada.type?.toLowerCase() === type?.toLowerCase() ? total + 1 : total;
  }, 0);
}

function getTotalIsSoldOut(empanadas, isSoldOut) {
  if (!Array.isArray(empanadas)) return 0;
  return empanadas.reduce((total, empanada) => {
    return +empanada.is_sold_out == +isSoldOut ? total + 1 : total;
  }, 0);
}

function generateChartDonut() {
  let totalFirtas = getTotalType(empanadas, 'frita');
  let totalHorno = getTotalType(empanadas, 'horno');
  const data = {
    labels: ['Fritas', 'Horno'],
    datasets: [{
      data: [totalFirtas, totalHorno],
      backgroundColor: [
        '#ffa726',
        '#e53935',
      ],
      borderWidth: 2,
      borderColor: '#23272b',
    }]
  };
  const config = {
    type: 'doughnut',
    data: data,
    options: {
      plugins: {
        legend: {
          labels: { color: '#f1f1f1', font: { size: 14 } }
        }
      }
    }
  };
  
  if (empanadaChart instanceof Chart) {
    empanadaChart.destroy();
  }

  empanadaChart = new Chart(document.getElementById('empanadaDonut'), config);
}

function generateChartPie() {
  let totalYes = getTotalIsSoldOut(empanadas, 1);
  let totalNo = getTotalIsSoldOut(empanadas, 0);
  const data = {
    labels: ['No', 'Si'],
    datasets: [{
      data: [totalNo, totalYes],
      backgroundColor: [
        '#06a342ff',
        '#e53935',
      ],
      borderWidth: 2,
      borderColor: '#23272b',
    }]
  };
  const config = {
    type: 'pie',
    data: data,
    options: {
      plugins: {
        legend: {
          labels: { color: '#f1f1f1', font: { size: 14 } }
        }
      }
    }
  };

   if (empanadaChartPie instanceof Chart) {
    empanadaChartPie.destroy();
  }
  empanadaChartPie = new Chart(document.getElementById('empanadaPie'), config);
}

function generateAllCharts() {
  generateChartDonut();
  generateChartPie();
}

generateAllCharts();

