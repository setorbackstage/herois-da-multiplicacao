@echo off
set "PATH=C:\Program Files\Git\cmd;C:\Program Files\GitHub CLI;%PATH%"

echo Enabling GitHub Pages on main branch...
gh api --method POST -H "Accept: application/vnd.github+json" /repos/xavier2bit/missao-tabuada/pages -f "build_type=legacy" -f "source[branch]=main" -f "source[path]=/"

echo Checking GitHub Pages status...
gh api /repos/xavier2bit/missao-tabuada/pages
