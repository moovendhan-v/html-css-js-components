FROM node:latest

# Set working directory
WORKDIR /ui_tailwind_shadecn

COPY ui_tailwind_shadecn/package*.json ./

RUN npm install --force


RUN npm install -g vite


EXPOSE 5173

CMD ["vite", "--host", "0.0.0.0"]
