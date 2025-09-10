<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8">
  <title>Empanaadas Chilenas</title>
  <meta name="description" content="The small framework with powerful features">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="shortcut icon" type="image/png" href="/favicon.ico">
  <title>Gestión de Empanadas Chilenas</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
  <style>
    body {
      background: linear-gradient(135deg, #181c1f 0%, #23272b 100%);
      color: #f1f1f1;
      min-height: 100vh;
    }

    .navbar-admin {
      background: #23272b;
      color: #fff;
      border-bottom: 1px solid #343a40;
    }

    .navbar-admin h1 {
      font-weight: bold;
      letter-spacing: 2px;
      color: #fff;
    }

    .main-card {
      background: #23272b;
      border-radius: 1.5rem;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.25);
      margin-top: 1.5rem;
    }

    .shadow {
      box-shadow: 0 2px 8px rgba(44, 62, 80, 0.12) !important;
    }

    .rounded-3 {
      border-radius: 1rem !important;
    }
  </style>
</head>

<body>
  <?= $this->include('partials/header') ?>
  <?= $this->include('partials/toasts') ?>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-2 d-none d-md-block pb-0 mb-2 mb-md-0">
        <div class="main-card pt-3 h-100">
          <?= $this->include('partials/chart') ?>
        </div>
      </div>
      <div class="col-md-10 col-12 pe-3">
        <div class="main-card pt-3 h-100 pb-0">
          <?= $this->include('partials/table') ?>
        </div>
      </div>
    </div>
  </div>
  <?= $this->include('partials/offcanvas') ?>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/js/all.min.js"></script>
  <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
  <script>
    const API_BASE_URL = <?= json_encode(env('API_BASE_URL')) ?>;
    const BASIC_AUTH_USER = <?= json_encode(env('BASIC_AUTH_USER')) ?>;
    const BASIC_AUTH_PASSWORD = <?= json_encode(env('BASIC_AUTH_PASSWORD')) ?>;
    let empanadas = <?= json_encode($empanadas) ?>;
    let fillings = [];
    let pageSize = 8;
    let empanadaChart;
    let empanadaChartPie;
  </script>
  <script src="<?= base_url('js/index.js') ?>"></script>
  <script src="<?= base_url('js/table.js') ?>"></script>
  <script src="<?= base_url('js/offcanvas.js') ?>"></script>
  <script src="<?= base_url('js/chart.js') ?>"></script>
</body>

</html>