export interface MiniSpec {
  objetivo: string;
  alcance: string;
  criteriosAceptacion: string[];
  fueraDeAlcance: string[];
}

/**
 * Genera un mini-spec a partir de un comentario de TikTok.
 * Por ahora es MOCK, pero está preparado para ser sustituido por una llamada a LLM.
 */
export async function generateMiniSpec(input: {
  handle: string;
  commentText: string;
}): Promise<MiniSpec> {
  // MOCK: Genera un spec realista basado en el comentario
  // TODO: Sustituir por llamada a LLM (OpenAI, Anthropic, etc.)
  
  const { handle, commentText } = input;
  
  // Extrae palabras clave del comentario para personalizar el spec
  const lowerText = commentText.toLowerCase();
  const hasUI = lowerText.includes('botón') || lowerText.includes('pantalla') || lowerText.includes('interfaz');
  const hasData = lowerText.includes('datos') || lowerText.includes('base de datos') || lowerText.includes('guardar');
  const hasAuth = lowerText.includes('login') || lowerText.includes('usuario') || lowerText.includes('cuenta');
  
  let objetivo = `Implementar la funcionalidad sugerida por ${handle} en el comentario.`;
  let alcance = 'Desarrollo de la feature principal solicitada.';
  let criteriosAceptacion: string[] = [];
  let fueraDeAlcance: string[] = [];
  
  if (hasUI) {
    objetivo = `Crear una interfaz de usuario que permita ${commentText.substring(0, 100)}...`;
    alcance = 'Componente visual funcional con diseño responsive.';
    criteriosAceptacion = [
      'La interfaz se renderiza correctamente en desktop y mobile',
      'Los elementos interactivos responden a las acciones del usuario',
      'El diseño sigue las guías visuales del Laboratorio'
    ];
    fueraDeAlcance = [
      'Optimizaciones avanzadas de rendimiento',
      'Soporte para múltiples idiomas'
    ];
  } else if (hasData) {
    objetivo = `Implementar el sistema de datos para ${commentText.substring(0, 80)}...`;
    alcance = 'Modelo de datos y operaciones CRUD básicas.';
    criteriosAceptacion = [
      'Los datos se persisten correctamente en la base de datos',
      'Las consultas devuelven resultados esperados',
      'No hay pérdida de datos en operaciones concurrentes'
    ];
    fueraDeAlcance = [
      'Sistema de caché avanzado',
      'Migraciones complejas de datos legacy'
    ];
  } else if (hasAuth) {
    objetivo = `Implementar autenticación y gestión de usuarios.`;
    alcance = 'Sistema básico de login y sesiones.';
    criteriosAceptacion = [
      'Los usuarios pueden registrarse e iniciar sesión',
      'Las sesiones se mantienen entre recargas',
      'Las rutas protegidas requieren autenticación'
    ];
    fueraDeAlcance = [
      'Autenticación con OAuth (Google, GitHub, etc.)',
      'Sistema de roles y permisos avanzado'
    ];
  } else {
    // Spec genérico
    objetivo = `Desarrollar la feature propuesta: "${commentText.substring(0, 120)}"`;
    alcance = 'Implementación funcional de la feature solicitada.';
    criteriosAceptacion = [
      'La feature funciona según lo descrito en el comentario',
      'No se introducen regresiones en features existentes',
      'El código sigue las convenciones del proyecto'
    ];
    fueraDeAlcance = [
      'Optimizaciones prematuras',
      'Features adicionales no mencionadas en el comentario'
    ];
  }
  
  return {
    objetivo,
    alcance,
    criteriosAceptacion,
    fueraDeAlcance
  };
}

