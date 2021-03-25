# test_valid


Este proyecto fue realizado con react native y expo.


# Capas
  -La Capa Modelo: 
    Esta capa contiene los servicios, ServiceInteractor y Servicefactory, encargados de la comunicación con la api y el almacenamiento de la base de datos SQLite
  -La Capa de los Controladores:
 Esta capa contiene los controladores de cada componente encargados de contener la lógica y de la comunicación entre la vista y servicios 
  -La Capa de las vistas:
    En esta capa se renderizan los resultados de las peticiones y se pinta la interfaz de usuario 
  
# Estructura del proyecto
  - En la src del proyecto podemos encontrar:
    -   Model: En esta carpeta se encuentran las capas encargadas de abastecer la aplicación de datos 
    -   Controllers: En esta carpeta se encuentran los controladores encargados de la interacción de la vista con los servicios 
    -   Views: En esta carpeta se encuentra la vista y la navegación del proyecto
### Instalación


Es necesario actualizar la key que esta ubicada en el archivo ServiceFactory y se encuentra como apiKeyQuery
Esta aplicación requiere [Node.js](https://nodejs.org/) y expo para funcionar.
Instalar las dependencias y configurar expo para que todo funcione correctamente


```sh
$ npm i
$ expo start
```