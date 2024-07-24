#!/bin/sh

# Check if the /data directory is empty on the host
if [ -z "$(ls -A /data | grep -v '^\..*')" ]; then
  cp -r /gamefiles/* /data/
  
  chown -R ${HOST_UID}:${HOST_GID} /data
fi

# Start the server
exec /data/hlds_run -game cstrike +ip ${IP} +port ${PORT} -secure -pingboost 3 +sys_ticrate ${TICKRATE} +fps_max ${TICKRATE} +sv_lan 0 +map ${MAP} +maxplayers ${SLOT} +servercfgfile server.cfg