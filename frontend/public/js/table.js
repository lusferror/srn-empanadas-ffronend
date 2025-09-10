/**
 * Delete an empanada by ID
 * @param {number} id - ID of the empanada to delete
 */
async function deleteEmpanda(id) {
  await $.ajax({
    url: API_BASE_URL + '/empanada/' + id,
    type: 'DELETE',
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization', 'Basic ' + basicAuthApi());
    },
    success: async function (result) {
      if (result.error) {
        notification({ message: result.message, type: 'error' });
        return;
      }
      notification({ message: 'Empanada eliminada correctamente', type: 'warning' });
      getEmpanadas();
    },
    error: function (xhr, status, error) {
      console.error('Error al eliminar la empanada:', error);
      notification({ message: 'Error al eliminar la empanada', type: 'error' });
    },
  })
}

/**
 *  Fetch empanadas from the API
 */
async function getEmpanadas() {
  tableLoading(true);
  setTimeout(() => {
    tableLoading(false);
  }, 1000);
  await $.ajax({
    url: API_BASE_URL + '/empanadas',
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization', 'Basic ' + basicAuthApi());
    },
    type: 'GET',
    success: function (data) {
      if (data.error) {
        notification({ message: data.message, type: 'error' });
        return;
      }
      empanadas = data.empanadas;
      const empanadasPage1 = paginateEmpanadas(empanadas, 1, pageSize);
      renderTable(empanadasPage1);
      generateAllCharts();
      refreshPagination();
    },
    error: function (xhr, status, error) {
      console.error('Error al obtener las empanadas:', error);
      notification({ message: 'Error al obtener las empanadas', type: 'error' });
    }
  });
}

/**
 * Render the empanadas table
 * @param {Array} empanadas - Array of empanada objects
 * 
 */
function renderTable(empanadas) {
  const tableBody = $('#empanadaTable tbody');
  tableBody.empty();
  empanadas.forEach((empanada,index ) => {
    const row = `
      <tr>
        <td>${empanada.name?.toUpperCase()}</td>
        <td>${typeBadge(empanada.type)}</td>
        <td>${formatNumber(empanada.price)}</td>
        <td>${fillingBadgeds(empanada.filling)}</td>
         <td align="center">
              <span class="badge bg-${empanada.is_sold_out ? 'danger' : 'success' } text-white">${empanada.is_sold_out ? 'Si' : 'No' }</span>
        </td>
        <td align="center">
          <button type="button" title="Editar" class="btn btn-warning btn-sm icon-btn" id="button-edit-<?= esc($empanada['id']); ?>" onclick="editEmpanadaOpenForm(${index})"><i class="fa-solid fa-pen-to-square"></i></button>
          <button type="button" title="Eliminar" class="btn btn-danger btn-sm icon-btn" id="button-delete-<?= esc($empanada['id']); ?>" onclick="deleteEmpanda(${empanada.id})"><i class="fa-solid fa-trash"></i></button>
        </td>
      </tr>
    `;
    tableBody.append(row);
  });
}

/**
 * This function shows or hides the table loading spinner
 * @param {boolean} show 
 */
function tableLoading(show) {
  const spinner = document.querySelector('.spineer-table');
  const table = document.getElementById('empanadaTable');
  const container = document.getElementById('tableContainer');
  if (show) {
    spinner.classList.remove('d-none');
    table.classList.add('d-none');
    container.classList.add('bg-dark', 'bg-opacity-75');
  } else {
    spinner.classList.add('d-none');
    table.classList.remove('d-none');
    container.classList.remove('bg-dark', 'bg-opacity-75');
  }
}

/**
 * Convert a comma-separated filling string into Bootstrap badges
 * @param {string} filling - Comma-separated filling string
 * @return {string} - HTML string with Bootstrap badges
 * */
function fillingBadgeds(filling) {
  if(!filling || filling.length === 0) return '';
  const fillings = filling.split(',').map(f => f.trim());
  let badges = '';
  fillings.forEach(f => {
    badges += `<span class="badge bg-secondary text-white me-1">${f?.toLowerCase()}</span>`;
  });
  return badges;
}

/**
 * Get a Bootstrap badge for the empanada type
 * @param {string} type - Type of the empanada ('Frita' or 'Horno')
 * @return {string} - HTML string with Bootstrap badge
 * */
function typeBadge(type) {
  let badgeClass = 'bg-secondary';
  let badgeText = 'text-dark';
  if (type?.toLowerCase() === 'frita'){
    badgeClass = 'bg-warning';
    badgeText = 'text-dark';
  } 
  if (type?.toLowerCase() === 'horno'){
    badgeClass = 'bg-danger';
    badgeText = 'text-white';
  } 
  return `<span class="badge ${badgeClass} text-${badgeText}">${type}</span>`;
}

/**
 * Paginate empanadas array
 * @param {Array} empanadas - Array of empanada objects
 * @param {number} page - Current page number (1-based)
 * @param {number} pageSize - Number of items per page
 * @returns {Array} - Paginated empanadas for the current page
 */
function paginateEmpanadas(empanadas, page, pageSize) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return empanadas.slice(start, end);
}


function goToPage(page) {
  const paginatedEmpanadas = paginateEmpanadas(empanadas, page, pageSize);
  renderTable(paginatedEmpanadas);
}

function refreshPagination() {
  const totalPages = Math.ceil(empanadas.length / pageSize);
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';
  for (let i = 1; i <= totalPages; i++) {
    const pageItem = `
      <li class="page-item">
        <a class="page-link text-white bg-dark border-secondary border-3" href="#" onclick="goToPage(${i}); currentPage=${i}; refreshPagination();">${i}</a>
      </li>
    `;
    pagination.innerHTML += pageItem;
  }
  if (totalPages === 0) {
    pagination.innerHTML = '<li class="page-item disabled"><span class="page-link">1</span></li>';
  }
  document.getElementById('totalPages').innerText = totalPages;
  document.getElementById('currentPage').innerText = currentPage;
}