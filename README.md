# Aplicación de Gestión de Usuarios con Autenticación

Esta aplicación permite gestionar usuarios, autenticar, registrar, actualizar perfiles y eliminar cuentas. Está construida utilizando **Node.js**, **Express**, **Passport.js** para la autenticación de usuarios y **MongoDB** para almacenar los datos de los usuarios.

## Características

- **Registro e Inicio de sesión de Usuario**: Los usuarios pueden crear una cuenta, iniciar sesión y mantener su sesión activa entre peticiones.
- **Autenticación mediante Google**: Los usuarios pueden autenticarse utilizando su cuenta de Google.
- **Gestión de Perfil**: Los usuarios pueden ver y actualizar los detalles de su perfil (nombre, apellido, correo electrónico).
- **Eliminación de Cuenta**: Los usuarios pueden eliminar su cuenta y todos los datos asociados (por ejemplo, el carrito de compras).
- **Gestión de Sesiones**: Las sesiones de usuario se gestionan mediante `express-session` para mantener la autenticación en múltiples peticiones.

## Stack Tecnológico

- **Backend**: Node.js, Express.js
- **Autenticación**: Passport.js (estrategia local, OAuth de Google)
- **Base de Datos**: MongoDB (a través de Mongoose)
- **Gestión de Sesiones**: express-session
- **Generación de Tokens**: JWT (JSON Web Tokens)
- **Seguridad**: bcrypt para el hash de contraseñas
- **Variables de Entorno**: dotenv para gestionar datos sensibles (por ejemplo, la clave secreta de la sesión)

## Configuración

### Requisitos Previos

1. **Node.js** (v16 o superior)
2. **MongoDB** (instancia local o en la nube)
3. **Credenciales de OAuth de Google** para la autenticación con Google (si se desea usar inicio de sesión con Google)

### Instalación

1. Clona este repositorio en tu máquina local:

  ```bash
    git clone https://github.com/DavidJulianLongo/PreEntrga-Backend2-70355.git

    cd PreEntrga-Backend2-70355
    ```
2. Instala las dependencias:

    ```bash
    npm install
    ```

3. Crea un archivo `.env` en la raíz del proyecto y agrega las siguientes variables:

    ```plaintext
    SESSION_SECRET=tu_clave_secreta
    MONGO_URI=mongodb://localhost:27017/e-commerce
    GOOGLE_CLIENT_ID=tu_google_client_id
    GOOGLE_CLIENT_SECRET=tu_google_client_secret
    JWT_SECRET=tu_jwt_secret
    ```

4. Ejecuta la aplicación:

    ```bash
    npm run dev
    ```

    Esto iniciará el servidor con recarga en vivo.

## Endpoints

### Autenticación

- **POST /register**
    - Registra un nuevo usuario.

- **POST /login**
    - Autentica al usuario y genera un token JWT.

- **GET /google**
    - Inicia el proceso de autenticación con Google.

- **GET /google/callback**
    - Callback para la autenticación con Google.
    - Genera un token JWT para el usuario.

### Usuario

- **GET /current**
    - Obtiene el perfil del usuario autenticado.
   
- **PUT /current/update**
    - Actualiza el perfil del usuario autenticado.

- **DELETE /current/delete**
    - Elimina la cuenta del usuario autenticado y todos los datos asociados (como el carrito de compras).

## Middleware

### Autenticación con Passport

- **passportCall**: Middleware utilizado para invocar las estrategias de Passport como `local` para inicio de sesión o `google` para autenticación con Google.
- **authorization**: Middleware para autorizar roles de usuario (por ejemplo, verificando si el usuario está autorizado).

### Seguridad

- **bcrypt** se usa para el hash de contraseñas antes de almacenarlas en la base de datos.
- **express-session** se utiliza para gestionar las sesiones de usuario, manteniéndolos autenticados entre peticiones.

## Uso

1. **Registro**: Los usuarios pueden crear una cuenta enviando una solicitud POST a `/register` con su correo electrónico, contraseña y nombre.
2. **Inicio de sesión**: Los usuarios pueden iniciar sesión enviando una solicitud POST a `/login` con su correo electrónico y contraseña. Si es exitoso, recibirán un token JWT.
3. **Autenticación con Google**: Los usuarios pueden autenticarse mediante su cuenta de Google enviando una solicitud GET a `/google`. Se iniciará el flujo de autenticación de Google y, si es exitoso, el usuario recibirá un token JWT.
4. **Gestión de Perfil**: Los usuarios autenticados pueden ver y actualizar su perfil utilizando los endpoints `/current` y `/current/update`.
5. **Eliminación de Cuenta**: Los usuarios pueden eliminar su cuenta enviando una solicitud DELETE a `/current/delete`.







