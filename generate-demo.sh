#! /bin/bash

git checkout -b demo
rm -rf docs
git pull origin main
yarn build --dest docs
git add .
git commit -m "build demo $(date +'%Y%m%d-%H%M%S')"
git push origin demo
git checkout main
rm -rf docs
git branch -D demo
