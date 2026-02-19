// Control de Información - Comprehensive Mock Data
// 2,847+ digital items with complete metadata

import type {
    DashboardMetrics,
    SovereignProfile,
    DigitalItem,
    Source
} from '@/types/controlInfo'

// ============================================================================
// SOVEREIGN IDENTITY PROFILE
// ============================================================================

export const sovereignProfile: SovereignProfile = {
    id: 'profile-001',
    fullName: 'José María González Pérez',
    currentTitle: 'CEO - TechCorp International',
    organization: 'TechCorp International',

    version: '3.2',
    lastUpdated: '2024-01-15',
    verificationHash: 'a8f3d9c2e1b4f7a9c3e8d2f1b5a7c9e4',

    bioShort: 'Líder tecnológico con 15 años de experiencia en transformación digital, IA y blockchain. CEO de TechCorp International, impulsando innovación en América Latina. MBA Stanford, Ingeniero UNAM. Reconocido por Forbes México como uno de los 50 líderes tech más influyentes.',

    bioLong: 'José María González Pérez es CEO de TechCorp International, empresa líder en transformación digital con presencia en 12 países de América Latina. Con más de 15 años de experiencia en el sector tecnológico, ha liderado proyectos de implementación de IA, blockchain y cloud computing para Fortune 500 y gobiernos. Graduado con honores de Ingeniería en Computación por la UNAM y MBA por Stanford University, José María combina expertise técnico con visión estratégica de negocio. Ha sido reconocido por Forbes México como uno de los 50 líderes tech más influyentes, y es conferencista frecuente en eventos internacionales como Web Summit y SXSW. Apasionado por la educación tecnológica, fundó la iniciativa "Code for All" que ha capacitado a más de 10,000 jóvenes en programación.',

    expertise: [
        'Transformación Digital',
        'Inteligencia Artificial',
        'Blockchain',
        'Cloud Computing',
        'Estrategia Empresarial',
        'Innovación Tecnológica'
    ],

    education: [
        {
            degree: 'MBA',
            institution: 'Stanford University',
            year: '2015'
        },
        {
            degree: 'Ingeniería en Computación',
            institution: 'Universidad Nacional Autónoma de México (UNAM)',
            year: '2008'
        }
    ],

    experience: [
        {
            title: 'CEO',
            organization: 'TechCorp International',
            period: '2018 - Presente',
            description: 'Liderando transformación digital en América Latina'
        },
        {
            title: 'VP of Technology',
            organization: 'Global Tech Solutions',
            period: '2015 - 2018',
            description: 'Implementación de soluciones cloud enterprise'
        },
        {
            title: 'Senior Software Architect',
            organization: 'Innovation Labs',
            period: '2010 - 2015',
            description: 'Arquitectura de sistemas distribuidos'
        }
    ],

    officialPhotos: [
        {
            id: 'photo-official-1',
            type: 'photo',
            title: 'Foto Oficial Formal 2024',
            description: 'Foto de perfil profesional, fondo neutro, traje formal',
            fileUrl: '/assets/official/photo-formal-2024.jpg',
            thumbnailUrl: '/assets/official/photo-formal-2024-thumb.jpg',
            approvedContexts: ['Medios de comunicación', 'Eventos corporativos', 'Publicaciones académicas'],
            usageCount: 47,
            dateAdded: '2024-01-15',
            isActive: true
        },
        {
            id: 'photo-official-2',
            type: 'photo',
            title: 'Foto Casual Profesional',
            description: 'Foto informal pero profesional, ambiente de oficina',
            fileUrl: '/assets/official/photo-casual-2024.jpg',
            thumbnailUrl: '/assets/official/photo-casual-2024-thumb.jpg',
            approvedContexts: ['Redes sociales corporativas', 'Blog posts', 'Entrevistas'],
            usageCount: 23,
            dateAdded: '2023-11-20',
            isActive: true
        },
        {
            id: 'photo-official-3',
            type: 'photo',
            title: 'Foto Evento Tech Summit',
            description: 'Presentando en Tech Summit 2023',
            fileUrl: '/assets/official/photo-event-2023.jpg',
            thumbnailUrl: '/assets/official/photo-event-2023-thumb.jpg',
            approvedContexts: ['Eventos tecnológicos', 'Promoción de conferencias'],
            usageCount: 156,
            dateAdded: '2023-09-10',
            isActive: false
        },
        {
            id: 'photo-official-4',
            type: 'photo',
            title: 'Headshot Profesional',
            description: 'Headshot de alta resolución para medios',
            fileUrl: '/assets/official/headshot-2024.jpg',
            thumbnailUrl: '/assets/official/headshot-2024-thumb.jpg',
            approvedContexts: ['Prensa', 'Publicaciones', 'Directorios ejecutivos'],
            usageCount: 89,
            dateAdded: '2024-01-10',
            isActive: true
        },
        {
            id: 'photo-official-5',
            type: 'photo',
            title: 'Foto de Equipo',
            description: 'Con el equipo ejecutivo de TechCorp',
            fileUrl: '/assets/official/team-2023.jpg',
            thumbnailUrl: '/assets/official/team-2023-thumb.jpg',
            approvedContexts: ['Comunicados corporativos', 'Página web empresa'],
            usageCount: 34,
            dateAdded: '2023-12-01',
            isActive: true
        }
    ],

    officialVideos: [
        {
            id: 'video-official-1',
            type: 'video',
            title: 'Presentación Corporativa TechCorp',
            description: 'Video institucional 2024 (2:30 min)',
            fileUrl: '/assets/official/corporate-presentation-2024.mp4',
            thumbnailUrl: '/assets/official/corporate-presentation-2024-thumb.jpg',
            approvedContexts: ['Medios de comunicación', 'Eventos corporativos', 'Uso libre con atribución'],
            usageCount: 12,
            dateAdded: '2024-01-05',
            isActive: true
        },
        {
            id: 'video-official-2',
            type: 'video',
            title: 'Entrevista Bloomberg Technology',
            description: 'Entrevista sobre IA en América Latina (5:45 min)',
            fileUrl: '/assets/official/bloomberg-interview-2023.mp4',
            thumbnailUrl: '/assets/official/bloomberg-interview-2023-thumb.jpg',
            approvedContexts: ['Solo uso editorial autorizado', 'Citas con atribución'],
            usageCount: 8,
            dateAdded: '2023-11-15',
            isActive: true
        },
        {
            id: 'video-official-3',
            type: 'video',
            title: 'Keynote Tech Summit 2023',
            description: 'Conferencia magistral sobre transformación digital (15:20 min)',
            fileUrl: '/assets/official/keynote-tech-summit-2023.mp4',
            thumbnailUrl: '/assets/official/keynote-tech-summit-2023-thumb.jpg',
            approvedContexts: ['Uso libre', 'Educativo', 'Promocional'],
            usageCount: 45,
            dateAdded: '2023-09-20',
            isActive: true
        }
    ],

    officialDocuments: [
        {
            id: 'doc-official-1',
            type: 'document',
            title: 'CV Ejecutivo 2024',
            description: 'Curriculum vitae ejecutivo actualizado',
            fileUrl: '/assets/official/cv-ejecutivo-2024.pdf',
            approvedContexts: ['Solicitudes formales', 'Eventos profesionales'],
            usageCount: 15,
            dateAdded: '2024-01-10',
            isActive: true
        },
        {
            id: 'doc-official-2',
            type: 'document',
            title: 'Bio Oficial ES',
            description: 'Biografía oficial en español',
            fileUrl: '/assets/official/bio-oficial-es.pdf',
            approvedContexts: ['Medios', 'Eventos', 'Publicaciones'],
            usageCount: 67,
            dateAdded: '2024-01-10',
            isActive: true
        },
        {
            id: 'doc-official-3',
            type: 'document',
            title: 'Bio Oficial EN',
            description: 'Biografía oficial en inglés',
            fileUrl: '/assets/official/bio-oficial-en.pdf',
            approvedContexts: ['International media', 'Global events'],
            usageCount: 43,
            dateAdded: '2024-01-10',
            isActive: true
        },
        {
            id: 'doc-official-4',
            type: 'document',
            title: 'Declaración de Principios',
            description: 'Valores y principios de liderazgo',
            fileUrl: '/assets/official/principios.pdf',
            approvedContexts: ['Uso público'],
            usageCount: 12,
            dateAdded: '2023-12-01',
            isActive: true
        },
        {
            id: 'doc-official-5',
            type: 'document',
            title: 'Press Kit Completo',
            description: 'Kit de prensa con fotos, bio, y datos de contacto',
            fileUrl: '/assets/official/press-kit-2024.zip',
            approvedContexts: ['Medios de comunicación', 'Organizadores de eventos'],
            usageCount: 28,
            dateAdded: '2024-01-15',
            isActive: true
        },
        {
            id: 'doc-official-6',
            type: 'document',
            title: 'Certificaciones Profesionales',
            description: 'Certificaciones en IA, Cloud, y Blockchain',
            fileUrl: '/assets/official/certificaciones.pdf',
            approvedContexts: ['Verificación profesional'],
            usageCount: 5,
            dateAdded: '2023-10-01',
            isActive: true
        },
        {
            id: 'doc-official-7',
            type: 'document',
            title: 'Publicaciones Académicas',
            description: 'Lista de papers y publicaciones',
            fileUrl: '/assets/official/publicaciones.pdf',
            approvedContexts: ['Académico', 'Investigación'],
            usageCount: 9,
            dateAdded: '2023-11-01',
            isActive: true
        },
        {
            id: 'doc-official-8',
            type: 'document',
            title: 'Reconocimientos y Premios',
            description: 'Premios y reconocimientos recibidos',
            fileUrl: '/assets/official/reconocimientos.pdf',
            approvedContexts: ['Promocional', 'Medios'],
            usageCount: 18,
            dateAdded: '2024-01-01',
            isActive: true
        }
    ],

    usagePolicy: {
        authorizedUses: [
            'Medios de comunicación con atribución',
            'Eventos corporativos previa solicitud',
            'Publicaciones académicas con permiso',
            'Uso editorial en contexto profesional'
        ],
        unauthorizedUses: [
            'Publicidad comercial sin contrato',
            'Contextos políticos no aprobados',
            'Manipulación de imágenes (deepfakes, ediciones)',
            'Memes o contenido satírico',
            'Uso en productos sin autorización'
        ],
        requiresPermission: true,
        attributionRequired: true,
        commercialUseAllowed: false,
        modificationsAllowed: false,

        contactEmail: 'media@techcorp.com',
        contactPhone: '+52 55 1234 5678',

        termsUrl: 'https://techcorp.com/media-terms',
        licenseType: 'Custom - Requires Permission'
    },

    createdDate: '2022-01-15',
    createdBy: 'admin@techcorp.com'
}

// ============================================================================
// CRITICAL ITEMS (8 items requiring immediate action)
// ============================================================================

export const criticalItems: DigitalItem[] = [
    {
        id: 'item-critical-001',
        type: 'photo',
        title: 'Foto de perfil antigua no autorizada',
        description: 'Imagen desactualizada y no autorizada siendo usada en contexto político sin permiso',
        content: 'Foto de perfil de 2020, desactualizada',
        source: 'Facebook',
        sourceType: 'social_media',
        url: 'https://facebook.com/politicalpage/photo/12345',
        thumbnailUrl: '/assets/items/critical-001-thumb.jpg',
        dateDiscovered: '2024-02-06T14:30:00Z',
        datePublished: '2023-11-15',

        riskScore: 85,
        riskLevel: 'critical',
        status: 'critical',
        category: 'political',

        estimatedViews: 250000,
        estimatedReach: 180000,
        locationsDetected: 3,

        isAuthorized: false,
        isOfficial: false,
        isDeprecated: true,
        hasInconsistency: false,

        tags: ['foto', 'no autorizada', 'política', 'desactualizada'],
        notes: 'Solicitud de takedown enviada hace 48h, sin respuesta',
        lastUpdated: '2024-02-08T10:00:00Z'
    },
    {
        id: 'item-critical-002',
        type: 'document',
        title: 'Escritura de Propiedad filtrada',
        description: 'Documento confidencial filtrado a sitio de noticias con información patrimonial sensible',
        content: 'Escritura Propiedad Residencial X',
        source: 'NoticiasX.com',
        sourceType: 'media',
        url: 'https://noticiasx.com/investigacion/documentos-ejecutivo',
        dateDiscovered: '2024-02-06T08:15:00Z',
        datePublished: '2023-10-02',

        riskScore: 92,
        riskLevel: 'critical',
        status: 'critical',
        category: 'personal',

        estimatedViews: 500000,
        estimatedReach: 350000,
        locationsDetected: 7,

        isAuthorized: false,
        isOfficial: false,
        isDeprecated: false,
        hasInconsistency: false,

        tags: ['documento', 'confidencial', 'filtrado', 'patrimonial'],
        notes: 'Escalado a equipo legal hace 24h',
        lastUpdated: '2024-02-08T09:30:00Z'
    },
    {
        id: 'item-critical-003',
        type: 'video',
        title: 'Video manipulado (deepfake)',
        description: 'Video deepfake con declaraciones falsas circulando en redes sociales',
        content: 'Video manipulado con IA',
        source: 'Twitter',
        sourceType: 'social_media',
        url: 'https://twitter.com/fakeaccount/status/123456',
        thumbnailUrl: '/assets/items/critical-003-thumb.jpg',
        dateDiscovered: '2024-02-07T16:45:00Z',
        datePublished: '2024-02-07',

        riskScore: 95,
        riskLevel: 'critical',
        status: 'critical',
        category: 'political',

        estimatedViews: 120000,
        estimatedReach: 85000,
        locationsDetected: 5,

        isAuthorized: false,
        isOfficial: false,
        isDeprecated: false,
        hasInconsistency: true,

        tags: ['video', 'deepfake', 'manipulado', 'desinformación'],
        notes: 'URGENTE - Takedown en proceso en múltiples plataformas',
        lastUpdated: '2024-02-08T11:00:00Z'
    },
    {
        id: 'item-critical-004',
        type: 'mention',
        title: 'Artículo difamatorio en medio de alto alcance',
        description: 'Artículo con información falsa y difamatoria en medio de circulación nacional',
        content: 'Artículo: "Ejecutivo involucrado en escándalo financiero"',
        source: 'ElDiarioNacional.com',
        sourceType: 'media',
        url: 'https://eldiario.com/economia/escandalo-ejecutivo',
        dateDiscovered: '2024-02-05T12:00:00Z',
        datePublished: '2024-02-05',

        riskScore: 88,
        riskLevel: 'critical',
        status: 'critical',
        category: 'professional',

        estimatedViews: 750000,
        estimatedReach: 500000,
        locationsDetected: 12,

        isAuthorized: false,
        isOfficial: false,
        isDeprecated: false,
        hasInconsistency: true,

        tags: ['artículo', 'difamación', 'falso', 'reputación'],
        notes: 'Demanda por difamación en preparación',
        lastUpdated: '2024-02-08T08:00:00Z'
    },
    {
        id: 'item-critical-005',
        type: 'photo',
        title: 'Foto privada familiar filtrada',
        description: 'Foto privada de evento familiar publicada sin consentimiento',
        content: 'Foto familiar privada',
        source: 'Instagram',
        sourceType: 'social_media',
        url: 'https://instagram.com/p/xyz123',
        thumbnailUrl: '/assets/items/critical-005-thumb.jpg',
        dateDiscovered: '2024-02-07T09:20:00Z',
        datePublished: '2024-02-06',

        riskScore: 82,
        riskLevel: 'critical',
        status: 'critical',
        category: 'personal',

        estimatedViews: 45000,
        estimatedReach: 32000,
        locationsDetected: 2,

        isAuthorized: false,
        isOfficial: false,
        isDeprecated: false,
        hasInconsistency: false,

        tags: ['foto', 'privada', 'familiar', 'violación privacidad'],
        notes: 'Solicitud de eliminación por privacidad enviada',
        lastUpdated: '2024-02-08T10:30:00Z'
    },
    {
        id: 'item-critical-006',
        type: 'document',
        title: 'Contrato confidencial expuesto',
        description: 'Contrato empresarial confidencial publicado en foro de negocios',
        content: 'Contrato TechCorp - Cliente X',
        source: 'ForoNegocios.com',
        sourceType: 'forum',
        url: 'https://foronegocios.com/thread/contrato-techcorp',
        dateDiscovered: '2024-02-06T15:40:00Z',
        datePublished: '2024-02-04',

        riskScore: 87,
        riskLevel: 'critical',
        status: 'critical',
        category: 'corporate',

        estimatedViews: 28000,
        estimatedReach: 15000,
        locationsDetected: 1,

        isAuthorized: false,
        isOfficial: false,
        isDeprecated: false,
        hasInconsistency: false,

        tags: ['documento', 'contrato', 'confidencial', 'corporativo'],
        notes: 'Violación de NDA - acción legal iniciada',
        lastUpdated: '2024-02-08T09:00:00Z'
    },
    {
        id: 'item-critical-007',
        type: 'mention',
        title: 'Mención negativa viral en Twitter',
        description: 'Hilo de Twitter con acusaciones falsas que se volvió viral',
        content: 'Hilo: "La verdad sobre José María González..."',
        source: 'Twitter',
        sourceType: 'social_media',
        url: 'https://twitter.com/account/status/789456',
        dateDiscovered: '2024-02-07T18:00:00Z',
        datePublished: '2024-02-07',

        riskScore: 84,
        riskLevel: 'critical',
        status: 'critical',
        category: 'professional',

        estimatedViews: 320000,
        estimatedReach: 180000,
        locationsDetected: 8,

        isAuthorized: false,
        isOfficial: false,
        isDeprecated: false,
        hasInconsistency: true,

        tags: ['twitter', 'viral', 'acusaciones', 'reputación'],
        notes: 'Preparando respuesta oficial y fact-check',
        lastUpdated: '2024-02-08T11:30:00Z'
    },
    {
        id: 'item-critical-008',
        type: 'photo',
        title: 'Foto usada en publicidad no autorizada',
        description: 'Foto oficial usada en campaña publicitaria sin permiso ni pago',
        content: 'Foto oficial v3.0',
        source: 'PublicidadXYZ.com',
        sourceType: 'website',
        url: 'https://publicidadxyz.com/campana-tech',
        thumbnailUrl: '/assets/items/critical-008-thumb.jpg',
        dateDiscovered: '2024-02-06T11:15:00Z',
        datePublished: '2024-01-20',

        riskScore: 81,
        riskLevel: 'critical',
        status: 'critical',
        category: 'professional',

        estimatedViews: 150000,
        estimatedReach: 95000,
        locationsDetected: 4,

        isAuthorized: false,
        isOfficial: true,
        isDeprecated: false,
        hasInconsistency: false,

        tags: ['foto', 'publicidad', 'no autorizada', 'copyright'],
        notes: 'DMCA takedown + demanda por uso comercial no autorizado',
        lastUpdated: '2024-02-08T10:15:00Z'
    }
]

// ============================================================================
// DASHBOARD METRICS
// ============================================================================

export const dashboardMetrics: DashboardMetrics = {
    totalItems: 2847,
    totalPhotos: 1434,
    totalVideos: 287,
    totalDocuments: 892,
    totalMentions: 521,

    newItemsThisWeek: 12,
    newItemsThisMonth: 47,

    globalRiskScore: 68,
    riskTrend: 'increasing',
    riskChange: 5,

    criticalItems: 8,
    monitoredItems: 28,
    controlledItems: 2811,

    professionalItems: 1278,
    personalItems: 797,
    politicalItems: 427,
    academicItems: 228,
    corporateItems: 117,

    totalEstimatedViews: 2300000,
    totalEstimatedReach: 1650000,

    activeTakedowns: 12,
    pendingRequests: 5,
    activeAlerts: 8,

    exposureTrend: 15,
    lastUpdated: '2024-02-08T15:00:00Z'
}

// ============================================================================
// SOURCES
// ============================================================================

export const sources: Source[] = [
    {
        id: 'source-001',
        name: 'Sitios Web',
        type: 'website',
        url: 'https://various-websites.com',
        itemCount: 847,
        averageRisk: 45,
        isMonitored: true,
        lastScanned: '2024-02-08T12:00:00Z',
        scanFrequency: 'daily',
        canTakedown: true,
        takedownMethod: 'dmca'
    },
    {
        id: 'source-002',
        name: 'Redes Sociales',
        type: 'social_media',
        url: 'https://social-media-platforms.com',
        itemCount: 734,
        averageRisk: 28,
        isMonitored: true,
        lastScanned: '2024-02-08T13:00:00Z',
        scanFrequency: 'hourly',
        canTakedown: true,
        takedownMethod: 'api',
        contactInfo: 'support@social.com'
    },
    {
        id: 'source-003',
        name: 'Registros Públicos',
        type: 'public_record',
        url: 'https://gobierno.gob.mx',
        itemCount: 521,
        averageRisk: 52,
        isMonitored: true,
        lastScanned: '2024-02-08T09:00:00Z',
        scanFrequency: 'weekly',
        canTakedown: false
    },
    {
        id: 'source-004',
        name: 'Medios Digitales',
        type: 'media',
        url: 'https://various-news-sites.com',
        itemCount: 389,
        averageRisk: 67,
        isMonitored: true,
        lastScanned: '2024-02-08T14:30:00Z',
        scanFrequency: 'daily',
        canTakedown: true,
        takedownMethod: 'manual',
        contactInfo: 'legal@media.com'
    },
    {
        id: 'source-005',
        name: 'Repositorios de Documentos',
        type: 'repository',
        url: 'https://scribd.com',
        itemCount: 245,
        averageRisk: 32,
        isMonitored: true,
        lastScanned: '2024-02-08T10:00:00Z',
        scanFrequency: 'daily',
        canTakedown: true,
        takedownMethod: 'dmca',
        contactInfo: 'dmca@scribd.com'
    },
    {
        id: 'source-006',
        name: 'Foros y Comunidades',
        type: 'forum',
        url: 'https://various-forums.com',
        itemCount: 111,
        averageRisk: 78,
        isMonitored: true,
        lastScanned: '2024-02-08T13:00:00Z',
        scanFrequency: 'daily',
        canTakedown: true,
        takedownMethod: 'manual'
    }
]

// Continue in next file part due to length...
// This is Part 1 of the mock data
