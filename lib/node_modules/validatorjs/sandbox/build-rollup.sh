#!/usr/bin/env bash

source ./scripts/messenger.sh

# clean directory
rm -rf dist
mkdir dist

printf "\n"
success "Linting..."
npm run lint
npm run lint:spec

printf "\n"
./scripts/todo.js
success "Creating TODOs...\n"

printf "\n"
success "Building...\n"
./node_modules/.bin/rollup -c rollup.config.js
cp -r src/lang dist
printf "\n"

success "Build Process Complete" " SUCCESS "