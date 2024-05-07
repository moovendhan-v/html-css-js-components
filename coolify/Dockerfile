FROM debian:11

# Copy the installation script to the container
COPY install.sh /usr/local/bin/

# Set the script as executable
RUN chmod +x /usr/local/bin/install.sh

# Install required packages
RUN apt-get update && \
    apt-get install -y openssh-server curl

# Expose port if needed
EXPOSE 8080

# Run the installation script when the container starts
# ENTRYPOINT ["/usr/local/bin/install.sh"]


