# AI Legal Sentinel -- MVP Development Blueprint

## Vision

AI Legal Sentinel is an AI-powered legal assistance platform designed to
make legal guidance accessible, understandable, and actionable. Users
describe their situation in natural language, and the system analyzes it
using AI and a legal knowledge base to provide grounded explanations,
legal references, and suggested next steps.

The platform also bridges the gap between AI assistance and real human
support by allowing users to connect with verified lawyers.

Primary goals: - Make legal knowledge accessible to ordinary people -
Provide AI-assisted legal guidance grounded in real law - Allow seamless
escalation from AI help to real lawyers - Build a scalable legal
intelligence platform

------------------------------------------------------------------------

# 1. Technology Stack (MVP)

Frontend - Next.js (JavaScript) - Tailwind CSS - React

Backend - Next.js API Routes

Authentication - Clerk

Database - Supabase PostgreSQL

Vector Database - Supabase pgvector

AI Model - Gemini (initially) - Later: OpenAI / Claude

Payments - Razorpay

Deployment - Vercel

------------------------------------------------------------------------

# 2. Detailed Project Folder Structure

This structure follows **Next.js App Router architecture** and separates
responsibilities clearly.

    /ai-legal-sentinel
    │
    ├── app
    │   │
    │   ├── layout.js
    │   │   // Root layout of the application
    │   │   // Includes global providers, authentication wrapper, navbar
    │   │
    │   ├── page.js
    │   │   // Landing page of the platform
    │   │   // Explains product, CTA for sign-up
    │   │
    │   ├── (auth)
    │   │   ├── sign-in
    │   │   │   └── page.js
    │   │   │   // Sign in page using Clerk authentication
    │   │   │
    │   │   └── sign-up
    │   │       └── page.js
    │   │       // New user registration page
    │   │
    │   ├── dashboard
    │   │   ├── layout.js
    │   │   │   // Dashboard layout wrapper (sidebar + navbar)
    │   │   │
    │   │   ├── page.js
    │   │   │   // Main dashboard homepage
    │   │   │   // Shows quick actions: Start chat, Find lawyer
    │   │   │
    │   │   ├── chat
    │   │   │   └── page.js
    │   │   │   // Main AI chat interface
    │   │   │   // User describes legal issue here
    │   │   │
    │   │   ├── lawyers
    │   │   │   └── page.js
    │   │   │   // Lawyer marketplace page
    │   │   │   // Shows lawyer cards with rating and specialization
    │   │   │
    │   │   └── consultations
    │   │       └── page.js
    │   │       // Shows booked consultations
    │   │       // Allows chatting with assigned lawyer
    │   │
    │   ├── api
    │   │   ├── chat
    │   │   │   └── route.js
    │   │   │   // Handles AI chat requests
    │   │   │   // Steps:
    │   │   │   // 1. Receive user message
    │   │   │   // 2. Generate embedding
    │   │   │   // 3. Retrieve RAG context
    │   │   │   // 4. Call AI model
    │   │   │   // 5. Return structured response
    │   │   │
    │   │   ├── rag-search
    │   │   │   └── route.js
    │   │   │   // Performs vector similarity search
    │   │   │   // Retrieves relevant legal chunks from database
    │   │   │
    │   │   ├── lawyers
    │   │   │   └── route.js
    │   │   │   // Returns lawyer list
    │   │   │   // Supports filtering by specialization
    │   │   │
    │   │   ├── consultations
    │   │   │   └── route.js
    │   │   │   // Handles consultation creation
    │   │   │   // Links users with lawyers
    │   │   │
    │   │   └── payments
    │   │       └── route.js
    │   │       // Handles Razorpay order creation
    │   │       // Verifies payment signatures
    │
    ├── components
    │   │
    │   ├── chat
    │   │   ├── ChatWindow.jsx
    │   │   │   // Displays full conversation
    │   │   │
    │   │   ├── MessageBubble.jsx
    │   │   │   // Single chat message UI
    │   │   │
    │   │   └── ChatInput.jsx
    │   │       // Text input + send button
    │   │
    │   ├── lawyers
    │   │   ├── LawyerCard.jsx
    │   │   │   // Displays lawyer profile
    │   │   │
    │   │   └── LawyerList.jsx
    │   │       // Grid list of lawyers
    │   │
    │   ├── ui
    │   │   ├── Button.jsx
    │   │   ├── Modal.jsx
    │   │   └── Badge.jsx
    │   │   // Reusable UI components
    │   │
    │   └── layout
    │       ├── Navbar.jsx
    │       ├── Sidebar.jsx
    │       └── Footer.jsx
    │       // Layout related UI elements
    │
    ├── hooks
    │   ├── useChat.js
    │   │   // Handles chat state
    │   │   // Sends message to API
    │   │   // Receives AI response
    │   │
    │   └── useAuth.js
    │       // Wrapper for authentication logic
    │
    ├── lib
    │   │
    │   ├── supabase.js
    │   │   // Initializes Supabase client
    │   │   // Used for DB queries and vector search
    │   │
    │   ├── gemini.js
    │   │   // Gemini AI API client
    │   │   // Handles AI requests
    │   │
    │   ├── embeddings.js
    │   │   // Converts text → vector embeddings
    │   │
    │   ├── rag.js
    │   │   // Handles RAG retrieval logic
    │   │   // Calls vector search + prepares AI context
    │   │
    │   └── auth.js
    │       // Authentication helper functions
    │
    ├── rag
    │   │
    │   ├── ingest.js
    │   │   // Main ingestion controller
    │   │   // Runs full pipeline
    │   │
    │   ├── cleaner.js
    │   │   // Removes noise from legal documents
    │   │
    │   ├── chunker.js
    │   │   // Splits documents into semantic chunks
    │   │
    │   ├── embedder.js
    │   │   // Generates embeddings for each chunk
    │   │
    │   └── uploader.js
    │       // Uploads vectors to Supabase
    │
    ├── datasets
    │   └── laws
    │       // Raw legal documents (PDFs)
    │
    ├── utils
    │   ├── formatters.js
    │   │   // Helper functions for formatting responses
    │   │
    │   └── validators.js
    │       // Input validation helpers
    │
    ├── styles
    │   └── globals.css
    │   // Global CSS and Tailwind configuration
    │
    └── public
        └── images
        // Static assets

Purpose of this structure: - **app/** → UI pages and API routes -
**components/** → reusable UI building blocks - **lib/** → core services
like AI, database, embeddings - **rag/** → ingestion pipeline scripts -
**hooks/** → reusable frontend logic - **datasets/** → raw legal
datasets - **utils/** → helper functions

This separation keeps the project **clean, scalable, and
production-ready**.

------------------------------------------------------------------------

# 3. Database Schema Design

### Users Table

Stores application users.

Fields: - id - clerk_id - name - email - role (user / lawyer / admin) -
created_at

### Lawyers Table

Fields: - id - user_id - specialization - experience_years - rating -
bio - consultation_fee

### Chats Table

Fields: - id - user_id - created_at

### Messages Table

Fields: - id - chat_id - sender (user / ai) - content - created_at

### Legal Chunks Table (Vector)

Fields: - id - document_title - section_reference - content -
jurisdiction - embedding (vector)

### Consultations Table

Fields: - id - user_id - lawyer_id - status - payment_id -
scheduled_time

### Payments Table

Fields: - id - user_id - razorpay_order_id - amount - status -
created_at

------------------------------------------------------------------------

# 4. RAG Ingestion Pipeline

RAG stands for Retrieval Augmented Generation.

Purpose: Convert legal documents into a searchable knowledge base.

Pipeline Steps:

1.  Document Collection

-   Collect legal acts in PDF format
-   Store inside `/datasets/laws`

2.  Text Extraction

-   Extract raw text from PDFs

3.  Cleaning

-   Remove page numbers
-   Remove headers and formatting

4.  Chunking Split text into sections.

Recommended chunk size: 500--800 tokens

5.  Embedding Generation Convert text chunks into vector embeddings.

6.  Upload to Vector Database Store embeddings inside Supabase pgvector
    table.

Pipeline Flow

    PDF → Extract Text → Clean → Chunk → Embed → Store in Vector DB

------------------------------------------------------------------------

# 5. AI Reasoning System

AI responses must be structured.

Example response schema:

    {
      legal_area,
      risk_level,
      explanation,
      suggested_actions,
      citations,
      confidence_score
    }

Prompt Structure:

System Prompt Defines AI rules and behavior.

Context Prompt Contains retrieved legal sections from RAG.

User Prompt User described situation.

Final Prompt Structure

    System Instructions
    +
    Retrieved Legal Context
    +
    User Query

------------------------------------------------------------------------

# 6. API Architecture

Endpoints

    /api/chat
    /api/rag-search
    /api/lawyers
    /api/consultations
    /api/payments
    /api/user-profile

Responsibilities

`/api/chat` - receive user query - run RAG retrieval - call AI model -
return structured response

`/api/rag-search` - vector similarity search

`/api/lawyers` - list lawyers - fetch profiles

`/api/payments` - create Razorpay order - verify payment

------------------------------------------------------------------------

# 7. Payment Flow

Consultation Payment Process

    User selects lawyer
    ↓
    Backend creates Razorpay order
    ↓
    User completes payment
    ↓
    Payment verification
    ↓
    Consultation record created
    ↓
    User can chat with lawyer

------------------------------------------------------------------------

# 8. Security Model

Role Based Access

User - can access own chats - can book consultations

Lawyer - can access assigned consultations

Admin - full access

Supabase Row Level Security will enforce access rules.

------------------------------------------------------------------------

# 9. Logging System

AI logs should track:

-   user query
-   retrieved legal chunks
-   AI response
-   errors

Table: `ai_logs`

Purpose: - debugging - AI improvement - usage monitoring

------------------------------------------------------------------------

# 10. Development Milestones

Phase 1 Authentication + basic dashboard

Phase 2 Chat interface (without RAG)

Phase 3 RAG integration

Phase 4 Structured AI responses

Phase 5 Lawyer marketplace

Phase 6 Payments with Razorpay

Phase 7 Security rules and optimization

------------------------------------------------------------------------

# 11. Future Vision

Future expansions:

-   Court case embeddings
-   Supreme Court judgments dataset
-   Legal document generator
-   Lawyer video consultation
-   AI legal risk prediction
-   Multi-language support

Long-term goal: Build a full AI-powered legal intelligence platform.
