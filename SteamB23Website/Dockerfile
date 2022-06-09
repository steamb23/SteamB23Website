FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["SteamB23Website/SteamB23Website.csproj", "SteamB23Website/"]
RUN dotnet restore "SteamB23Website/SteamB23Website.csproj"
COPY . .
WORKDIR "/src/SteamB23Website"
RUN dotnet build "SteamB23Website.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "SteamB23Website.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "SteamB23Website.dll"]
