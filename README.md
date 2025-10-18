# Boleteando

### Ejecutar el npm install para obtner el node_modules con las dependencias
```bash
npm install
```

### Verificar las dependencias necesarias
```bash
npx json-server --version
npm list json-server
npm list jspdf
```

### Si no esta instalado el json-server y jspdf, instalar localmente mediante el comando
```bash
npm install json-server jspdf
```

## PARA EJECUTAR EL PROGRAMA
### Primero ejecutar la base de datos en json
```bash
json-server --watch db.json
```

### Ejecutar el proyecto de angular
```bash
ng serve
```
