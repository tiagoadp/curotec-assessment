# Curotec Assessment
![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

> **Current State**: Frontend is under active development (basic functionality only), Backend is production-ready with full microservices implementation.

**Developer**: Tiago Diaz (tiagoadp@gmail.com)  
**Technology Stack**: ASP.NET Core, Angular 16, SQL Server, Redis, SignalR, NgRx, Docker

## Features

### Backend (Complete)
- Microservices architecture (Products, Orders, Customers)
- RESTful APIs with Swagger documentation
- Entity Framework Core code-first migrations
- Redis caching implementation
- SQL Server database per service
- Docker containerization
- JWT Authentication (partial implementation)

### Frontend (Basic WIP)
- Angular 16 scaffold
- NgRx state management setup
- Basic product/order listing
- Authentication skeleton
- Responsive UI (needs styling)

## Technologies

| Component       | Technology                          |
|-----------------|-------------------------------------|
| Backend         | ASP.NET Core 7.0                    |
| Frontend        | Angular 16                          |
| State Management| NgRx 16                             |
| Database        | SQL Server 2022                     |
| Caching         | Redis                               |
| Containerization| Docker + Docker Compose             |
| API Docs        | Swagger/OpenAPI                     |

## Backend API Documentation (Swagger)

Access Swagger UI for API documentation at:
- Products: `http://localhost:5001/swagger`
- Orders: `http://localhost:5002/swagger` 
- Customers: `http://localhost:5003/swagger`

## Backend Commands
```
// Run all services
docker-compose up --build

// Apply migrations (manually if needed)
docker-compose exec products-api dotnet ef database update
docker-compose exec orders-api dotnet ef database update
docker-compose exec customers-api dotnet ef database update

// Run tests (from source directory)
dotnet test

// Create new migration
dotnet ef migrations add MIGRATION_NAME --project backend/Customers
dotnet ef migrations add MIGRATION_NAME --project backend/Products
dotnet ef migrations add MIGRATION_NAME --project backend/Orders
```

## Frontend Commands
```
// Install dependencies
npm install

// Development server
npm start

// Production build
npm run build

// Run tests
npm test

// Lint code
npm run lint
```

## Architecture

```
curotec-assessment/
├── backend/           # .NET Microservices
│   ├── Products/      # Product management
│   ├── Orders/        # Order processing
│   └── Customers/     # Customer profiles
├── frontend/          # Angular application
└── docker-compose.yml # Container orchestration
```

## Important Notes
```
// First-time setup:
docker-compose build --no-cache
docker-compose up -d

// Swagger requires development environment in docker-compose.yml:
environment:
  - ASPNETCORE_ENVIRONMENT=Development
```
