-- ============================================================
-- 001_baseline_schema.sql
-- Documenta el esquema que ya existe en la DB live (creado a mano).
-- SAFE: CREATE IF NOT EXISTS + ADD COLUMN IF NOT EXISTS.
-- Correr dos veces = no-op limpio.
-- ============================================================

-- venues
CREATE TABLE IF NOT EXISTS venues (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name        text NOT NULL,
  address     text,
  metro       text,
  parking     text,
  svg_map     text,
  capacity    integer,
  created_at  timestamptz DEFAULT now() NOT NULL
);

-- shows
CREATE TABLE IF NOT EXISTS shows (
  id             uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug           text UNIQUE NOT NULL,
  title          text NOT NULL,
  subtitle       text,
  artist         text,
  genre          text,
  description    text,
  age_min        integer DEFAULT 0 NOT NULL,
  duration_min   integer,
  image_hero_url text,
  is_active      boolean DEFAULT true NOT NULL,
  created_at     timestamptz DEFAULT now() NOT NULL
);

-- price_sections
CREATE TABLE IF NOT EXISTS price_sections (
  id         uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  show_id    uuid NOT NULL REFERENCES shows(id) ON DELETE CASCADE,
  name       text NOT NULL,
  price_mxn  integer NOT NULL,
  color_hex  text,
  sort_order integer NOT NULL DEFAULT 0
);

-- funciones
CREATE TYPE IF NOT EXISTS show_status AS ENUM ('on_sale','sold_out','cancelled','postponed');

CREATE TABLE IF NOT EXISTS funciones (
  id         uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  show_id    uuid NOT NULL REFERENCES shows(id) ON DELETE CASCADE,
  venue_id   uuid NOT NULL REFERENCES venues(id),
  fecha      date NOT NULL,
  hora       time NOT NULL,
  puertas    time NOT NULL,
  estado     show_status NOT NULL DEFAULT 'on_sale',
  created_at timestamptz DEFAULT now() NOT NULL
);

-- seats
CREATE TABLE IF NOT EXISTS seats (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  funcion_id  uuid NOT NULL REFERENCES funciones(id) ON DELETE CASCADE,
  section_id  uuid NOT NULL REFERENCES price_sections(id),
  row_label   char(1) NOT NULL,
  seat_number integer NOT NULL,
  status      text NOT NULL DEFAULT 'available'
                CHECK (status IN ('available','sold_out','held')),
  held_until  timestamptz,
  held_by     uuid,
  UNIQUE (funcion_id, row_label, seat_number)
);

-- faqs
CREATE TABLE IF NOT EXISTS faqs (
  id         uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  show_id    uuid NOT NULL REFERENCES shows(id) ON DELETE CASCADE,
  question   text NOT NULL,
  answer     text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0
);

-- orders
CREATE TABLE IF NOT EXISTS orders (
  id                 uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id            uuid REFERENCES auth.users(id),
  funcion_id         uuid REFERENCES funciones(id),
  email              text NOT NULL,
  total_mxn          integer NOT NULL,
  status             text NOT NULL DEFAULT 'pending'
                       CHECK (status IN ('pending','paid','cancelled','refunded')),
  payment_intent_id  text,
  paid_at            timestamptz,
  created_at         timestamptz DEFAULT now() NOT NULL
);

-- order_items
CREATE TABLE IF NOT EXISTS order_items (
  id        uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id  uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  seat_id   uuid NOT NULL REFERENCES seats(id),
  price_mxn integer NOT NULL
);

-- tickets
CREATE TABLE IF NOT EXISTS tickets (
  id              uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  order_item_id   uuid NOT NULL REFERENCES order_items(id) ON DELETE CASCADE,
  qr_payload      text NOT NULL,
  delivery_email  text,
  delivered_at    timestamptz,
  scanned_at      timestamptz,
  created_at      timestamptz DEFAULT now() NOT NULL
);

-- ============================================================
-- Índices útiles (idempotentes)
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_shows_slug        ON shows(slug);
CREATE INDEX IF NOT EXISTS idx_shows_is_active   ON shows(is_active);
CREATE INDEX IF NOT EXISTS idx_funciones_show    ON funciones(show_id);
CREATE INDEX IF NOT EXISTS idx_seats_funcion     ON seats(funcion_id);
CREATE INDEX IF NOT EXISTS idx_seats_status      ON seats(funcion_id, status);
CREATE INDEX IF NOT EXISTS idx_orders_status     ON orders(status);
CREATE INDEX IF NOT EXISTS idx_faqs_show         ON faqs(show_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_price_sections_show ON price_sections(show_id, sort_order);
