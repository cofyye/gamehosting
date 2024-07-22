#!/bin/bash

# Check if script is run as root
if [ "$EUID" -ne 0 ]; then
  echo "Please run the script as root."
  exit 254
fi

# Check if username is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <username>"
  exit 254
fi

USERNAME=$1

# Check if user exists
if ! id "$USERNAME" &>/dev/null; then
  echo "User $USERNAME does not exist."
  exit 254
fi

# Remove user from vsftpd userlist
if grep -q "^$USERNAME$" /etc/vsftpd.userlist; then
  sed -i "/^$USERNAME$/d" /etc/vsftpd.userlist
  if [ $? -ne 0 ]; then
    echo "Failed to remove user $USERNAME from /etc/vsftpd.userlist."
    exit 254
  fi
else
  echo "User $USERNAME not found in /etc/vsftpd.userlist."
fi

# Kill all processes owned by the user
pkill -u $USERNAME
if [ $? -ne 0 ]; then
  echo "Failed to kill processes for user $USERNAME."
  exit 254
fi

# Delete the user and their home directory
userdel -r $USERNAME
if [ $? -ne 0 ]; then
  echo "Failed to delete user $USERNAME."
  exit 254
fi

# Restarting vsftpd service
if ! systemctl restart vsftpd; then
  echo "Failed to restart vsftpd service."
  exit 254
fi

echo "User $USERNAME has been successfully deleted."