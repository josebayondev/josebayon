---
title: Tokens opacos
excerpt: cómo hice login sin login
---

Cuando me planteé construir mi propia app de reservas de citas, tuve claro desde el principio lo que no quería: un login típico. Pedirle a alguien que se registre, invente una contraseña y la recuerde solo para reservar una cita de media hora es fricción que no aporta nada — el usuario no quiere una cuenta, quiere reservar, y punto. Quería algo directo.

La alternativa que elegí fue el token opaco. Cuando alguien crea una reserva, el backend genera una cadena aleatoria de 32 bytes (con `secrets.token_urlsafe`, 43 caracteres) que no significa nada por sí misma — no lleva el id de la reserva codificado, no lleva la fecha, no lleva nada que se pueda deducir. Es simplemente la llave. Esa llave es la única forma de acceder a la reserva: no hay usuario, no hay contraseña, no hay sesión que mantener viva. Si tienes el token, tienes acceso; si no lo tienes, no hay forma de adivinarlo ni de enumerar reservas ajenas probando IDs consecutivos, que es justo lo que se evita usando un token aleatorio en vez de un id de base de datos.

Junto al token genero también una referencia legible — algo como `BK-7F3K2Q` — que sí se puede decir en voz alta por teléfono o citar en un email sin regalar el acceso real. El token va en el enlace; la referencia es lo que identifica la reserva de cara a una persona.

## Del token al email

El token que recibe el cliente al reservar le llega por email a través de Resend, con un enlace directo a su reserva. Desde ahí puede cancelarla o reprogramarla sin tener que iniciar sesión en ningún sitio ni recordar nada — el enlace en sí es la autenticación. Cancelar cambia el estado de la reserva sin borrar la fila, para que el histórico siga existiendo, y libera el hueco al instante. Reprogramar reutiliza el mismo token: la reserva sigue siendo la misma fila en base de datos, solo cambia el horario — si generase un token nuevo, el enlace que el cliente ya tiene guardado en su email dejaría de servir justo cuando más lo necesita.

Un token desconocido o mal copiado siempre devuelve el mismo error, nunca uno distinto para "no existe" y otro para "no es tuyo". Dar una respuesta diferente sería un oráculo con el que alguien podría ir probando tokens hasta encontrar uno real.

## Lo que este enfoque me enseñó

Construir esto me hizo pensar en la autenticación de otra forma: no todo necesita usuarios y contraseñas. A veces la pregunta correcta no es "¿cómo verifico quién eres?" sino "¿qué es lo mínimo que necesito para darte acceso a esto y a nada más?". Un token opaco, bien generado y con el alcance justo, puede ser más simple y más seguro que un sistema de cuentas completo para un caso de uso concreto.
