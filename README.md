# **Group Delivery App - Docker Deployment Guide**

## **Project Overview**

Group Delivery is a collaborative shopping platform where users can register, create or join groups, and add products from various stores to a shared shopping cart. It supports seamless store management, group-based shopping, and user authentication.

---

## **How the Application Works**

### **Features**

- **User Management**:

  - Register/Login with unique credentials.
  - View and manage personal profiles and group memberships.
- **Group Management**:

  - Create unique 6-character group codes.
  - Join existing groups using a valid group code.
- **Store Management**:

  - Search for stores by ZIP code.
  - Visit stores and browse available products.
- **Cart Management**:

  - Add items to the shared shopping cart.
  - View and update cart contents collaboratively.

---

## **Technologies Used**

- **Backend**: Flask API
- **Frontend**: React.js with Axios for HTTP requests
- **Database**: MySQL/PostgreSQL (using direct SQL queries)
- **Containerization**: Docker + Docker Compose

---

## **Getting Started with Docker Compose**

### **1. Prerequisites**

- **Docker**: [Install Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: [Install Docker Compose](https://docs.docker.com/compose/install/)

---

## **Setup and Installation**

### **2. Clone the Repository**

```bash
git clone https://github.com/your-repository/group-delivery.git
cd group-delivery
```

### 3. Configurer Environment Variables

```
DATABASE_USER=postgres
DATABASE_PASSWORD=yourpassword
DATABASE_NAME=group_delivery_db
DATABASE_HOST=db
DATABASE_PORT=5432
FLASK_ENV=development
SECRET_KEY=your_secret_key
```

### 4. Build and Run Docker Containers

```
docker-compose up --build
```

This command will:

* Build all services (backend, frontend, database).
* Start all containers in detached mode.

### 5. Access the Application

* **Frontend: [http://localhost:3000](http://localhost:3000)**
* **Backend API: [http://localhost:5001](http://localhost:5001)**

## **Docker Commands Reference**

### **Stop All Containers**

```bash
docker-compose down
```

Stops and removes all running containers defined in the **docker-compose.yml** file.

### Stop and Remove Containers, Volumes, and Networks

```bash
docker-compose dow
```

Stops and removes all containers, networks, and volumes associated with the project.

### Rebuild and Restart Containers

```bash
docker-compose down
```

Builds and runs all containers defined in the **docker-compose.yml** file.

### **Check Docker Logs**

```bash
docker-compose down
```

Continuously streams logs from running containers for debugging purposes.

### **View Running Containers**

```bash
docker ps
```

Lists all currently running containers.

## Folder Structure

group-delivery/
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   │   ├── users.py
│   │   │   ├── groups.py
│   │   │   ├── cart.py
│   │   └── db_utils.py
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── HomePage.js
│   │   │   ├── Profile.js
│   │   │   ├── Cart.js
│   │   │   └── StoresPage.js
│   └── Dockerfile
├── docker-compose.yml
├── .env
└── README.md


## Deployment Check

1. Ensure Docker is running.
2. Clone the repository.
3. Configure environemnt variables in .env
4. Run Docker Compose
5. Verify that services are running correctly
6. Acces the application via http://localhost:3000

## License

This project is licensed under the MIT License
