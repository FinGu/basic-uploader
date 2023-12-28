#!/bin/sh
npx tsc
cp -r src/views/ build/views/
mkdir build/assets
cp -r node_modules/bootstrap/ build/assets/bootstrap/
