#!/bin/sh

# Check if the /data directory is empty on the host
if [ -z "$(ls -A /data | grep -v '^\..*')" ]; then
  cp -r /gamefiles/* /data/
fi

# Start the server
exec /data/hlds_run -game cstrike +ip ${ip} +port ${port} -secure -pingboost 3 +sys_ticrate ${tickrate} +fps_max ${tickrate} +sv_lan 0 +map ${map} +maxplayers ${slot} +servercfgfile server.cfg