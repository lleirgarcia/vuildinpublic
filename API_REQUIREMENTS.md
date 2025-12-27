# Requisitos de API para el Frontend

## Endpoints necesarios

### 1. **GET /api/home**
**Descripción:** Datos para la página principal

**Respuesta:**
```json
{
  "buildingProjects": [
    {
      "id": "string",
      "number": "number",
      "title": "string",
      "status": "brainstorming" | "in progress" | "testing" | "shipped",
      "comment": {
        "tiktokHandle": "string",
        "commentText": "string"
      }
    }
  ],
  "shippedProjects": [
    {
      "id": "string",
      "number": "number",
      "title": "string",
      "status": "shipped",
      "comment": {
        "tiktokHandle": "string"
      }
    }
  ],
  "topUsers": [
    {
      "handle": "string",
      "count": "number"
    }
  ],
  "polls": [
    {
      "id": "string",
      "title": "string",
      "description": "string | null",
      "comment": {
        "tiktokHandle": "string",
        "commentText": "string"
      },
      "voteCount": "number"
    }
  ]
}
```

---

### 2. **GET /api/projects**
**Descripción:** Lista de todos los proyectos

**Query params opcionales:**
- `status`: Filtrar por estado (brainstorming, in progress, testing, shipped)
- `limit`: Número de resultados (default: 10)

**Respuesta:**
```json
{
  "projects": [
    {
      "id": "string",
      "number": "number",
      "title": "string",
      "status": "string",
      "createdAt": "string",
      "comment": {
        "id": "string",
        "tiktokHandle": "string",
        "commentText": "string",
        "videoUrl": "string | null"
      }
    }
  ]
}
```

---

### 3. **GET /api/projects/:id**
**Descripción:** Detalle completo de un proyecto

**Respuesta:**
```json
{
  "id": "string",
  "number": "number",
  "title": "string",
  "status": "string",
  "createdAt": "string",
  "changelog": "string | null",
  "spec": {
    "objetivo": "string",
    "alcance": "string",
    "criteriosAceptacion": ["string"],
    "fueraDeAlcance": ["string"]
  },
  "comment": {
    "id": "string",
    "tiktokHandle": "string",
    "commentText": "string",
    "videoUrl": "string | null"
  },
  "videos": [
    {
      "id": "string",
      "title": "string",
      "url": "string",
      "description": "string | null",
      "createdAt": "string"
    }
  ]
}
```

---

### 4. **GET /api/comments**
**Descripción:** Lista de comentarios (para inbox)

**Query params opcionales:**
- `isCandidateToday`: boolean - Filtrar candidatos de hoy
- `limit`: number

**Respuesta:**
```json
{
  "comments": [
    {
      "id": "string",
      "tiktokHandle": "string",
      "commentText": "string",
      "videoUrl": "string | null",
      "isCandidateToday": "boolean",
      "createdAt": "string",
      "hasSpec": "boolean",
      "hasEpisode": "boolean"
    }
  ]
}
```

---

### 5. **GET /api/polls**
**Descripción:** Lista de polls activos

**Respuesta:**
```json
{
  "polls": [
    {
      "id": "string",
      "title": "string",
      "description": "string | null",
      "comment": {
        "tiktokHandle": "string",
        "commentText": "string"
      },
      "voteCount": "number",
      "createdAt": "string"
    }
  ]
}
```

---

### 6. **GET /api/users/top**
**Descripción:** Top 10 usuarios por interacciones

**Respuesta:**
```json
{
  "users": [
    {
      "handle": "string",
      "count": "number"
    }
  ]
}
```

---

## Endpoints de escritura (ya existen, mantener)

### 7. **POST /api/comments**
Crear comentario

### 8. **POST /api/comments/:id/toggle-candidate**
Marcar/desmarcar candidato de hoy

### 9. **POST /api/comments/:id/generate-spec**
Generar spec para comentario

### 10. **POST /api/comments/:id/create-episode**
Crear episodio desde comentario

### 11. **POST /api/polls/vote**
Votar en un poll

### 12. **POST /api/episodes/:id/videos**
Agregar video a episodio (aunque se hará por backoffice)

---

## Resumen de datos necesarios

### Página Home:
- ✅ Proyectos en construcción (con estado)
- ✅ Proyectos terminados
- ✅ Top 10 usuarios
- ✅ Polls activos con conteo de votos

### Página Inbox:
- ✅ Lista de comentarios
- ✅ Estado de cada comentario (tiene spec, tiene proyecto, es candidato)

### Página Project Detail:
- ✅ Proyecto completo
- ✅ Spec parseado
- ✅ Videos embebidos
- ✅ Comentario original

