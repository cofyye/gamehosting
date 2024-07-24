FROM openjdk:21-jdk-buster

# Instalirajte wget
RUN apt-get update && apt-get install -y wget

WORKDIR /data

# Preuzmite Spigot jar datoteku i preimenujte je u server.jar
RUN wget https://download.getbukkit.org/spigot/spigot-1.21.jar -O server.jar

# Expose port 25565
EXPOSE 25565

# Pokrenite server sa željenim parametrima
CMD ["java", "-Xms2G", "-Xmx2G", "-jar", "server.jar", "nogui"]