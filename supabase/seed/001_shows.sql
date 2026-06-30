-- ============================================================
-- seed/001_shows.sql
-- Siembra los 7 shows faltantes del vivo (el-diario ya existe).
-- IDEMPOTENTE: ON CONFLICT (id) DO NOTHING / WHERE NOT EXISTS.
-- Correr dos veces = no-op limpio.
--
-- ⚠  PRECIOS ESTIMADOS — confirmar con Angel antes de aplicar gate D5.
--    La fuente de precios exactos es el widget de SOLDOUT Promotions
--    (JavaScript dinámico, no accesible via web_fetch).
--    Ajustar price_mxn según la confirmación antes de ejecutar.
-- ============================================================

BEGIN;

-- ============================================================
-- 1. SORPRESAS A-MÉN (activo — cartelera actual Marzo 2026)
-- ============================================================
INSERT INTO shows (
  id, slug, title, subtitle, artist, genre,
  description, age_min, duration_min, is_active
) VALUES (
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380001',
  'sorpresas-amen',
  'Sorpresas A-mén',
  'Una comedia musical divinamente divertida',
  'Juan Torres',
  'Familiar / Comedia musical',
  '¡Las monjas de San-Tito llegan al Teatro Hidalgo! Una puesta en escena irreverente, llena de enredos y números musicales que te harán reír de principio a fin. Bajo la producción de Juan Torres, este gran éxito da un giro delirante al presentar a estas singulares hermanas interpretadas por un talentoso elenco masculino que derrocha canto, tap y picardía.',
  8,
  130,
  true
) ON CONFLICT (id) DO NOTHING;

INSERT INTO price_sections (id, show_id, name, price_mxn, color_hex, sort_order) VALUES
  ('c0eebc99-9c0b-4ef8-aa01-000000000001', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380001', 'VIP',        2500, '#d4af37', 1),
  ('c0eebc99-9c0b-4ef8-aa01-000000000002', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380001', 'Preferente', 1800, '#c0c0c0', 2),
  ('c0eebc99-9c0b-4ef8-aa01-000000000003', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380001', 'Luneta',     1200, '#cd7f32', 3),
  ('c0eebc99-9c0b-4ef8-aa01-000000000004', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380001', 'Mezanine',    800, '#4a9eff', 4)
ON CONFLICT (id) DO NOTHING;

-- funcion para sorpresas-amen (usa el venue existente)
INSERT INTO funciones (id, show_id, venue_id, fecha, hora, puertas, estado)
SELECT
  'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380001',
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380001',
  v.id,
  '2026-03-15',
  '20:30',
  '19:30',
  'on_sale'
FROM venues v LIMIT 1
ON CONFLICT (id) DO NOTHING;

-- 150 seats sorpresas-amen (generate_series idempotente via WHERE NOT EXISTS)
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM seats
    WHERE funcion_id = 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380001'
  ) THEN
    INSERT INTO seats (funcion_id, section_id, row_label, seat_number, status)
    SELECT
      'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380001',
      CASE
        WHEN chr(64 + r) IN ('A','B') THEN 'c0eebc99-9c0b-4ef8-aa01-000000000001'::uuid
        WHEN chr(64 + r) IN ('C','D') THEN 'c0eebc99-9c0b-4ef8-aa01-000000000002'::uuid
        WHEN chr(64 + r) IN ('E','F','G') THEN 'c0eebc99-9c0b-4ef8-aa01-000000000003'::uuid
        ELSE 'c0eebc99-9c0b-4ef8-aa01-000000000004'::uuid
      END,
      chr(64 + r),
      s,
      'available'
    FROM generate_series(1,10) r
    CROSS JOIN generate_series(1,15) s;
  END IF;
END $$;

-- faqs sorpresas-amen
INSERT INTO faqs (id, show_id, question, answer, sort_order) VALUES
  ('f0eebc99-0001-0001-0001-000000000001', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380001',
   '¿Cómo recibo mis boletos digitales?',
   'Los boletos se entregan de forma digital directamente al correo electrónico y al número de WhatsApp proporcionados al momento de la compra, dentro de los 15 minutos posteriores a la transacción.',
   1),
  ('f0eebc99-0001-0001-0001-000000000002', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380001',
   '¿Hay código de vestimenta?',
   'No existe un código de vestimenta estricto. Se recomienda asistir con ropa cómoda para disfrutar plenamente de la función.',
   2),
  ('f0eebc99-0001-0001-0001-000000000003', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380001',
   '¿Cuál es la política de reembolso?',
   'Todas las ventas son definitivas y no se ofrecen reembolsos. Los boletos son transferibles; contáctanos por correo oficial hasta 24 horas antes de la función.',
   3)
ON CONFLICT (id) DO NOTHING;


-- ============================================================
-- 2. DESCUBRIENDO A CRÍ CRÍ (activo — cartelera actual Marzo 2026)
--    ⚠ PRECIOS ESTIMADOS — confirmar. Este show define el "DESDE $399" del home.
-- ============================================================
INSERT INTO shows (
  id, slug, title, subtitle, artist, genre,
  description, age_min, duration_min, is_active
) VALUES (
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380002',
  'descubriendo-a-cri-cri',
  'Descubriendo a Crí Crí',
  'El Grillito Cantor cobra vida',
  'Mario Iván Martínez',
  'Familiar / Todo público',
  '¡Abre el baúl de los recuerdos! A través de la impecable voz y el carisma de Mario Iván Martínez, las canciones más icónicas y las historias menos conocidas de Francisco Gabilondo Soler cobran vida con una propuesta escénica vibrante, lúdica y llena de imaginación. El plan perfecto para el fin de semana — los adultos viajarán en el tiempo hacia su propia niñez.',
  2,
  75,
  true
) ON CONFLICT (id) DO NOTHING;

INSERT INTO price_sections (id, show_id, name, price_mxn, color_hex, sort_order) VALUES
  ('c0eebc99-9c0b-4ef8-aa02-000000000001', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380002', 'VIP',        1200, '#d4af37', 1),
  ('c0eebc99-9c0b-4ef8-aa02-000000000002', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380002', 'Preferente',  800, '#c0c0c0', 2),
  ('c0eebc99-9c0b-4ef8-aa02-000000000003', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380002', 'Luneta',      600, '#cd7f32', 3),
  ('c0eebc99-9c0b-4ef8-aa02-000000000004', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380002', 'Kids',        399, '#4a9eff', 4)
ON CONFLICT (id) DO NOTHING;

INSERT INTO funciones (id, show_id, venue_id, fecha, hora, puertas, estado)
SELECT
  'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380002',
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380002',
  v.id,
  '2026-03-22',
  '17:00',
  '16:00',
  'on_sale'
FROM venues v LIMIT 1
ON CONFLICT (id) DO NOTHING;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM seats
    WHERE funcion_id = 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380002'
  ) THEN
    INSERT INTO seats (funcion_id, section_id, row_label, seat_number, status)
    SELECT
      'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380002',
      CASE
        WHEN chr(64 + r) IN ('A','B') THEN 'c0eebc99-9c0b-4ef8-aa02-000000000001'::uuid
        WHEN chr(64 + r) IN ('C','D') THEN 'c0eebc99-9c0b-4ef8-aa02-000000000002'::uuid
        WHEN chr(64 + r) IN ('E','F','G') THEN 'c0eebc99-9c0b-4ef8-aa02-000000000003'::uuid
        ELSE 'c0eebc99-9c0b-4ef8-aa02-000000000004'::uuid
      END,
      chr(64 + r),
      s,
      'available'
    FROM generate_series(1,10) r
    CROSS JOIN generate_series(1,15) s;
  END IF;
END $$;

INSERT INTO faqs (id, show_id, question, answer, sort_order) VALUES
  ('f0eebc99-0002-0002-0002-000000000001', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380002',
   '¿Cómo recibo mis boletos digitales?',
   'Los boletos se entregan de forma digital directamente al correo electrónico y al número de WhatsApp proporcionados al momento de la compra, dentro de los 15 minutos posteriores a la transacción.',
   1),
  ('f0eebc99-0002-0002-0002-000000000002', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380002',
   '¿Pueden asistir bebés o niños muy pequeños?',
   'Niños a partir de 2 años pagan boleto y utilizan butaca. No se admiten bebés en brazos durante la función para garantizar la comodidad de todos los asistentes.',
   2),
  ('f0eebc99-0002-0002-0002-000000000003', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380002',
   '¿Cuál es la política de reembolso?',
   'Todas las ventas son definitivas y no se ofrecen reembolsos. Los boletos son transferibles; contáctanos por correo oficial hasta 24 horas antes de la función.',
   3)
ON CONFLICT (id) DO NOTHING;


-- ============================================================
-- 3. PAPI PIERNAS LARGAS (inactivo — temporada pasada)
-- ============================================================
INSERT INTO shows (
  id, slug, title, subtitle, artist, genre,
  description, age_min, duration_min, is_active
) VALUES (
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380003',
  'papi-piernas-largas',
  'Papi Piernas Largas',
  'Una conmovedora historia de cartas, sueños y segundas oportunidades',
  NULL,
  'Musical',
  'Una conmovedora historia de cartas, sueños y segundas oportunidades, con música en vivo y una puesta en escena que ha conquistado al mundo. Déjate envolver por el encanto de Jerusha y su misterioso benefactor en este entrañable musical. Una producción íntima, divertida y profundamente humana que celebra el poder de las palabras.',
  0,
  110,
  false
) ON CONFLICT (id) DO NOTHING;

INSERT INTO price_sections (id, show_id, name, price_mxn, color_hex, sort_order) VALUES
  ('c0eebc99-9c0b-4ef8-aa03-000000000001', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380003', 'VIP',        2800, '#d4af37', 1),
  ('c0eebc99-9c0b-4ef8-aa03-000000000002', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380003', 'Preferente', 1800, '#c0c0c0', 2),
  ('c0eebc99-9c0b-4ef8-aa03-000000000003', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380003', 'Luneta',     1200, '#cd7f32', 3),
  ('c0eebc99-9c0b-4ef8-aa03-000000000004', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380003', 'Mezanine',    900, '#4a9eff', 4)
ON CONFLICT (id) DO NOTHING;


-- ============================================================
-- 4. TÍMIDO Y FURIOSO (inactivo — temporada pasada)
-- ============================================================
INSERT INTO shows (
  id, slug, title, subtitle, artist, genre,
  description, age_min, duration_min, is_active
) VALUES (
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380004',
  'timido-y-furioso',
  'Tímido y Furioso',
  'El humor ácido de nuestras contradicciones cotidianas',
  NULL,
  'Comedia / Drama',
  'Tímido y Furioso llega al Teatro Hidalgo para exponer, con humor ácido y situaciones cotidianas, las contradicciones que todos vivimos entre lo que callamos y lo que explotamos. Una obra que combina ingenio, sarcasmo y una mirada crítica sobre nuestra forma de relacionarnos.',
  12,
  90,
  false
) ON CONFLICT (id) DO NOTHING;

INSERT INTO price_sections (id, show_id, name, price_mxn, color_hex, sort_order) VALUES
  ('c0eebc99-9c0b-4ef8-aa04-000000000001', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380004', 'VIP',        2500, '#d4af37', 1),
  ('c0eebc99-9c0b-4ef8-aa04-000000000002', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380004', 'Preferente', 1600, '#c0c0c0', 2),
  ('c0eebc99-9c0b-4ef8-aa04-000000000003', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380004', 'Luneta',     1000, '#cd7f32', 3),
  ('c0eebc99-9c0b-4ef8-aa04-000000000004', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380004', 'Mezanine',    700, '#4a9eff', 4)
ON CONFLICT (id) DO NOTHING;


-- ============================================================
-- 5. RINGOLINGUS (inactivo — temporada pasada)
-- ============================================================
INSERT INTO shows (
  id, slug, title, subtitle, artist, genre,
  description, age_min, duration_min, is_active
) VALUES (
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380005',
  'ringolingus',
  'Ringolingus',
  'Teatro negro y luz neón — glow in the dark',
  NULL,
  'Familiar / Teatro negro',
  'Prepárate para una experiencia visual deslumbrante. Un espectáculo de teatro negro y luz neón donde la imaginación brilla en la oscuridad. Acompaña a Frida y Fausto, dos primos que encuentran una misteriosa maleta llena de recuerdos y despiertan a Ringo, un muñeco mágico que les revelará el increíble legado circense de su abuelo.',
  4,
  75,
  false
) ON CONFLICT (id) DO NOTHING;

INSERT INTO price_sections (id, show_id, name, price_mxn, color_hex, sort_order) VALUES
  ('c0eebc99-9c0b-4ef8-aa05-000000000001', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380005', 'VIP',        1500, '#d4af37', 1),
  ('c0eebc99-9c0b-4ef8-aa05-000000000002', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380005', 'Preferente', 1000, '#c0c0c0', 2),
  ('c0eebc99-9c0b-4ef8-aa05-000000000003', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380005', 'Luneta',      700, '#cd7f32', 3),
  ('c0eebc99-9c0b-4ef8-aa05-000000000004', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380005', 'Mezanine',    500, '#4a9eff', 4)
ON CONFLICT (id) DO NOTHING;


-- ============================================================
-- 6. UNA NAVIDAD ESPECTACULAR EN BROADWAY (inactivo — dic–ene pasado)
-- ============================================================
INSERT INTO shows (
  id, slug, title, subtitle, artist, genre,
  description, age_min, duration_min, is_active
) VALUES (
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380006',
  'una-navidad-espectacular-en-broadway',
  'Una Navidad Espectacular en Broadway',
  'La magia de Broadway en temporada decembrina',
  NULL,
  'Musical / Navideño',
  '¡Vive la magia de Broadway esta temporada decembrina! El espíritu navideño como hilo conductor: desde la emotividad de un villancico clásico hasta la energía desbordante de números de tap estilo "Christmas Spectacular" de las Rockettes. Una gala festiva imperdible.',
  0,
  120,
  false
) ON CONFLICT (id) DO NOTHING;

INSERT INTO price_sections (id, show_id, name, price_mxn, color_hex, sort_order) VALUES
  ('c0eebc99-9c0b-4ef8-aa06-000000000001', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380006', 'VIP',        3500, '#d4af37', 1),
  ('c0eebc99-9c0b-4ef8-aa06-000000000002', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380006', 'Preferente', 2500, '#c0c0c0', 2),
  ('c0eebc99-9c0b-4ef8-aa06-000000000003', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380006', 'Luneta',     1800, '#cd7f32', 3),
  ('c0eebc99-9c0b-4ef8-aa06-000000000004', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380006', 'Mezanine',   1200, '#4a9eff', 4)
ON CONFLICT (id) DO NOTHING;

-- Nota: slug 'old' (Crí Crí viejo) es redirect alias del nuevo slug — no se siembra como show separado.

COMMIT;
