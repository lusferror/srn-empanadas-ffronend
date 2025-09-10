const form = document.getElementById('formEmpanada');
const addIngredientBtn = document.getElementById('add-ingredient-btn');
const isSoldOutDiv = document.getElementById('isSoldOutDiv');
const priceInput = document.getElementById('price');
let typeForm = 'create';

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitEmpanada(typeForm)
  });
}

if (addIngredientBtn) {
  addIngredientBtn.addEventListener('click', () => {
    addIngredient();
  });
}

if (priceInput) {
  priceInput.addEventListener('input', (e) => {
    let value = e.target.value;
    value = value.replace(/[^0-9.,]/g, '');
    value = value.replaceAll(',','.');
    e.target.value = value;
  }
  );
}

/**
 * Submit empanada data to the API
 * @param {string} type - 'create' or 'edit'
 */
async function submitEmpanada(type = 'create') {
  let data = getFormData(form);
  data = sanitizeData(data, type === 'edit');
  const dataJson = JSON.stringify(data);
  const method = type === 'create' ? 'POST' : 'PUT';
  const url = type === 'create' ? API_BASE_URL + '/empanada' : API_BASE_URL + `/empanada/${data.id}`;
  await $.ajax({
    url: url,
    method: method,
    data: dataJson,
    contentType: 'application/json',
    dataType: 'json',
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization', 'Basic ' + basicAuthApi());
    },
    success: function (response) {
      if (response.error) {
        notification({ message: response.message, type: 'error' });
      } else if (response.success) {
        const bsOffcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('offcanvasEmpanada'));
        bsOffcanvas.hide();
        notification({ message: 'Empanada agregada correctamente', type: 'success' });
        form.reset();
        getEmpanadas();
        fillings = [];
        renderIngredients();
        typeForm = 'create';
      }
    },
    error: function () {
      console.error('Error al procesar la solicitud');
      notification({ message: 'Ocurrió un error al procesar la solicitud.', type: 'error' });
    }
  });
}

/**
 * Extract form data into an object
 * @param {HTMLFormElement} form - The form element
 * @return {Object} - The form data as an object
 */
function getFormData(form) {
  const formData = new FormData(form);
  let data = {};
  for (let [key, value] of formData.entries()) {
    data[key] = value;
  }
  return data;
}

function validateData(data) {
  if (!data.name || data.name.trim() === '') {
    alert('El nombre es obligatorio.');
    return false;
  }
  if (isNaN(data.price) || data.price <= 0) {
    alert('El precio debe ser un número positivo.');
    return false;
  }
  if (!data.filling || data.filling.trim() === '') {
    alert('Los ingredientes son obligatorios.');
    return false;
  }
  if (!data.type || (data.type !== 'Frita' && data.type !== 'Horno')) {
    alert('El tipo debe ser "Frita" o "Horno".');
    return false;
  }
  return true;
}

/**
 * Sanitize and prepare data before sending to the API
 * @param {Object} body - The form data
 * @param {boolean} isUpdate - Whether it's an update operation
 * @return {Object} - The sanitized data
 */
function sanitizeData(body, isUpdate = false) {
  body.name = body.name?.replace(/[^a-zA-Z0-9 .,áéíóúÁÉÍÓÚñÑ-]+/g, '')?.toLowerCase()?.trim();
  body.filling = fillings.join(', ');
  body.price = parseInt(body.price);
  if (isUpdate) {
    body.is_sold_out = body.is_sold_out === '1' ? true : false;
  } else {
    body.is_sold_out = false;
  }
  return body;
}

/**
 * this function adds an ingredient to the fillings array and renders the list
 */
function addIngredient() {
  const fillingInput = document.getElementById('filling');
  let filling = fillingInput.value;
  if (!filling || filling.trim() === '') {
    return;
  }
  filling = filling?.replace(/[^a-zA-Z0-9 .,áéíóúÁÉÍÓÚñÑ-]+/g, '')?.toLowerCase()?.trim();
  fillings.push(filling);
  renderIngredients();
}

/**
 * this function removes an ingredient from the fillings array and renders the list
 * @param {number} index - The index of the ingredient to remove
 */
function removeIngredient(index) {
  fillings.splice(index, 1);
  renderIngredients();
}

/** 
 * this function renders the list of ingredients in the offcanvas form
 */
function renderIngredients() {
  const fillingsDiv = document.getElementById('fillings-list');
  fillingsDiv.innerHTML = '';
  const mapFillings = fillings.map((filling, index) => {
    return `
      <div class="d-flex mb-2">
        <input type="text" class="form-control mb-1" value="${filling}" > 
        <button type="button" class="btn btn-danger ms-2" onclick="removeIngredient(${index})">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>`;
  });
  mapFillings.push(`
    <div class="d-flex">
      <input type="text" name="filling" id="filling" class="form-control" >
      <button type="button" class="btn btn-secondary ms-2" id="add-ingredient-btn" onclick="addIngredient()" ><i class="fa-solid fa-plus"></i></button>
    </div>
  `);
  fillingsDiv.innerHTML = mapFillings.join('');
}

/**
 * Open the offcanvas form to edit an empanada
 * @param {number} index - The index of the empanada in the empanadas array
 */
function editEmpanadaOpenForm(index) {
  openForm();
  fillForm(empanadas[index]);
  isSoldOutDiv.classList.remove('d-none');
  const header = document.querySelector('.offcanvas-title');
  header.innerHTML = `
    <i class="fa-solid fa-pen-to-square me-2"></i>
    <span>Editar Empanada</span>
  `;
  typeForm = 'edit';
}

/**
 *  This function edits an empanada in the empanadas array and updates the form
 * @param {number} index - The index of the empanada in the empanadas array
 */
function editEmpanada(index) {
  const empanada = empanadas[index];
}

/**
 * This function opens the offcanvas form for adding a new empanada
 * */
function openForm() {
  const bsOffcanvas = new bootstrap.Offcanvas('#offcanvasEmpanada');
  bsOffcanvas.show();
  const header = document.querySelector('.offcanvas-title');
  header.innerHTML = `
    <i class="fa-solid fa-plus"></i> Agregar Empanada
  `;

  isSoldOutDiv.classList.add('d-none');
  form.reset();
  typeForm = 'create';
}

/**
 * This function fills the offcanvas form with the empanada data
 * @param {Object} data - The empanada data
 * */
function fillForm(data) {
  document.getElementById('id').value = data.id;
  document.getElementById('name').value = data.name;
  document.getElementById('price').value = data.price;
  document.getElementById('type').value = data.type;
  document.getElementById('is_sold_out').value = data.is_sold_out === 1 ? '1' : '0';
  fillings = data.filling && data.filling.length >  0 ? data.filling.split(',').map(f => f.trim()) : [];
  renderIngredients();
}