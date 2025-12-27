# Fundamentos del Laboratorio

## 🎯 El Loop

El Laboratorio funciona como una "máquina de episodios" que transforma comentarios de TikTok en features de software. El ciclo es simple y repetible:

1. **Captura** → Comentarios de TikTok se guardan en el Inbox
2. **Selección** → Los mejores comentarios se marcan como "candidatos de hoy"
3. **Especificación** → Se genera un mini-spec (objetivo, alcance, criterios)
4. **Episodio** → Se crea un episodio con el spec congelado
5. **Desarrollo** → El episodio pasa por estados: Planned → Building → Shipped
6. **Compartir** → La tarjeta shareable se publica con créditos al usuario

## 🔄 Interacción

La interacción con la comunidad es el corazón del Laboratorio:

- **Créditos visibles**: Cada episodio muestra claramente quién lo propuso (`@handle`)
- **Comentario original**: Se preserva el texto exacto del comentario
- **Transparencia**: El proceso completo es visible (spec, changelog, estado)

Esto crea un feedback loop positivo: los usuarios ven que sus comentarios se convierten en realidad, lo que incentiva más participación.

## 📈 Viralidad

El formato está diseñado para ser compartible:

- **Tarjeta visual grande**: Fácil de capturar y compartir en redes
- **Número de episodio**: Crea expectativa y continuidad
- **Frase final**: "Mañana elegimos el siguiente" genera anticipación
- **Export PNG**: Permite compartir fácilmente en TikTok, Twitter, etc.

Cada episodio es una historia completa que se puede contar: "Episodio #5 - Propuesto por @usuario - Shipped". Esto genera contenido orgánico y viral.

## 🔁 Repetición

La clave del éxito es la **consistencia**:

- **Formato fijo**: Todos los episodios siguen la misma estructura
- **Plantilla visual**: La tarjeta shareable siempre tiene el mismo diseño
- **Microcopy repetible**: Frases como "Hoy en el Laboratorio", "Candidatos de hoy", "Propuesto por..."
- **Ritmo predecible**: Los usuarios saben que cada día hay nuevos candidatos y episodios

Esta repetición crea:
- **Expectativa**: Los usuarios saben qué esperar
- **Reconocimiento**: El formato se vuelve familiar y reconocible
- **Escalabilidad**: Es fácil mantener el ritmo porque el proceso está estandarizado

## 🎬 El Efecto "Hago canciones con comentarios"

Similar a cómo algunos creadores hacen canciones basadas en comentarios, el Laboratorio hace **features basadas en comentarios**:

- **Input democratizado**: Cualquiera puede proponer una idea
- **Transformación creativa**: El comentario se convierte en algo más grande (un spec, un episodio, una feature)
- **Crédito y reconocimiento**: El autor original recibe visibilidad
- **Contenido generado por la comunidad**: La comunidad alimenta el producto

## 💡 Principios de diseño

1. **MVP rápido**: 1-3 pantallas máximo, sin complejidad innecesaria
2. **Enfoque en repetibilidad**: Formato fijo, plantilla consistente
3. **Sin fricción**: No hay autenticación, captura manual simple
4. **Preparado para escalar**: El generador de specs es intercambiable (mock → LLM real)
5. **Visual y shareable**: La tarjeta es el producto final, no solo la feature

## 🚀 El futuro

El Laboratorio está diseñado para crecer:

- **IA real**: Sustituir el mock por una LLM que genere specs reales
- **Integración con TikTok**: Scraping automático (cuando sea posible)
- **Autenticación**: Para usuarios que quieran trackear sus propuestas
- **Analytics**: Ver qué tipos de comentarios generan más engagement

Pero siempre manteniendo el loop simple y repetible que hace que funcione.

