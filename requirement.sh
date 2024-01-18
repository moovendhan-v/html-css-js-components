#!/bin/bash

# Update npm globally
npm install -g npm@10.3.0

# Install Vite as a development dependency
npm install --save-dev vite

npm install --include=dev

npm install tailwindcss postcss autoprefixer

npm install react-router-dom

yarn add  @tabler/icons-react

# Install both development and production dependencies
npm install
