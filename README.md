# Development
Pasos para levantar la app en desarrollo

1. levantar la bases de datos 
```
docker compose up -d (detached)
```
2. crear una copia de .env-template y renombrarlo a .env

3. Renombrar las variables de entorno

4. Reemplazar las variables de entorno

5. intalar los node.modules ```npm install```

6. ejecutar:

# Prisma commands

```
npx prisma init
npx prisma migrate dev
npx prisma generate
```

6. Ejecutar el seed para [crear la base de datos](http://localhost:3000/api/seed)

# Nota `Usuario por defecto` 
    usuario: isaac@google.com
    clave: 123456


# Produccion

# Stage# API---Rest-Todos.NXJS
