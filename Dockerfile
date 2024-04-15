# Use the official PostgreSQL image from Docker Hub
FROM postgres:latest

# Set environment variables
ENV POSTGRES_DB=mydatabase \
    POSTGRES_USER=myuser \
    POSTGRES_PASSWORD=mypassword

# Copy SQL scripts to initialize the database
# If you have any SQL scripts to initialize the database schema, you can copy them here
# For example:
# COPY init.sql /docker-entrypoint-initdb.d/

# Expose the PostgreSQL port
EXPOSE 5432

# By default, PostgreSQL will listen on all available network interfaces within the container
# No need to specify CMD as it inherits from the base image