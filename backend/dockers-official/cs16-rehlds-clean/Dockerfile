FROM ubuntu:22.04

# Define default env variables
ENV IP=0.0.0.0
ENV PORT=27015
ENV TICKRATE=333
ENV FPS_MAX=333
ENV MAP=de_dust2
ENV SLOT=32
ENV FTP_USER=dockeruser

# Make directory /gamefiles & /data
RUN mkdir -p /gamefiles /data

# Install dependencies
RUN dpkg --add-architecture i386 && \
    apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y lib32gcc-s1 wget nano unzip && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Download CS 1.6 gamefiles with Reunion, Metamod, Amxmodx etc
RUN wget https://github.com/cofyye/gamehosting-gamefiles/releases/download/cs16/cs16_rehlds_clean.zip && \
    unzip cs16_rehlds_clean.zip && \
    mv cs16_rehlds_clean/* /gamefiles && \
    rm -rf cs16_rehlds_clean cs16_rehlds_clean.zip && \
    chmod +x /gamefiles/hlds_linux && chmod +x /gamefiles/hlds_run

# Set permissions for the data directory
RUN chmod -R 777 /data

# Copy entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Set the work directory
WORKDIR /data

# Set the entrypoint
ENTRYPOINT ["/entrypoint.sh"]