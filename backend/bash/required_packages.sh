# Check if script is run as root
if [ "$EUID" -ne 0 ]; then
  echo "Please run the script as root."
  exit 254
fi

# Update & Upgrade VPS/Dedicated, then install vsftpd
echo "Updating & Upgrading VPS/Dedicated, Installing vsftpd..."
apt-get update && apt-get upgrade -y

if apt-cache policy unzip | grep -q 'Candidate:'; then
  apt-get update
  apt-get install -y unzip
else
  echo "unzip package not found."
  exit 254
fi