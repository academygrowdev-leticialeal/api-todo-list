FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

# NÃO É OBRIGATÓRIO - APENAS DOC
## EXPOSE 3000 

CMD ["npm", "run", "dev"]