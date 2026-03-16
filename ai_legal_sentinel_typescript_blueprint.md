# AI Legal Sentinel --- TypeScript Development Blueprint

## Project Vision

AI Legal Sentinel is a platform designed to make legal guidance more
accessible.\
Users describe their legal situation in natural language, and the AI
system analyzes it using legal datasets, retrieves relevant laws through
a RAG system, and provides structured guidance.

The system will: - Interpret user legal situations - Retrieve relevant
law sections - Provide explainable AI responses - Suggest next steps -
Connect users with real lawyers

The MVP will be built with:

-   Next.js (App Router)
-   TypeScript
-   Supabase
-   Clerk Authentication
-   Gemini AI (later OpenAI / Claude)
-   Supabase Vector DB for RAG
-   Razorpay payments

The goal is to launch an MVP first and later scale it into a
production-grade legal AI platform.

------------------------------------------------------------------------

# 1. Project Structure (TypeScript)

    /ai-legal-sentinel

    ├── app
    │
    │   ├── layout.tsx
    │   // Root layout wrapper
    │   // Adds ClerkProvider, ThemeProvider, global UI
    │
    │   ├── page.tsx
    │   // Landing page of the platform
    │
    │
    │   ├── (auth)
    │   │
    │   │   ├── sign-in/page.tsx
    │   │   // Login page
    │   │
    │   │   └── sign-up/page.tsx
    │   │   // Registration page
    │
    │
    │   ├── dashboard
    │   │
    │   │   ├── layout.tsx
    │   │   // Dashboard layout
    │   │   // Contains sidebar navigation
    │   │
    │   │   ├── page.tsx
    │   │   // Dashboard overview
    │   │
    │   │   ├── chat/page.tsx
    │   │   // Main AI chatbot page
    │   │
    │   │   ├── lawyers/page.tsx
    │   │   // Browse lawyers marketplace
    │   │
    │   │   └── consultations/page.tsx
    │   │   // User consultation history
    │
    │
    │   ├── api
    │
    │   │   ├── chat/route.ts
    │   │   // Main AI chat API endpoint
    │   │   // Handles RAG retrieval and AI reasoning
    │   │
    │   │   ├── rag-search/route.ts
    │   │   // Endpoint to query vector database
    │   │
    │   │   ├── lawyers/route.ts
    │   │   // Lawyer CRUD APIs
    │   │
    │   │   ├── consultations/route.ts
    │   │   // Consultation booking endpoint
    │   │
    │   │   └── payments/route.ts
    │   │   // Razorpay payment verification
    │
    │
    ├── components
    │
    │   ├── chat
    │   │
    │   │   ├── ChatWindow.tsx
    │   │   // Displays chat conversation
    │   │
    │   │   ├── ChatInput.tsx
    │   │   // Message input UI
    │   │
    │   │   └── MessageBubble.tsx
    │   │   // Individual message display
    │
    │
    │   ├── lawyers
    │   │
    │   │   ├── LawyerCard.tsx
    │   │   // Lawyer profile card
    │   │
    │   │   └── LawyerList.tsx
    │   │   // List/grid of lawyers
    │
    │
    │   ├── layout
    │   │
    │   │   ├── Navbar.tsx
    │   │   ├── Sidebar.tsx
    │   │   └── Footer.tsx
    │
    │
    │   └── ui
    │       ├── Button.tsx
    │       ├── Modal.tsx
    │       └── Badge.tsx
    │
    │
    ├── hooks
    │
    │   ├── useChat.ts
    │   // Chat state management
    │
    │   └── useAuth.ts
    │   // Clerk authentication wrapper
    │
    │
    ├── lib
    │
    │   ├── supabase.ts
    │   // Initialize Supabase client
    │
    │   ├── gemini.ts
    │   // Gemini AI integration
    │
    │   ├── rag.ts
    │   // RAG search logic
    │
    │   ├── embeddings.ts
    │   // Text embedding generation
    │
    │   └── auth.ts
    │   // Authentication helpers
    │
    │
    ├── services
    │
    │   ├── aiService.ts
    │   // Handles AI reasoning calls
    │
    │   ├── chatService.ts
    │   // Chat logic layer
    │
    │   ├── ragService.ts
    │   // RAG retrieval logic
    │
    │   ├── lawyerService.ts
    │   // Lawyer operations
    │
    │   └── paymentService.ts
    │   // Razorpay payment logic
    │
    │
    ├── rag
    │
    │   ├── ingest.ts
    │   // Main ingestion pipeline
    │
    │   ├── cleaner.ts
    │   // Text cleaning
    │
    │   ├── chunker.ts
    │   // Document chunking
    │
    │   ├── embedder.ts
    │   // Generate embeddings
    │
    │   └── uploader.ts
    │   // Upload chunks to vector DB
    │
    │
    ├── types
    │
    │   ├── ai.ts
    │   ├── database.ts
    │   ├── chat.ts
    │   ├── lawyer.ts
    │   └── api.ts
    │
    │   // Centralized TypeScript types
    │
    │
    ├── utils
    │
    │   ├── validators.ts
    │   └── formatters.ts
    │
    │
    ├── datasets
    │   // Raw legal datasets
    │
    ├── styles
    │   └── globals.css
    │
    └── public

------------------------------------------------------------------------

# 2. Database Schema Design (Supabase)

Tables:

users\
lawyers\
chat_sessions\
messages\
legal_documents\
legal_chunks\
consultations\
payments

Key concept:

legal_chunks table stores embeddings used for vector similarity search.

------------------------------------------------------------------------

# 3. RAG Ingestion Pipeline

The RAG pipeline processes legal documents before they are used by the
AI.

Pipeline Steps:

1.  Collect datasets
2.  Clean text
3.  Split into chunks
4.  Generate embeddings
5.  Store vectors in database

Files:

rag/cleaner.ts\
rag/chunker.ts\
rag/embedder.ts\
rag/uploader.ts

------------------------------------------------------------------------

# 4. AI Reasoning System

The reasoning system works in stages.

Step 1 --- user sends query

Step 2 --- generate embedding

Step 3 --- vector search

Step 4 --- retrieve legal context

Step 5 --- construct prompt

Step 6 --- call AI model

Step 7 --- return structured response

------------------------------------------------------------------------

# 5. API Architecture

Main APIs

/api/chat\
/api/rag-search\
/api/lawyers\
/api/consultations\
/api/payments

Each API endpoint communicates with services layer instead of directly
calling database.

------------------------------------------------------------------------

# 6. Payment Flow

User selects lawyer

↓

Create Razorpay order

↓

User completes payment

↓

Backend verifies payment

↓

Consultation is created

------------------------------------------------------------------------

# 7. Security Model

Security layers:

Authentication via Clerk

Authorization checks

Rate limiting

Prompt injection protection

AI output validation

------------------------------------------------------------------------

# 8. Development Milestones

Phase 1

Project setup

Authentication

Database setup

Chat UI

Phase 2

RAG pipeline

AI integration

Legal dataset ingestion

Phase 3

Lawyer marketplace

Consultation booking

Payment system

Phase 4

Testing

Security improvements

Deployment

------------------------------------------------------------------------

# 9. Future Vision

Future upgrades include:

Fine-tuned legal AI models

Voice-based legal assistance

Multilingual legal support

Mobile applications

Advanced legal analytics
