#!/bin/bash

# Check if script is run as root
if [ "$EUID" -ne 0 ]; then
  echo "Please run the script as root."
  exit 254
fi

# Update & Upgrade VPS/Dedicated, then install vsftpd
echo "Updating & Upgrading VPS/Dedicated, Installing vsftpd..."
apt-get update && apt-get upgrade -y

# Check if vsftpd package is available
if apt-cache policy vsftpd | grep -q 'Candidate:'; then
  apt-get update
  apt-get install -y vsftpd
else
  echo "vsftpd package not found."
  exit 254
fi

# Backup original configuration
echo "Creating a backup of the original configuration..."
if cp /etc/vsftpd.conf /etc/vsftpd.conf.bak; then
  echo "Backup created successfully."
else
  echo "Failed to create backup."
  exit 254
fi

# Creating a new configuration
echo "Creating a new configuration..."
cat <<EOL > /etc/vsftpd.conf
listen=NO
listen_ipv6=YES
anonymous_enable=NO
local_enable=YES
write_enable=YES
dirmessage_enable=YES
use_localtime=YES
xferlog_enable=YES
connect_from_port_20=YES
chroot_local_user=YES
secure_chroot_dir=/var/run/vsftpd/empty
pam_service_name=vsftpd
rsa_cert_file=/etc/ssl/certs/ssl-cert-snakeoil.pem
rsa_private_key_file=/etc/ssl/private/ssl-cert-snakeoil.key
ssl_enable=NO
user_sub_token=\$USER
local_root=/home/\$USER
allow_writeable_chroot=YES
userlist_enable=YES
userlist_file=/etc/vsftpd.userlist
userlist_deny=NO
EOL

# Creating an empty vsftpd.userlist file
echo "Creating an empty vsftpd.userlist file..."
echo "" > /etc/vsftpd.userlist

# Restarting vsftpd service
echo "Restarting vsftpd service..."
if systemctl restart vsftpd; then
  echo "vsftpd service restarted successfully."
else
  echo "Failed to restart vsftpd service."
  exit 254
fi

# Enabling vsftpd service to start automatically at boot
echo "Enabling vsftpd service to start automatically at boot..."
if systemctl enable vsftpd; then
  echo "vsftpd service enabled to start at boot."
else
  echo "Failed to enable vsftpd service to start at boot."
  exit 254
fi

echo "The installation and configuration of vsftpd is complete."