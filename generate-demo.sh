#! /bin/bash

git checkout -b demo
rm -rf demo
yarn build --dest demo
git add .
git commit -m "build demo $(date +'%Y%m%d-%H%M%S')"
git push
