#!/usr/bin/env bash

set -e

yarn lint
yarn build

cd dist

git init
git add -A
git commit -m 'Deploy'

git push -f git@github.com:labmap/labmap.github.io.git master
