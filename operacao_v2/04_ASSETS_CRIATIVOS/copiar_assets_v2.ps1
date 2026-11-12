# Script auxiliar para organizar cópias físicas dos assets aprovados em 04_ASSETS_CRIATIVOS/
# Execute a partir da raiz do projeto: D:\downloads backup 2026nov\Criativos

$src = "tabuada-assets"
$dst = "operacao_v2\04_ASSETS_CRIATIVOS"

$folders = @(
  "$dst\01_logos",
  "$dst\02_personagens",
  "$dst\03_capas",
  "$dst\04_paginas_demo",
  "$dst\05_lifestyle_ugc",
  "$dst\06_webapp_legado"
)
foreach ($f in $folders) {
  New-Item -ItemType Directory -Force -Path $f | Out-Null
}

$map = @{
  "$src\logo-transparente.png"             = "$dst\01_logos\"
  "$src\logo-oficial.png"                  = "$dst\01_logos\"
  "$src\heroi-menino-oficial.png"          = "$dst\02_personagens\"
  "$src\heroi-menino-transparente.png"     = "$dst\02_personagens\"
  "$src\heroi-menina-oficial.png"          = "$dst\02_personagens\"
  "$src\monstro-oficial.png"               = "$dst\02_personagens\"
  "$src\capa-missao-tabuada.jpg"           = "$dst\03_capas\"
  "$src\capa-liga-dos-herois.jpg"          = "$dst\03_capas\"
  "$src\conteudo-6.png"                    = "$dst\03_capas\"
  "$src\conteudo-7.png"                    = "$dst\03_capas\"
  "$src\preview_clean_p1_cover.png"        = "$dst\04_paginas_demo\"
  "$src\preview_clean_p3_tracker.png"      = "$dst\04_paginas_demo\"
  "$src\preview_clean_p4_worksheetA.png"   = "$dst\04_paginas_demo\"
  "$src\preview_clean_p43_certificate.png" = "$dst\04_paginas_demo\"
  "$src\mae_brasileira_filtro_barro_2.jpg" = "$dst\05_lifestyle_ugc\"
  "$src\duolingo_app_mapa_screen.png"      = "$dst\06_webapp_legado\"
  "$src\duolingo_app_licao_screen.png"     = "$dst\06_webapp_legado\"
}

foreach ($entry in $map.GetEnumerator()) {
  if (Test-Path $entry.Key) {
    Copy-Item -Path $entry.Key -Destination $entry.Value -Force
    Write-Host "Copiado: $($entry.Key)"
  } else {
    Write-Warning "Nao encontrado: $($entry.Key)"
  }
}
