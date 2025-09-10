<style>
  .spineer-table {
    position: relative;
    top: 50%;
    left: 50%;
    width: 4rem;
    height: 4rem;
  }
</style>
<div class="fs-4 fw-semibold px-3">
  <i class="fa-solid fa-table"></i>
  Lista de Empanadas
</div>
<div class="table-height py-1 px-3 rounded table-responsive" id="tableContainer" style="height: 450px;">
  <div class="spinner-border text-info spineer-table fs-2 d-none" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
  <table class="table table-striped rounded-3 overflow-hidden shadow" id="empanadaTable">
    <thead class="table-dark">
      <tr>
        <th><i class="fa-solid fa-signature"></i> Nombre</th>
        <th><i class="fa-solid fa-tags"></i> Tipo</th>
        <th><i class="fa-solid fa-dollar-sign"></i> Precio</th>
        <th><i class="fa-solid fa-bacon"></i> Ingredientes</th>
        <th><i class="fa-solid fa-ban"></i> Agotado </th>
        <th><i class="fa-solid fa-gear"></i> Acciones</th>
      </tr>
    </thead>
    <tbody>
      <?php if (isset($empanadas) && count($empanadas) > 0): ?>
        <?php foreach ($empanadas as $index => $empanada): ?>
          <?php if ($index < 8): ?>
            <tr>
              <td><?= strtoupper(esc($empanada['name'])) ?></td>
              <td>
                <?php if ($empanada['type'] == 'Frita'): ?>
                  <span class="badge bg-warning text-dark">Frita</span>
                <?php else: ?>
                  <span class="badge bg-danger text-white"><?= esc($empanada['type']) ?>
              </td>
            <?php endif; ?>
            <td>$<?= number_format($empanada['price'], 2, ',', '.') ?></td>
            <td>
              <?php foreach (explode(',', $empanada['filling']) as $ingrediente): ?>
                <span class="badge bg-secondary lower"><?= strtolower(esc($ingrediente)) ?></span>
              <?php endforeach; ?>
            </td>
            <td align="center">
              <?php if ($empanada['is_sold_out'] == 1): ?>
                <span class="badge bg-danger text-white">Si</span>
              <?php else: ?>
                <span class="badge bg-success text-white">No
            </td>
          <?php endif; ?>
          </td>
          <td align="center">
            <button type="button" title="Editar" class="btn btn-warning btn-sm icon-btn" id="button-edit-<?= esc($empanada['id']); ?>" onclick="editEmpanadaOpenForm(<?= $index ?>)"><i class="fa-solid fa-pen-to-square"></i></button>
            <button type="button" title="Eliminar" class="btn btn-danger btn-sm icon-btn" id="button-delete-<?= esc($empanada['id']); ?>" onclick="deleteEmpanda(<?= esc($empanada['id']) ?>)"><i class="fa-solid fa-trash"></i></button>
          </td>

            </tr>
          <?php endif; ?>
        <?php endforeach; ?>
      <?php else: ?>
        <tr>
          <td colspan="4" class="text-center">No hay empanadas registradas.</td>
        </tr>
      <?php endif; ?>
    </tbody>
  </table>
</div>
<nav aria-label="..." class="pt-1 mb-0">
  <ul class="pagination bg-dark rounded justify-content-center mb-0" id="pagination">
    <?php for ($i = 1; $i <= ceil(count($empanadas) / 8); $i++): ?>
      <li class="page-item"><a class="page-link text-white bg-dark border-secondary border-3" onclick="goToPage(<?= $i ?>)"><?= $i ?></a></li>
    <?php endfor; ?>
  </ul>
</nav>