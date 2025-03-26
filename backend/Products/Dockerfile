# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src

# Copy project files and restore dependencies
COPY ["Products/Products.csproj", "Products/"]
RUN dotnet restore "Products/Products.csproj"

# Copy everything else and build
COPY . .
WORKDIR "/src/Products"
RUN dotnet build "Products.csproj" -c Release -o /app/build

# Stage 2: Publish
FROM build AS publish
RUN dotnet publish "Products.csproj" -c Release -o /app/publish

# Stage 3: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=publish /app/publish .

# Install curl for health checks
RUN apt-get update && \
    apt-get install -y curl && \
    rm -rf /var/lib/apt/lists/*

# Health check (adjust endpoint as needed)
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:80/health || exit 1

ENTRYPOINT ["dotnet", "Products.dll"]