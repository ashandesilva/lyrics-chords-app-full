# ---- Build Stage ----
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app

# Install Maven in its own layer (cached unless base image changes)
RUN apk add --no-cache maven

# Copy only pom.xml first and download all dependencies.
# This layer is only invalidated when pom.xml changes, not on every source edit.
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Now copy source and build. Only this layer re-runs on source changes.
COPY src ./src
RUN mvn clean package -DskipTests -o

# ---- Run Stage ----
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

RUN apk add --no-cache curl

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
