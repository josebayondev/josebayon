---
title: Backend escalable
excerpt: carpetas, endpoints y JSON cortos
---

Para mí, un backend escalable no empieza metiendo Redis o pensando en microservicios desde el primer commit — empieza por cómo organizas las carpetas. Separo desde el principio las rutas, la lógica de negocio, los contratos de entrada/salida y los modelos de base de datos, cada cosa en su sitio: un router no debería saber nada de la base de datos más allá de abrir la sesión, y la lógica que de verdad decide algo debería vivir en funciones puras, sin sesión de base de datos y sin leer el reloj por su cuenta — todo entra por parámetro. Eso permite testear esa lógica sin levantar una base de datos real, y reutilizarla desde otro sitio el día que haga falta, porque ya está desacoplada del framework web.

## Endpoints claros, que piden lo mínimo

Cada endpoint debería pedir exactamente lo que necesita, ni un campo más. Si una acción solo cambia una cosa, el endpoint solo debería aceptar esa cosa — no tiene sentido obligar al cliente a repetir datos que ya existen y no han cambiado. Cuantos menos campos acepta un endpoint, menos validación hace falta y menos formas hay de que el cliente mande algo inconsistente con lo que ya existe.

## Respuestas cortas, mapeadas a propósito

Igual de importante es lo que se devuelve. No uso el mismo esquema de salida para todo: una confirmación no necesita los mismos campos que una vista de detalle, y ninguna de las dos debería devolver datos que el cliente ya tiene o no necesita para pintar esa pantalla concreta. Cada schema de salida se diseña para lo que esa vista necesita mostrar, no para exponer la fila entera de la base de datos.

## Paginación y búsqueda, desde el primer listado

En cualquier panel o listado que construyo intento que nunca traiga todo de golpe: paginar de 50 en 50 (o lo que tenga sentido según el volumen) y permitir buscar directamente contra la base de datos, con un índice detrás, en vez de traer todo y filtrar después en el cliente. Es una de esas cosas que no se nota con pocos registros, pero que decide si un listado sigue siendo rápido cuando hay miles.

Ninguna de estas decisiones es complicada por separado. Lo que las hace importar es que, tomadas desde el principio, evitan tener que reescribir medio backend el día que el tráfico deja de ser cero.
