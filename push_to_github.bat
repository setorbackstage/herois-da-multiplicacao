@echo off
set "PATH=C:\Program Files\Git\cmd;C:\Program Files\GitHub CLI;%PATH%"
cd /d "C:\Users\Admin\Downloads\Criativos"

echo Checking git status...
git status

echo Creating repository on GitHub...
gh repo create missao-tabuada --public --source=. --remote=origin --push

echo Checking repo URL...
gh repo view --web
