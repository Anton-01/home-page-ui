-- ============================================
-- DATOS DE PRUEBA PARA EL SISTEMA
-- Panel de Comunicación Empresarial
-- ============================================

-- ============================================
-- INSERTAR EMPRESAS
-- ============================================
INSERT INTO companies (id, name, slug, tax_id, email, phone, status) VALUES
('11111111-1111-1111-1111-111111111111', 'Aceros Industriales S.A. de C.V.', 'aceros-industriales', 'AIN850101ABC', 'contacto@acerosindustriales.com', '+52 55 1234 5678', 'active'),
('22222222-2222-2222-2222-222222222222', 'Tecnología Avanzada MX', 'tecnologia-avanzada', 'TAM900215DEF', 'info@tecavanzada.mx', '+52 55 2345 6789', 'active'),
('33333333-3333-3333-3333-333333333333', 'Grupo Financiero Nacional', 'grupo-financiero', 'GFN880330GHI', 'contacto@gfnacional.com', '+52 55 3456 7890', 'active'),
('44444444-4444-4444-4444-444444444444', 'Constructora del Norte', 'constructora-norte', 'CDN950512JKL', 'info@constructoranorte.com', '+52 81 4567 8901', 'active'),
('55555555-5555-5555-5555-555555555555', 'Alimentos y Bebidas Premium', 'alimentos-premium', 'ABP870625MNO', 'contacto@alimentospremium.com', '+52 33 5678 9012', 'active'),
('66666666-6666-6666-6666-666666666666', 'Logística Express Internacional', 'logistica-express', 'LEI910815PQR', 'info@logisticaexpress.com', '+52 55 6789 0123', 'active'),
('77777777-7777-7777-7777-777777777777', 'Farmacéutica Salud Total', 'farma-salud-total', 'FST860920STU', 'contacto@farmasaludtotal.com', '+52 55 7890 1234', 'active'),
('88888888-8888-8888-8888-888888888888', 'Energía Renovable Solar', 'energia-solar', 'ERS920110VWX', 'info@energiasolar.com', '+52 55 8901 2345', 'active'),
('99999999-9999-9999-9999-999999999999', 'Telecomunicaciones Digitales', 'telecom-digital', 'TDM880505YZA', 'contacto@telecomdigital.com', '+52 55 9012 3456', 'active'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Automotriz del Pacífico', 'automotriz-pacifico', 'ADP900720BCD', 'info@automotrizpacifico.com', '+52 33 0123 4567', 'active'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Textiles y Confecciones Modernas', 'textiles-modernas', 'TCM850315EFG', 'contacto@textilesmodernas.com', '+52 222 1234 5678', 'active'),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Minera Recursos Naturales', 'minera-recursos', 'MRN870830HIJ', 'info@minerarecursos.com', '+52 614 2345 6789', 'active'),
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Agropecuaria del Centro', 'agropecuaria-centro', 'ADC910210KLM', 'contacto@agrocentro.com', '+52 449 3456 7890', 'active'),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'Servicios Profesionales Integrados', 'servicios-integrados', 'SPI880625NOP', 'info@serviciosintegrados.com', '+52 55 4567 8901', 'active'),
('ffffffff-ffff-ffff-ffff-ffffffffffff', 'Comercializadora Global Trade', 'global-trade', 'CGT930815QRS', 'contacto@globaltrade.com', '+52 55 5678 9012', 'active');

-- ============================================
-- CONFIGURACIÓN DE EMPRESAS
-- ============================================
INSERT INTO company_configurations (id, company_id, logo_url, primary_color, secondary_color, accent_color, header_title, footer_text) VALUES
('c1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', '/logos/aceros.png', '#c9a227', '#0a1744', '#f59e0b', 'Aceros Industriales', '© 2025 Aceros Industriales S.A. de C.V. Todos los derechos reservados.'),
('c2222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', '/logos/tecnologia.png', '#3b82f6', '#1e3a8a', '#22d3ee', 'Tecnología Avanzada', '© 2025 Tecnología Avanzada MX. Todos los derechos reservados.'),
('c3333333-3333-3333-3333-333333333333', '33333333-3333-3333-3333-333333333333', '/logos/financiero.png', '#059669', '#064e3b', '#34d399', 'Grupo Financiero', '© 2025 Grupo Financiero Nacional. Todos los derechos reservados.'),
('c4444444-4444-4444-4444-444444444444', '44444444-4444-4444-4444-444444444444', '/logos/constructora.png', '#ea580c', '#7c2d12', '#fb923c', 'Constructora del Norte', '© 2025 Constructora del Norte. Todos los derechos reservados.'),
('c5555555-5555-5555-5555-555555555555', '55555555-5555-5555-5555-555555555555', '/logos/alimentos.png', '#dc2626', '#7f1d1d', '#f87171', 'Alimentos Premium', '© 2025 Alimentos y Bebidas Premium. Todos los derechos reservados.');

-- ============================================
-- USUARIOS DE PRUEBA
-- Contraseña por defecto: password123 (hash bcrypt)
-- ============================================
-- Hash de 'password123': $2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.VdKJQqyqH.nRLu

-- Super Admins (1 por empresa)
INSERT INTO users (id, company_id, email, password, name, last_name, role, status, email_verified_at) VALUES
('u1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'admin@acerosindustriales.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.VdKJQqyqH.nRLu', 'Juan', 'Pérez García', 'super_admin', 'active', CURRENT_TIMESTAMP),
('u2222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'admin@tecavanzada.mx', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.VdKJQqyqH.nRLu', 'María', 'González López', 'super_admin', 'active', CURRENT_TIMESTAMP),
('u3333333-3333-3333-3333-333333333333', '33333333-3333-3333-3333-333333333333', 'admin@gfnacional.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.VdKJQqyqH.nRLu', 'Carlos', 'Ramírez Soto', 'super_admin', 'active', CURRENT_TIMESTAMP),
('u4444444-4444-4444-4444-444444444444', '44444444-4444-4444-4444-444444444444', 'admin@constructoranorte.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.VdKJQqyqH.nRLu', 'Ana', 'Martínez Ruiz', 'super_admin', 'active', CURRENT_TIMESTAMP),
('u5555555-5555-5555-5555-555555555555', '55555555-5555-5555-5555-555555555555', 'admin@alimentospremium.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.VdKJQqyqH.nRLu', 'Roberto', 'Hernández Villa', 'super_admin', 'active', CURRENT_TIMESTAMP);

-- Admins adicionales (hasta 4 más por empresa)
INSERT INTO users (id, company_id, email, password, name, last_name, role, status, email_verified_at) VALUES
('u1111111-1111-1111-1111-111111111112', '11111111-1111-1111-1111-111111111111', 'rh@acerosindustriales.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.VdKJQqyqH.nRLu', 'Laura', 'Sánchez Moreno', 'admin', 'active', CURRENT_TIMESTAMP),
('u1111111-1111-1111-1111-111111111113', '11111111-1111-1111-1111-111111111111', 'it@acerosindustriales.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.VdKJQqyqH.nRLu', 'Pedro', 'López Díaz', 'admin', 'active', CURRENT_TIMESTAMP),
('u2222222-2222-2222-2222-222222222223', '22222222-2222-2222-2222-222222222222', 'soporte@tecavanzada.mx', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.VdKJQqyqH.nRLu', 'Fernando', 'Castro Núñez', 'admin', 'active', CURRENT_TIMESTAMP);

-- Usuarios normales
INSERT INTO users (id, company_id, email, password, name, last_name, role, status, email_verified_at) VALUES
('u1111111-1111-1111-1111-111111111120', '11111111-1111-1111-1111-111111111111', 'usuario@acerosindustriales.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.VdKJQqyqH.nRLu', 'María', 'García López', 'user', 'active', CURRENT_TIMESTAMP),
('u1111111-1111-1111-1111-111111111121', '11111111-1111-1111-1111-111111111111', 'ventas@acerosindustriales.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.VdKJQqyqH.nRLu', 'Carlos', 'Rodríguez Mendoza', 'user', 'active', CURRENT_TIMESTAMP),
('u1111111-1111-1111-1111-111111111122', '11111111-1111-1111-1111-111111111111', 'finanzas@acerosindustriales.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.VdKJQqyqH.nRLu', 'Ana', 'Martínez Sánchez', 'user', 'active', CURRENT_TIMESTAMP),
('u2222222-2222-2222-2222-222222222230', '22222222-2222-2222-2222-222222222222', 'usuario@tecavanzada.mx', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.VdKJQqyqH.nRLu', 'Patricia', 'Jiménez Torres', 'user', 'active', CURRENT_TIMESTAMP),
('u2222222-2222-2222-2222-222222222231', '22222222-2222-2222-2222-222222222222', 'desarrollo@tecavanzada.mx', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.VdKJQqyqH.nRLu', 'Miguel', 'Ángel Ramírez', 'user', 'active', CURRENT_TIMESTAMP);

-- Usuario de prueba general (compatible con el login actual)
INSERT INTO users (id, company_id, email, password, name, last_name, role, status, email_verified_at) VALUES
('uaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'usuario@empresa.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.VdKJQqyqH.nRLu', 'Usuario', 'Demo', 'user', 'active', CURRENT_TIMESTAMP);

-- ============================================
-- MÓDULOS/ITEMS DEL DASHBOARD (Empresa 1)
-- ============================================
INSERT INTO modules (id, company_id, label, description, type, url, target, icon, icon_type, highlight, sort_order, status) VALUES
('m1111111-0001-0001-0001-111111111111', '11111111-1111-1111-1111-111111111111', 'Email', 'Acceso al correo corporativo', 'link', 'https://mail.empresa.com', '_blank', 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z', 'svg', NULL, 1, 'active'),
('m1111111-0002-0002-0002-111111111111', '11111111-1111-1111-1111-111111111111', 'Contactos', 'Directorio de contactos', 'modal', NULL, NULL, 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z', 'svg', NULL, 2, 'active'),
('m1111111-0003-0003-0003-111111111111', '11111111-1111-1111-1111-111111111111', 'CRM', 'Sistema de gestión de clientes', 'link', 'https://crm.empresa.com', '_blank', 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z', 'svg', NULL, 3, 'active'),
('m1111111-0004-0004-0004-111111111111', '11111111-1111-1111-1111-111111111111', 'Capacitación', 'Cursos y certificaciones', 'link', 'https://capacitacion.empresa.com', '_blank', 'M12 3L1 9l11 6 9-4.91V17h2V9L12 3z M12 15.27l-7-3.82V16l7 4 7-4v-4.55l-7 3.82z', 'svg', NULL, 4, 'active'),
('m1111111-0005-0005-0005-111111111111', '11111111-1111-1111-1111-111111111111', 'Solicitud de Vacaciones', 'Gestión de vacaciones', 'link', 'https://rh.empresa.com/vacaciones', '_blank', 'M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z', 'svg', NULL, 5, 'active'),
('m1111111-0006-0006-0006-111111111111', '11111111-1111-1111-1111-111111111111', 'Indicadores', 'Dashboard de KPIs', 'link', 'https://bi.empresa.com', '_blank', 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z', 'svg', NULL, 6, 'active'),
('m1111111-0007-0007-0007-111111111111', '11111111-1111-1111-1111-111111111111', 'Reportes Seguridad', 'Reportes de incidentes', 'link', 'https://seguridad.empresa.com/reportes', '_blank', 'M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm-1 14.5v-3h2v3h-2zm0-5v-4h2v4h-2z', 'svg', '#dc2626', 7, 'active'),
('m1111111-0008-0008-0008-111111111111', '11111111-1111-1111-1111-111111111111', 'Procedimientos', 'Manuales y procedimientos', 'link', 'https://docs.empresa.com', '_blank', 'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z', 'svg', NULL, 8, 'active'),
('m1111111-0009-0009-0009-111111111111', '11111111-1111-1111-1111-111111111111', 'Planeación', 'Herramientas de planeación', 'link', 'https://planeacion.empresa.com', '_blank', 'M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z', 'svg', NULL, 9, 'active'),
('m1111111-0010-0010-0010-111111111111', '11111111-1111-1111-1111-111111111111', 'Finanzas', 'Sistema financiero', 'link', 'https://finanzas.empresa.com', '_blank', 'M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z', 'svg', NULL, 10, 'active'),
('m1111111-0011-0011-0011-111111111111', '11111111-1111-1111-1111-111111111111', 'Seguridad e Higiene', 'Portal de seguridad', 'link', 'https://seguridad.empresa.com', '_blank', 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z', 'svg', NULL, 11, 'active'),
('m1111111-0012-0012-0012-111111111111', '11111111-1111-1111-1111-111111111111', 'Solicitud EPP', 'Equipo de protección', 'link', 'https://epp.empresa.com', '_blank', 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z', 'svg', NULL, 12, 'active'),
('m1111111-0013-0013-0013-111111111111', '11111111-1111-1111-1111-111111111111', 'Inventarios', 'Control de inventarios', 'link', 'https://inventarios.empresa.com', '_blank', 'M20 2H4c-1 0-2 .9-2 2v3.01c0 .72.43 1.34 1 1.69V20c0 1.1 1.1 2 2 2h14c.9 0 2-.9 2-2V8.7c.57-.35 1-.97 1-1.69V4c0-1.1-1-2-2-2zm-5 12H9v-2h6v2zm5-7H4V4h16v3z', 'svg', NULL, 13, 'active'),
('m1111111-0014-0014-0014-111111111111', '11111111-1111-1111-1111-111111111111', 'Facturación', 'Sistema de facturación', 'link', 'https://facturacion.empresa.com', '_blank', 'M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11zm-3-7H9v-2h6v2zm0 4H9v-2h6v2z', 'svg', NULL, 14, 'active'),
('m1111111-0015-0015-0015-111111111111', '11111111-1111-1111-1111-111111111111', 'Almacén', 'Gestión de almacén', 'link', 'https://almacen.empresa.com', '_blank', 'M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z', 'svg', NULL, 15, 'active'),
('m1111111-0016-0016-0016-111111111111', '11111111-1111-1111-1111-111111111111', 'Reporte ventas', 'Reportes de ventas', 'link', 'https://ventas.empresa.com/reportes', '_blank', 'M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z', 'svg', NULL, 16, 'active'),
('m1111111-0017-0017-0017-111111111111', '11111111-1111-1111-1111-111111111111', 'Solicitud Compras', 'Sistema de compras', 'link', 'https://compras.empresa.com', '_blank', 'M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z', 'svg', NULL, 17, 'active'),
('m1111111-0018-0018-0018-111111111111', '11111111-1111-1111-1111-111111111111', 'Papelería', 'Solicitud de papelería', 'link', 'https://papeleria.empresa.com', '_blank', 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z', 'svg', NULL, 18, 'active'),
('m1111111-0019-0019-0019-111111111111', '11111111-1111-1111-1111-111111111111', 'Salas de juntas', 'Reservación de salas', 'link', 'https://salas.empresa.com', '_blank', 'M12 5.5A3.5 3.5 0 0 1 15.5 9a3.5 3.5 0 0 1-3.5 3.5A3.5 3.5 0 0 1 8.5 9 3.5 3.5 0 0 1 12 5.5M5 8c.56 0 1.08.15 1.53.42-.15 1.43.27 2.85 1.13 3.96C7.16 13.34 6.16 14 5 14a3 3 0 0 1-3-3 3 3 0 0 1 3-3m14 0a3 3 0 0 1 3 3 3 3 0 0 1-3 3c-1.16 0-2.16-.66-2.66-1.62a5.536 5.536 0 0 0 1.13-3.96c.45-.27.97-.42 1.53-.42M5.5 18.25c0-2.07 2.91-3.75 6.5-3.75s6.5 1.68 6.5 3.75V20h-13v-1.75M0 20v-1.5c0-1.39 1.89-2.56 4.45-2.9-.59.68-.95 1.62-.95 2.65V20H0m24 0h-3.5v-1.75c0-1.03-.36-1.97-.95-2.65 2.56.34 4.45 1.51 4.45 2.9V20z', 'svg', NULL, 19, 'active'),
('m1111111-0020-0020-0020-111111111111', '11111111-1111-1111-1111-111111111111', 'Soporte IT', 'Mesa de ayuda técnica', 'link', 'https://soporte.empresa.com', '_blank', 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z', 'svg', '#f59e0b', 20, 'active');

-- ============================================
-- EVENTOS DEL CALENDARIO (Empresa 1)
-- ============================================
INSERT INTO calendar_events (id, company_id, title, description, content, event_date, start_time, end_time, color, status, created_by) VALUES
('e1111111-0001-0001-0001-111111111111', '11111111-1111-1111-1111-111111111111', 'Junta de Directivos', 'Reunión mensual de directivos', 'Reunión mensual para revisar indicadores clave y objetivos del trimestre.', CURRENT_DATE + INTERVAL '6 days', '09:00:00', '11:00:00', '#c9a227', 'active', 'u1111111-1111-1111-1111-111111111111'),
('e1111111-0002-0002-0002-111111111111', '11111111-1111-1111-1111-111111111111', 'Capacitación: Seguridad Industrial', 'Curso obligatorio', 'Curso obligatorio para todo el personal del área de producción.', CURRENT_DATE + INTERVAL '10 days', '14:00:00', '17:00:00', '#3b82f6', 'active', 'u1111111-1111-1111-1111-111111111111'),
('e1111111-0003-0003-0003-111111111111', '11111111-1111-1111-1111-111111111111', 'Reunión de Planeación', 'Planeación estratégica', 'Definición de estrategias y metas para el primer trimestre de 2025.', CURRENT_DATE + INTERVAL '14 days', '10:00:00', '12:00:00', '#10b981', 'active', 'u1111111-1111-1111-1111-111111111111'),
('e1111111-0004-0004-0004-111111111111', '11111111-1111-1111-1111-111111111111', 'Auditoría Interna', 'Auditoría de calidad', 'Revisión de procesos y documentación del sistema de gestión de calidad.', CURRENT_DATE + INTERVAL '15 days', '08:00:00', '13:00:00', '#f59e0b', 'active', 'u1111111-1111-1111-1111-111111111111'),
('e1111111-0005-0005-0005-111111111111', '11111111-1111-1111-1111-111111111111', 'Día de Integración', 'Team building', 'Actividades recreativas y de team building para todos los colaboradores.', CURRENT_DATE + INTERVAL '20 days', '12:00:00', '18:00:00', '#8b5cf6', 'active', 'u1111111-1111-1111-1111-111111111111'),
('e1111111-0006-0006-0006-111111111111', '11111111-1111-1111-1111-111111111111', 'Entrega de Reportes', 'Fecha límite', 'Fecha límite para entregar reportes mensuales de cada departamento.', CURRENT_DATE + INTERVAL '24 days', NULL, NULL, '#ef4444', 'active', 'u1111111-1111-1111-1111-111111111111'),
('e1111111-0007-0007-0007-111111111111', '11111111-1111-1111-1111-111111111111', 'Mantenimiento Programado', 'Mantenimiento preventivo', 'Mantenimiento preventivo de equipos de cómputo y servidores.', CURRENT_DATE + INTERVAL '28 days', '18:00:00', '22:00:00', '#6366f1', 'active', 'u1111111-1111-1111-1111-111111111111');

-- ============================================
-- NOTICIAS DEL CINTILLO (Empresa 1)
-- ============================================
INSERT INTO news (id, company_id, text, url, sort_order, is_priority, status, created_by) VALUES
('n1111111-0001-0001-0001-111111111111', '11111111-1111-1111-1111-111111111111', 'Recordatorio: La fecha límite para entregar solicitudes de vacaciones es el 20 de enero.', NULL, 1, false, 'active', 'u1111111-1111-1111-1111-111111111111'),
('n1111111-0002-0002-0002-111111111111', '11111111-1111-1111-1111-111111111111', '¡Felicidades al equipo de Ventas por superar la meta del mes!', NULL, 2, true, 'active', 'u1111111-1111-1111-1111-111111111111'),
('n1111111-0003-0003-0003-111111111111', '11111111-1111-1111-1111-111111111111', 'Nuevo horario de comedor: Lunes a Viernes de 12:00 a 15:00 hrs.', NULL, 3, false, 'active', 'u1111111-1111-1111-1111-111111111111'),
('n1111111-0004-0004-0004-111111111111', '11111111-1111-1111-1111-111111111111', 'Mantenimiento programado en el sistema de correo este sábado de 22:00 a 02:00 hrs.', NULL, 4, true, 'active', 'u1111111-1111-1111-1111-111111111111'),
('n1111111-0005-0005-0005-111111111111', '11111111-1111-1111-1111-111111111111', 'Inscripciones abiertas para el torneo de fútbol interdepartamental 2025.', 'https://deportes.empresa.com', 5, false, 'active', 'u1111111-1111-1111-1111-111111111111');

-- Noticias para Empresa 2
INSERT INTO news (id, company_id, text, url, sort_order, is_priority, status, created_by) VALUES
('n2222222-0001-0001-0001-222222222222', '22222222-2222-2222-2222-222222222222', 'Nuevo sistema de gestión de proyectos disponible. Capacitación el próximo lunes.', NULL, 1, true, 'active', 'u2222222-2222-2222-2222-222222222222'),
('n2222222-0002-0002-0002-222222222222', '22222222-2222-2222-2222-222222222222', 'Actualización de política de home office. Revisa tu correo para más detalles.', NULL, 2, false, 'active', 'u2222222-2222-2222-2222-222222222222');

-- ============================================
-- CONTACTOS/DIRECTORIO (Empresa 1)
-- ============================================
INSERT INTO contacts (id, company_id, name, last_name, department, position, email, phone, extension, sort_order, status) VALUES
('ct111111-0001-0001-0001-111111111111', '11111111-1111-1111-1111-111111111111', 'María', 'García López', 'Recursos Humanos', 'Directora de RH', 'maria.garcia@acerosindustriales.com', '55 1234 5678', '101', 1, 'active'),
('ct111111-0002-0002-0002-111111111111', '11111111-1111-1111-1111-111111111111', 'Carlos', 'Rodríguez Mendoza', 'Tecnología de la Información', 'Gerente de TI', 'carlos.rodriguez@acerosindustriales.com', '55 1234 5679', '205', 2, 'active'),
('ct111111-0003-0003-0003-111111111111', '11111111-1111-1111-1111-111111111111', 'Ana', 'Martínez Sánchez', 'Finanzas', 'Contadora General', 'ana.martinez@acerosindustriales.com', '55 1234 5680', '302', 3, 'active'),
('ct111111-0004-0004-0004-111111111111', '11111111-1111-1111-1111-111111111111', 'Roberto', 'Hernández Villa', 'Operaciones', 'Director de Operaciones', 'roberto.hernandez@acerosindustriales.com', '55 1234 5681', '150', 4, 'active'),
('ct111111-0005-0005-0005-111111111111', '11111111-1111-1111-1111-111111111111', 'Patricia', 'Jiménez Torres', 'Marketing', 'Coordinadora de Marketing', 'patricia.jimenez@acerosindustriales.com', '55 1234 5682', '410', 5, 'active'),
('ct111111-0006-0006-0006-111111111111', '11111111-1111-1111-1111-111111111111', 'Fernando', 'López Díaz', 'Ventas', 'Director Comercial', 'fernando.lopez@acerosindustriales.com', '55 1234 5683', '501', 6, 'active'),
('ct111111-0007-0007-0007-111111111111', '11111111-1111-1111-1111-111111111111', 'Laura', 'Sánchez Moreno', 'Compras', 'Jefe de Compras', 'laura.sanchez@acerosindustriales.com', '55 1234 5684', '220', 7, 'active'),
('ct111111-0008-0008-0008-111111111111', '11111111-1111-1111-1111-111111111111', 'Miguel Ángel', 'Ramírez Fuentes', 'Logística', 'Coordinador de Logística', 'miguel.ramirez@acerosindustriales.com', '55 1234 5685', '330', 8, 'active'),
('ct111111-0009-0009-0009-111111111111', '11111111-1111-1111-1111-111111111111', 'Gabriela', 'Fernández Castro', 'Calidad', 'Gerente de Calidad', 'gabriela.fernandez@acerosindustriales.com', '55 1234 5686', '125', 9, 'active'),
('ct111111-0010-0010-0010-111111111111', '11111111-1111-1111-1111-111111111111', 'José Luis', 'Morales Ruiz', 'Producción', 'Jefe de Producción', 'jose.morales@acerosindustriales.com', '55 1234 5687', '180', 10, 'active'),
('ct111111-0011-0011-0011-111111111111', '11111111-1111-1111-1111-111111111111', 'Alejandra', 'Vega Núñez', 'Contabilidad', 'Analista Contable', 'alejandra.vega@acerosindustriales.com', '55 1234 5688', '305', 11, 'active'),
('ct111111-0012-0012-0012-111111111111', '11111111-1111-1111-1111-111111111111', 'Ricardo', 'Peña Salazar', 'Legal', 'Asesor Jurídico', 'ricardo.pena@acerosindustriales.com', '55 1234 5689', '400', 12, 'active');

-- ============================================
-- IMÁGENES DEL BANNER (Empresa 1)
-- ============================================
INSERT INTO banner_images (id, company_id, url, alt_text, original_name, sort_order, status) VALUES
('b1111111-0001-0001-0001-111111111111', '11111111-1111-1111-1111-111111111111', '/banners/banner1.jpg', 'Banner principal Aceros Industriales', 'banner1.jpg', 1, 'active'),
('b1111111-0002-0002-0002-111111111111', '11111111-1111-1111-1111-111111111111', '/banners/banner2.jpg', 'Instalaciones industriales', 'banner2.jpg', 2, 'active'),
('b1111111-0003-0003-0003-111111111111', '11111111-1111-1111-1111-111111111111', '/banners/banner3.jpg', 'Equipo de trabajo', 'banner3.jpg', 3, 'active'),
('b1111111-0004-0004-0004-111111111111', '11111111-1111-1111-1111-111111111111', '/banners/banner4.jpg', 'Productos de acero', 'banner4.jpg', 4, 'active');

-- ============================================
-- CONFIGURACIÓN DE CACHÉ (Empresa 1)
-- ============================================
INSERT INTO cache_settings (id, company_id, modules_ttl, contacts_ttl, events_ttl, news_ttl, banner_ttl, config_ttl) VALUES
('cs111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 600, 600, 600, 60, 600, 3600),
('cs222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 600, 600, 600, 60, 600, 3600);

-- ============================================
-- LOGS DE ACTIVIDAD DE EJEMPLO
-- ============================================
INSERT INTO activity_logs (id, company_id, user_id, action, entity_type, description, ip_address) VALUES
('al111111-0001-0001-0001-111111111111', '11111111-1111-1111-1111-111111111111', 'u1111111-1111-1111-1111-111111111111', 'login', 'users', 'Inicio de sesión exitoso', '192.168.1.100'),
('al111111-0002-0002-0002-111111111111', '11111111-1111-1111-1111-111111111111', 'u1111111-1111-1111-1111-111111111111', 'create', 'news', 'Creó una nueva noticia', '192.168.1.100'),
('al111111-0003-0003-0003-111111111111', '11111111-1111-1111-1111-111111111111', 'u1111111-1111-1111-1111-111111111112', 'update', 'modules', 'Actualizó módulo de Email', '192.168.1.101');

-- ============================================
-- FIN DE DATOS DE PRUEBA
-- ============================================
