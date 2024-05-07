#!/bin/bash

# Install required packages
echo "Installing required packages..."
apt update
apt install -y openssh-server docker.io curl

# Check if OpenSSH server is installed and running
if ! systemctl is-active --quiet sshd; then
    echo "OpenSSH server is not running. Starting OpenSSH server..."
    systemctl start sshd
fi

# Check if PermitRootLogin is set properly in sshd_config
sshd_config="/etc/ssh/sshd_config"
if grep -q '^PermitRootLogin\s*\(prohibit-password\|yes\|without-password\)' "$sshd_config"; then
    echo "PermitRootLogin is set properly in $sshd_config."
else
    echo "PermitRootLogin is not set properly in $sshd_config."
    echo "Setting PermitRootLogin to prohibit-password..."
    sed -i 's/^#PermitRootLogin.*/PermitRootLogin prohibit-password/' "$sshd_config"
    systemctl restart sshd
fi

# Check Docker configuration
echo "Checking Docker Configuration..."
if ! systemctl is-active --quiet docker; then
    echo "Docker daemon is not running. Starting Docker daemon..."
    systemctl start docker
fi

echo "Docker configuration checked and Docker daemon is running."

# Run Coolify installation script
echo "Running Coolify installation script..."
# curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
