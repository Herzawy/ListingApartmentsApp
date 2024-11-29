Project Setup Instructions
Follow the steps below to set up the project on your local machine using Docker.

Prerequisites
Make sure you have the following software installed:

Docker: Install Docker
Docker Compose: Install Docker Compose
Steps to Set Up and Run the Project
Clone the repository
Clone the repository to your local machine using the following command:

git clone https://github.com/Herzawy/ListingApartmentsApp
cd ListingApartmentsApp
Build & up the Docker containers
In the root directory of the project (where docker-compose.yml is located), run the following command to build the Docker containers:

docker-compose up --build -d

Access the frontend
The frontend application will be accessible at:

http://localhost:3002
Open this URL in your web browser to view the application.

Access the backend
The backend API will be accessible at:

http://localhost:3001
