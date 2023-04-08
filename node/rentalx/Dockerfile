# Selecione a imagem que vai ser baixada no container 
FROM node

# Defina um diretório de trabalho para armazenar as 
# informações do projeto.
WORKDIR /usr/app

# Copie o arquivo com as dependências para o diretório
# WORKDIR, basta colocar o caminho para o arquivo.
COPY package.json ./

# Instale as dependências dentro do container. Use npm!
RUN npm install

# Copie todo o projeto para o WORKDIR, lembre-se de 
# não copiar o node_modules, .git e .vscode, adicione
# essas pastas no arquivo .dockerignore
COPY . .
# O primeiro ponto é para copiar tudo, o segundo representa a pasta WORKDIR

# Exponha a porta que o seu projeto está usando
EXPOSE 3333

# Ative o CMD para que seja possível rodar alguns comandos
# Os comando tem ques está dentro de um array, cada espaço é separado
# por virgula e o comando continua na próxima posição do array
CMD ["npm", "run", "dev"]