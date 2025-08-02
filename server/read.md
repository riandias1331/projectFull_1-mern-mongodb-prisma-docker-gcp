// Docker
Create dockerfile:

        FROM node:latest 

        WORKDIR /app

        COPY . .

        # Remove a pasta node_modules se existir, para evitar conflitos
        RUN rm -rf node_modules
        # Instala as dependências do projeto sem o node_modules
        RUN npm install 

        CMD ["npm", "start"]

        EXPOSE 3333

#
Comands     
docker build -t serverfull .
docker run -dp 3333:3333 --name serverfull serverfull
docker ps
docker ps -a


docker start serverfull