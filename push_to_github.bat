@echo off
set "PATH=C:\Program Files\Git\cmd;C:\Program Files\GitHub CLI;%PATH%"
cd /d "%~dp0"

echo Checking git status...
git status
git add tabuada-offer.html .gitignore
git commit -m "feat(checkout): ativa links oficiais de checkout ggCheckout (R$10 e R$27)"
git push origin main
