You are a senior PostgreSQL and Supabase architect.

Design a production-ready database schema for a UK-based ecommerce platform called BrushPast.

The final output should ONLY be a complete Supabase-ready SQL migration.

Do not generate application code.
Do not generate React code.
Do not generate TypeScript models.
Do not generate ERD diagrams.
Do not generate explanations.

Generate only the SQL migration files required to create the database.

# Use /caveman

# TECH STACK

- Next.js
- Supabase PostgreSQL
- Cloudinary
- Custom Admin Panel
- Guest Checkout Only
- No customer accounts
- No Supabase Auth

========================================
GLOBAL REQUIREMENTS
===================

Every main table must contain:

- id UUID primary key
- created_at
- updated_at
- sort_order integer default 0
- status enum

Status enum:

- draft
- active
- hidden
- archived

Higher sort_order values appear first.

Most fields should be nullable unless absolutely required.

Create indexes for:

- slug
- status
- sort_order
- all foreign keys

========================================
CREATORS
========

Table: creators

Fields:

- id
- name
- image_url
- short_description
- profile_url
- is_anonymous boolean default false
- status
- sort_order
- created_at
- updated_at

Rules:

- Creator can be linked to many products
- Creator can be linked to many stories
- Anonymous creators remain connected in database but hidden on frontend

========================================
ORGANISATIONS
=============

Table: organisations

Fields:

- id
- name
- image_url
- short_description

Optional internal page:

- slug nullable

Optional external website:

- external_url nullable

Meta:

- status
- sort_order
- created_at
- updated_at

========================================
STORIES
=======

Table: stories

Fields:

- id
- title
- slug
- image_url
- short_description

Optional relations:

- creator_id nullable
- organisation_id nullable

Meta:

- status
- sort_order
- created_at
- updated_at

Rules:

Stories are internal website pages.

Frontend routing:

/stories/{slug}

Database stores metadata only.

========================================
CATEGORIES
==========

Table: categories

Fields:

- id
- name
- slug
- image_url
- status
- sort_order
- created_at
- updated_at

Rules:

Managed from admin panel.

Products may belong to multiple categories.

========================================
PRODUCTS
========

Table: products

Fields:

- id
- title
- slug

Descriptions:

- short_description
- full_description

Images:

- main_image_url

Pricing:

- price_gbp decimal(10,2)

BrushPast fields:

- story_number nullable
- product_type nullable
- medium nullable
- qr_story_url nullable
- edition_number nullable
- total_edition_size nullable
- profit_share_note nullable
- impact_note nullable

Inventory:

inventory_type enum:

- single
- limited
- unlimited

inventory_quantity nullable

Shipping:

- weight nullable
- dimensions nullable

Meta:

- status
- sort_order
- created_at
- updated_at

========================================
PRODUCT IMAGES
==============

Table: product_images

Fields:

- id
- product_id
- image_url
- sort_order

Rules:

Main image stays in products table.

Additional gallery images are stored here.

========================================
PRODUCT VARIANTS
================

Table: product_variants

Fields:

- id
- product_id

Variant:

- variant_name

Examples:

Size S
Size M
Size L
Black
White
Framed
Unframed

Inventory:

inventory_type

- single
- limited
- unlimited

inventory_quantity nullable

Pricing:

- sku unique
- price_override nullable

Meta:

- status
- sort_order
- created_at
- updated_at

Rules:

Every variant has its own SKU.

Every variant has independent inventory.

========================================
RELATION TABLES
===============

product_creators

- product_id
- creator_id

product_stories

- product_id
- story_id

product_organisations

- product_id
- organisation_id

product_categories

- product_id
- category_id

========================================
ORDERS
======

Guest checkout only.

Table: orders

Customer:

- first_name
- last_name
- email
- phone nullable

Shipping:

- address_line_1
- address_line_2 nullable
- city
- county nullable
- postcode
- country

Courier:

- courier_name
- shipping_method_name
- shipping_price

Payment:

payment_method enum:

- card
- cash_on_delivery

payment_status enum:

- pending
- paid
- failed
- refunded

Order status enum:

- pending
- confirmed
- packed
- shipped
- delivered
- cancelled
- refunded

Financial:

- subtotal
- shipping_total
- grand_total

Notes:

- customer_note nullable
- admin_note nullable

Timestamps:

- created_at
- updated_at

========================================
ORDER ITEMS
===========

Table: order_items

Fields:

- order_id
- product_id nullable
- variant_id nullable

Snapshot fields:

- product_title
- sku
- quantity
- unit_price
- line_total
- edition_number nullable

Rules:

Must preserve historical product information.

Future price changes must not affect previous orders.

========================================
ORDER STATUS HISTORY
====================

Table: order_status_history

Fields:

- order_id
- previous_status
- new_status
- changed_at
- changed_by nullable

Rules:

Every order status change creates a history record.

========================================
INVENTORY LOGIC
===============

When payment_status becomes paid:

single:
inventory - 1

limited:
inventory - 1

unlimited:
ignore inventory

Inventory should never become negative.


========================================
CUSTOMER MESSAGES
========================================

Table: customer_messages

Purpose:

Store messages submitted from any frontend form.

Examples:

- Contact Form
- Contributor Application
- Organisation Enquiry
- General Enquiry
- Future Forms

Fields:

- id

Customer information:

- customer_info text nullable

Examples:

"John Smith | john@email.com | +44 123456789"

Form source:

- source_form text nullable

Examples:

"Contact Form"
"Become a Contributor"
"Organisation Application"

Message:

- message text nullable

Meta:

- created_at

Rules:

All three content fields are nullable.

This table is independent and has no foreign key relationships.

Messages should be manageable from the admin panel.

Higher sort_order values appear first.


========================================
OUTPUT REQUIREMENT
==================

Return ONLY the complete Supabase PostgreSQL migration.
