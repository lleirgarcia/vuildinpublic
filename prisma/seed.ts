import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Limpiar datos existentes
  await prisma.vote.deleteMany();
  await prisma.poll.deleteMany();
  await prisma.message.deleteMany();
  await prisma.video.deleteMany();
  await prisma.project.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.user.deleteMany();
  // @ts-expect-error - estado existe en Prisma Client pero TypeScript no lo reconoce aún
  await prisma.estado.deleteMany();
  // @ts-expect-error - socialStat existe en Prisma Client pero TypeScript no lo reconoce aún
  await prisma.socialStat.deleteMany();

  // Crear estados
  // @ts-expect-error - estado existe en Prisma Client pero TypeScript no lo reconoce aún
  const estadoBrainstorming = await prisma.estado.create({
    data: {
      name: 'brainstorming',
      label: 'Brainstorming',
      color: '#60a5fa', // Azul claro para ideas/creatividad
      bgColor: '#0a0a0a',
      borderColor: '#3b82f6', // Azul más intenso para el borde
    },
  });

  // @ts-expect-error - estado existe en Prisma Client pero TypeScript no lo reconoce aún
  const estadoInProgress = await prisma.estado.create({
    data: {
      name: 'in progress',
      label: 'In Progress',
      color: '#fbbf24', // Amarillo/naranja para trabajo activo
      bgColor: '#0a0a0a',
      borderColor: '#f59e0b', // Naranja más intenso para el borde
    },
  });

  // @ts-expect-error - estado existe en Prisma Client pero TypeScript no lo reconoce aún
  const estadoTesting = await prisma.estado.create({
    data: {
      name: 'testing',
      label: 'Testing',
      color: '#a78bfa', // Púrpura para pruebas
      bgColor: '#0a0a0a',
      borderColor: '#8b5cf6', // Púrpura más intenso para el borde
    },
  });

  // @ts-expect-error - estado existe en Prisma Client pero TypeScript no lo reconoce aún
  const estadoShipped = await prisma.estado.create({
    data: {
      name: 'shipped',
      label: 'Shipped',
      color: '#34d399', // Verde para completado/éxito
      bgColor: '#0a0a0a',
      borderColor: '#10b981', // Verde más intenso para el borde
    },
  });

  // @ts-expect-error - estado existe en Prisma Client pero TypeScript no lo reconoce aún
  const estadoPrepared = await prisma.estado.create({
    data: {
      name: 'prepared',
      label: 'Preparados',
      color: '#60a5fa', // Azul para proyectos preparados/aceptados
      bgColor: '#0a0a0a',
      borderColor: '#3b82f6', // Azul más intenso para el borde
    },
  });

  // Crear estadísticas sociales
  // @ts-expect-error - socialStat existe en Prisma Client pero TypeScript no lo reconoce aún
  await prisma.socialStat.create({
    data: {
      totalFollowers: 125000,
      monthlyGrowth: 12.5, // 12.5%
      weeklyGrowth: 3.2, // 3.2%
      startDate: new Date('2024-01-01'), // Fecha de inicio de buildinpublic
    },
  });

  // Crear comentarios de ejemplo
  const comment1 = await prisma.comment.create({
    data: {
      tiktokHandle: 'vuildinpublic',
      commentText: 'Sería genial tener un botón que permita exportar los datos en formato CSV directamente desde la tabla',
      videoUrl: 'https://tiktok.com/@vuildinpublic/video/123',
      isCandidateToday: true,
      spec: JSON.stringify({
        objetivo: 'Crear una interfaz de usuario que permita Sería genial tener un botón que permita exportar los datos en formato CSV directamente desde la tabla...',
        alcance: 'Componente visual funcional con diseño responsive.',
        criteriosAceptacion: [
          'La interfaz se renderiza correctamente en desktop y mobile',
          'Los elementos interactivos responden a las acciones del usuario',
          'El diseño sigue las guías visuales del Laboratorio'
        ],
        fueraDeAlcance: [
          'Optimizaciones avanzadas de rendimiento',
          'Soporte para múltiples idiomas'
        ]
      })
    }
  });

  const comment2 = await prisma.comment.create({
    data: {
      tiktokHandle: 'techlover',
      commentText: '¿Podrían agregar un sistema de notificaciones en tiempo real cuando hay actualizaciones?',
      videoUrl: null,
      isCandidateToday: true,
      spec: JSON.stringify({
        objetivo: 'Implementar el sistema de datos para ¿Podrían agregar un sistema de notificaciones en tiempo real cuando hay actualizaciones?...',
        alcance: 'Modelo de datos y operaciones CRUD básicas.',
        criteriosAceptacion: [
          'Los datos se persisten correctamente en la base de datos',
          'Las consultas devuelven resultados esperados',
          'No hay pérdida de datos en operaciones concurrentes'
        ],
        fueraDeAlcance: [
          'Sistema de caché avanzado',
          'Migraciones complejas de datos legacy'
        ]
      })
    }
  });

  const comment3 = await prisma.comment.create({
    data: {
      tiktokHandle: 'coderlife',
      commentText: 'Me encantaría ver un modo oscuro que se active automáticamente según la hora del día',
      isCandidateToday: true,
      spec: JSON.stringify({
        objetivo: 'Crear una interfaz de usuario que permita Me encantaría ver un modo oscuro que se active automáticamente según la hora del día...',
        alcance: 'Componente visual funcional con diseño responsive.',
        criteriosAceptacion: [
          'La interfaz se renderiza correctamente en desktop y mobile',
          'Los elementos interactivos responden a las acciones del usuario',
          'El diseño sigue las guías visuales del Laboratorio'
        ],
        fueraDeAlcance: [
          'Optimizaciones avanzadas de rendimiento',
          'Soporte para múltiples idiomas'
        ]
      })
    }
  });

  const comment4 = await prisma.comment.create({
    data: {
      tiktokHandle: 'webdev',
      commentText: 'Sería útil tener un buscador global que funcione en todas las páginas',
      isCandidateToday: false,
    }
  });

  // Crear más comentarios para tener más usuarios en el top
  const comment5 = await prisma.comment.create({
    data: {
      tiktokHandle: 'frontendmaster',
      commentText: '¿Podrían agregar animaciones suaves en las transiciones?',
      isCandidateToday: false,
    }
  });

  const comment6 = await prisma.comment.create({
    data: {
      tiktokHandle: 'fullstackdev',
      commentText: 'Me encantaría ver un sistema de búsqueda avanzada con filtros',
      isCandidateToday: false,
    }
  });

  const comment7 = await prisma.comment.create({
    data: {
      tiktokHandle: 'uiuxdesigner',
      commentText: 'El diseño está genial, pero sería mejor con más espacio en blanco',
      isCandidateToday: false,
    }
  });

  const comment8 = await prisma.comment.create({
    data: {
      tiktokHandle: 'codeenthusiast',
      commentText: '¿Van a agregar soporte para temas personalizados?',
      isCandidateToday: false,
    }
  });

  const comment9 = await prisma.comment.create({
    data: {
      tiktokHandle: 'techinnovator',
      commentText: 'Sería increíble tener integración con GitHub',
      isCandidateToday: false,
    }
  });

  const comment10 = await prisma.comment.create({
    data: {
      tiktokHandle: 'devcommunity',
      commentText: 'Me encanta la idea de building in public!',
      isCandidateToday: false,
    }
  });

  // Crear proyectos de ejemplo
  const project1 = await prisma.project.create({
    data: {
      number: 1,
      title: 'Vuild in public website',
      // @ts-expect-error - estadoId existe en el schema pero TypeScript no lo reconoce aún
      estadoId: estadoShipped.id,
      commentId: comment1.id,
      spec: comment1.spec!,
      changelog: '✅ Plataforma web para building in public\n✅ Sistema de proyectos y votaciones\n✅ Integración con redes sociales\n✅ Dashboard de seguimiento en tiempo real'
    }
  });

  const project2 = await prisma.project.create({
    data: {
      number: 2,
      title: 'Sistema de notificaciones en tiempo real',
      // @ts-expect-error - estadoId existe en el schema pero TypeScript no lo reconoce aún
      estadoId: estadoInProgress.id,
      commentId: comment2.id,
      spec: comment2.spec!,
      changelog: '🚧 En desarrollo:\n- Configuración de WebSockets\n- Componente de notificaciones\n- Integración con backend'
    }
  });

  // Crear proyectos preparados (votados y aceptados)
  const commentPrepared1 = await prisma.comment.create({
    data: {
      tiktokHandle: 'fullstackdev',
      commentText: 'Me encantaría ver un sistema de búsqueda avanzada con filtros',
      isCandidateToday: false,
      spec: JSON.stringify({
        objetivo: 'Implementar un sistema de búsqueda avanzada con múltiples filtros para mejorar la experiencia del usuario',
        alcance: 'Componente de búsqueda con filtros por categoría, fecha, estado y usuario',
        criteriosAceptacion: [
          'Los filtros funcionan correctamente en combinación',
          'La búsqueda es rápida y responsive',
          'Los resultados se actualizan en tiempo real'
        ],
        fueraDeAlcance: [
          'Búsqueda semántica con IA',
          'Historial de búsquedas'
        ]
      })
    }
  });

  const commentPrepared2 = await prisma.comment.create({
    data: {
      tiktokHandle: 'techinnovator',
      commentText: 'Sería increíble tener integración con GitHub',
      isCandidateToday: false,
      spec: JSON.stringify({
        objetivo: 'Integrar la plataforma con GitHub para sincronizar proyectos y commits',
        alcance: 'API de GitHub, autenticación OAuth, sincronización básica de repositorios',
        criteriosAceptacion: [
          'La autenticación con GitHub funciona correctamente',
          'Los repositorios se sincronizan automáticamente',
          'Los commits aparecen en el timeline del proyecto'
        ],
        fueraDeAlcance: [
          'Sincronización bidireccional completa',
          'Gestión de issues y PRs'
        ]
      })
    }
  });

  const project3 = await prisma.project.create({
    data: {
      number: 3,
      title: 'Sistema de búsqueda avanzada con filtros',
      // @ts-expect-error - estadoId existe en el schema pero TypeScript no lo reconoce aún
      estadoId: estadoPrepared.id,
      commentId: commentPrepared1.id,
      spec: commentPrepared1.spec!,
      changelog: '✅ Aceptado y preparado para desarrollo\n✅ Especificaciones completas\n✅ Listo para comenzar'
    }
  });

  const project4 = await prisma.project.create({
    data: {
      number: 4,
      title: 'Integración con GitHub',
      // @ts-expect-error - estadoId existe en el schema pero TypeScript no lo reconoce aún
      estadoId: estadoPrepared.id,
      commentId: commentPrepared2.id,
      spec: commentPrepared2.spec!,
      changelog: '✅ Aceptado y preparado para desarrollo\n✅ Especificaciones completas\n✅ Listo para comenzar'
    }
  });

  // Crear videos de ejemplo para los proyectos
  await prisma.video.createMany({
    data: [
      // Videos para project1 (YouTube, TikTok, Instagram)
      {
        projectId: project1.id,
        title: 'Demo del botón de exportación CSV',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        description: 'Vídeo demostrativo de la funcionalidad',
      },
      {
        projectId: project1.id,
        title: 'Tutorial rápido de exportación',
        url: 'https://www.tiktok.com/@techlover/video/7234567890123456789',
        description: 'Cómo usar la nueva función',
      },
      {
        projectId: project1.id,
        title: 'Sneak peek en Instagram',
        url: 'https://www.instagram.com/p/C1234567890/',
        description: 'Preview de la funcionalidad',
      },
      // Videos para project2 (YouTube, TikTok)
      {
        projectId: project2.id,
        title: 'Sistema de notificaciones - Demo',
        url: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
        description: 'Demostración del sistema en acción',
      },
      {
        projectId: project2.id,
        title: 'Notificaciones en tiempo real',
        url: 'https://www.tiktok.com/@devcreativo/video/7234567890123456790',
        description: 'Vídeo explicativo del proceso',
      },
      {
        projectId: project2.id,
        title: 'Behind the scenes',
        url: 'https://www.instagram.com/reel/C1234567891/',
        description: 'Cómo lo estamos construyendo',
      },
    ],
  });

  // Crear mensajes de ejemplo para tener más usuarios con interacciones
  await prisma.message.createMany({
    data: [
      {
        projectId: project1.id,
        tiktokHandle: 'user1',
        messageText: '¡Increíble feature! Justo lo que necesitaba para mi trabajo diario. 👏',
        likes: 15,
      },
      {
        projectId: project1.id,
        tiktokHandle: 'devfan',
        messageText: 'Me encanta cómo se ve, muy limpio y profesional.',
        likes: 8,
      },
      {
        projectId: project2.id,
        tiktokHandle: 'techlover',
        messageText: 'Estoy súper emocionado por esto! Las notificaciones en tiempo real van a cambiar todo.',
        likes: 23,
      },
      {
        projectId: project2.id,
        tiktokHandle: 'coderlife',
        messageText: '¿Van a soportar también notificaciones push en móvil?',
        likes: 12,
      },
      {
        projectId: project2.id,
        tiktokHandle: 'webdev',
        messageText: 'Excelente trabajo! Esto va a mejorar mucho la UX.',
        likes: 18,
      },
      {
        projectId: project1.id,
        tiktokHandle: 'frontendmaster',
        messageText: 'Las animaciones que mencioné antes estarían perfectas aquí también!',
        likes: 10,
      },
      {
        projectId: project2.id,
        tiktokHandle: 'fullstackdev',
        messageText: 'Esto es exactamente lo que estaba esperando. Gran trabajo equipo!',
        likes: 14,
      },
      {
        projectId: project1.id,
        tiktokHandle: 'uiuxdesigner',
        messageText: 'El diseño es impecable. Felicidades!',
        likes: 9,
      },
      {
        projectId: project2.id,
        tiktokHandle: 'codeenthusiast',
        messageText: '¿Cuándo estará disponible para probar?',
        likes: 11,
      },
      {
        projectId: project1.id,
        tiktokHandle: 'techinnovator',
        messageText: 'Increíble implementación. Esto va a ser muy útil.',
        likes: 13,
      },
      {
        projectId: project2.id,
        tiktokHandle: 'devcommunity',
        messageText: 'Me encanta ver cómo construyen esto en público. Inspirador!',
        likes: 16,
      },
    ],
  });

  // Crear comentarios para los nuevos polls
  const pollComment1 = await prisma.comment.create({
    data: {
      tiktokHandle: 'ai_enthusiast',
      commentText: 'Comprension de comentarios de tiktok via IA',
      isCandidateToday: false,
    },
  });

  const pollComment2 = await prisma.comment.create({
    data: {
      tiktokHandle: 'youtube_creator',
      commentText: 'Obtencion de ideas via youtube video',
      isCandidateToday: false,
    },
  });

  // Crear polls de ejemplo
  const poll1 = await prisma.poll.create({
    data: {
      title: 'Comprension de comentarios de tiktok via IA',
      description: 'Sistema de IA para analizar y comprender comentarios de TikTok',
      commentId: pollComment1.id,
      isActive: true,
    },
  });

  const poll2 = await prisma.poll.create({
    data: {
      title: 'Obtencion de ideas via youtube video',
      description: 'Extracción automática de ideas desde videos de YouTube',
      commentId: pollComment2.id,
      isActive: true,
    },
  });

  // Crear algunos votos de ejemplo
  await prisma.vote.createMany({
    data: [
      { pollId: poll1.id, tiktokHandle: 'user1' },
      { pollId: poll1.id, tiktokHandle: 'techlover' },
      { pollId: poll2.id, tiktokHandle: 'webdev' },
      { pollId: poll2.id, tiktokHandle: 'coderlife' },
    ],
  });

  console.log('✅ Seed completed!');
  // @ts-expect-error - estado existe en Prisma Client pero TypeScript no lo reconoce aún
  console.log(`   - ${await prisma.estado.count()} estados created`);
  // @ts-expect-error - socialStat existe en Prisma Client pero TypeScript no lo reconoce aún
  console.log(`   - ${await prisma.socialStat.count()} social stats created`);
  console.log(`   - ${await prisma.comment.count()} comments created`);
  console.log(`   - ${await prisma.project.count()} projects created`);
  console.log(`   - ${await prisma.message.count()} messages created`);
  console.log(`   - ${await prisma.video.count()} videos created`);
  console.log(`   - ${await prisma.poll.count()} polls created`);
  console.log(`   - ${await prisma.vote.count()} votes created`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

