# UniTrail Housing - Backend Setup Guide

## Overview

The backend includes:

- **Access Model**: Admin-only authentication (NextAuth + credentials)
- **Database**: SQLite with Prisma (tables: AdminUser, Property, PropertyImage, Amenity, PropertyAmenity, Inquiry)
- **Public APIs**: Properties (list, get by slug), Inquiries (submit)
- **Admin APIs**: Protected CRUD for properties, images, inquiries

## Quick Start

### 1. Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"  # Run: openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"
ADMIN_EMAIL="housing@unitrail.in"  # For inquiry notifications
SMTP_*  # Optional: for email notifications on new inquiries
```

### 2. Database Setup

```bash
npm run db:push       # Sync schema
npm run db:seed       # Create admin + sample data
```

**Default Admin**: `admin@unitrail.in` / `admin123` — **change immediately in production!**

### 3. Run Development Server

```bash
npm run dev
```

- **Public site**: http://localhost:3000
- **Admin CMS**: http://localhost:3000/admin (login required)

## API Reference

### Public APIs (no auth)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/properties | List properties (pagination, filters) |
| GET | /api/properties/:slug_or_id | Single property by slug or id |
| POST | /api/inquiries | Submit inquiry form |
| GET | /api/amenities | List amenities (for filters) |

### Admin APIs (session required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/admin/properties | List all properties |
| POST | /api/admin/properties | Create property |
| GET | /api/admin/properties/:id | Get property |
| PUT | /api/admin/properties/:id | Update property |
| DELETE | /api/admin/properties/:id | Delete property |
| POST | /api/admin/properties/:id/images | Add image |
| DELETE | /api/admin/properties/:id/images/:imageId | Remove image |
| GET | /api/admin/inquiries | List inquiries |
| GET | /api/admin/inquiries/:id | Get inquiry |
| PUT | /api/admin/inquiries/:id | Update status (new/in_progress/closed) |

## Data Model (Prisma)

- **AdminUser**: id, name, email, passwordHash, role, lastLoginAt
- **Property**: slug, title, description, propertyType, listingType, price, location, bedrooms, bathrooms, areaSqm, furnishing, availabilityStatus, isFeatured, isActive, etc.
- **PropertyImage**: propertyId, imageUrl, caption, displayOrder
- **Amenity**: id, name
- **PropertyAmenity**: propertyId, amenityId (many-to-many)
- **Inquiry**: propertyId (nullable), name, email, phone, message, source, status, ipAddress, userAgent

## Email Notifications

Set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` in `.env` to send inquiry notifications to `ADMIN_EMAIL` when a user submits the contact/inquiry form.
