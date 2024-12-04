# Use the official Python image as a base
FROM python:3.10-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install the Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire server directory into the container
COPY . .

# Set environment variables
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_RUN_PORT=5001

# Expose port 5000 for Flask
EXPOSE 5001

# Command to run the Flask app
CMD ["flask", "run"]