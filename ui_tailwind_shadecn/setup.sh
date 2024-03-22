#!/bin/bash

# Install Vite globally if not installed
npm install -g create-vite

npm install vite --save-dev


# Create React app with Vite directly in the current directory
create-vite .

# Move into the newly created project folder
cd my-react-app

# Install dependencies
npm install

# Install Tailwind CSS
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
npx tailwindcss init -p

# Install ShadeCSS
npm install shade-css

# (so you can import "path" without error)
npm i -D @types/node
