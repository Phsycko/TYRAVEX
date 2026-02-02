export const seguridadData = {
    status: {
        systemIntegrity: 100,
        threatsBlocked: 142,
        activeSessions: 18,
        lastAudit: 'Hace 15 min'
    },
    users: [
        { id: 1, name: 'Admin Principal', role: 'Super Admin', accessLevel: 'Nivel 5', status: 'Activo', lastLogin: 'Ahora' },
        { id: 2, name: 'Analista Zona Norte', role: 'Analista', accessLevel: 'Nivel 3', status: 'Activo', lastLogin: 'Hace 2h' },
        { id: 3, name: 'Operador Logístico', role: 'Operador', accessLevel: 'Nivel 2', status: 'Inactivo', lastLogin: 'Ayer' },
        { id: 4, name: 'Auditor Externo', role: 'Auditor', accessLevel: 'Nivel 4', status: 'Activo', lastLogin: 'Hace 5min' },
    ],
    logs: [
        { id: 5423, time: '10:45:22', user: 'Admin Principal', action: 'SYSTEM_CONFIG_UPDATE', ip: '192.168.1.10', status: 'Success' },
        { id: 5422, time: '10:42:10', user: 'System', action: 'AUTO_BACKUP', ip: 'localhost', status: 'Success' },
        { id: 5421, time: '10:30:05', user: 'Unknown', action: 'FAILED_LOGIN_ATTEMPT', ip: '45.23.12.99', status: 'Warning' },
        { id: 5420, time: '10:15:33', user: 'Analista ZN', action: 'DATA_EXPORT', ip: '192.168.1.45', status: 'Success' },
    ],
    encryption: {
        algorithm: 'AES-256-GCM',
        keysStatus: 'Rotación Programada (2 días)',
        certificateExpiry: '344 días'
    }
}
