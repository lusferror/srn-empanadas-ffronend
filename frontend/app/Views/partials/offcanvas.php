<div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasEmpanada" aria-labelledby="offcanvasEmpanadaLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasEmpanadaLabel"><i class="fa-solid fa-plus"></i> Agregar Empanada</h5>
    <button type="button" class="btn-close btn-close-black" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    <form id="formEmpanada" method="post" action="<?= site_url('empanadas/guardar') ?>">
      <div class="mb-3 d-none" id="idEmpanda">
        <label for="id" class="form-label">Nombre</label>
        <input type="text" name="id" id="id" class="form-control">
      </div>
      <div class="mb-3">
        <label for="nombre" class="form-label">Nombre</label>
        <input type="text" name="name" id="name" class="form-control" required>
      </div>
      <div class="mb-3">
        <label for="precio" class="form-label">Precio</label>
        <input name="price" id="price" class="form-control" required min="0">
      </div>
      <div class="mb-3">
        <label for="ingredientes" class="form-label">Ingredientes</label>
        <div class="mb-3" id="fillings-list">
          <div class="d-flex">
            <input type="text" name="filling" id="filling" class="form-control" >
            <button type="button" class="btn btn-secondary ms-2" id="add-ingredient-btn" onclick="addIngredient()"><i class="fa-solid fa-plus"></i></button>
          </div>
        </div>
      </div>
      <div class="mb-3" >
        <label for="tipo" class="form-label">Tipo</label>
        <select name="type" id="type" class="form-select" required>
          <option value="">Seleccione un tipo</option>
          <option value="Frita">Frita</option>
          <option value="Horno">Horno</option>
        </select>
      </div>
      <div class="mb-3" id="isSoldOutDiv">
        <label for="is_sold_out" class="form-label">Agotado</label>
        <select name="is_sold_out" id="is_sold_out" class="form-select">
          <option value="">Seleccione</option>
          <option value="1">Si</option>
          <option value="0">No</option>
        </select>
      </div>
      <button type="submit" class="btn btn-success w-100"><i class="fa-solid fa-save"></i> Guardar</button>
    </form>
  </div>
</div>