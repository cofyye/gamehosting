#!/bin/bash

# Check if script is run as root
if [ "$EUID" -ne 0 ]; then
  echo "Please run the script as root."
  exit 254
fi

# Check if username and password are provided
if [ -z "$1" ] || [ -z "$2" ]; then
  echo "Usage: $0 <username> <password>"
  exit 254
fi

USERNAME=$1
PASSWORD=$2

# Check if user already exists
if id "$USERNAME" &>/dev/null; then
  echo "User $USERNAME already exists."
  exit 254
fi

# Create a new user without a home directory and without shell access
useradd -m -d /home/$USERNAME -s /bin/bash $USERNAME
if [ $? -ne 0 ]; then
  echo "Failed to add user $USERNAME."
  exit 254
fi

# Set password for the user
echo "$USERNAME:$PASSWORD" | chpasswd
if [ $? -ne 0 ]; then
  echo "Failed to set password for user $USERNAME."
  exit 254
fi

# Verify password was set correctly
if ! su -c "exit" -s /bin/bash $USERNAME; then
  echo "Password for user $USERNAME may not have been set correctly."
  exit 254
fi

# Add user to vsftpd userlist
echo $USERNAME >> /etc/vsftpd.userlist
if [ $? -ne 0 ]; then
  echo "Failed to add user $USERNAME to /etc/vsftpd.userlist."
  exit 254
fi

# Set ownership and permissions for the user's home directory
chown -R $USERNAME: /home/$USERNAME
chmod -R 755 /home/$USERNAME

# Restarting vsftpd service
if ! systemctl restart vsftpd; then
  echo "Failed to restart vsftpd service."
  exit 254
fi

echo "User $USERNAME added successfully and configured for vsftpd."