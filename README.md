# Project Harbor
![Screenshot 2024-04-26 184418](https://github.com/MaxAnii/ProjectHarbor/assets/96937469/47cee345-043d-488a-8268-db8ffbd6fd24)


Project Harbor is a comprehensive Project Management System designed to streamline the management and review process of student projects in engineering colleges. The system facilitates collaboration between students and professors, ensuring project success through efficient workflow and real-time updates.

## Project Structure

The project is divided into two folders:

- **Client (Frontend):** Contains the frontend of the application.
  
- **Server (Backend):** Contains the backend logic, including database configuration, S3 integration, and Nodemailer setup.

## Features

- **College Admin Registration:** College administrators can register their colleges and add unique college codes.
  
- **Department and HOD Addition:** Admins can add departments and Heads of Departments (HODs) along with their details.
  
- **Professor Registration:** HODs can add department professors with their credentials.
  
- **Student Registration:** Students can create accounts, mentioning the college code provided by their college admin.
  
- **Project Submission:** Students can submit project ideas and choose professors as mentors.
  
- **Project Review and Approval:** Mentors review and either accept or reject project ideas, providing reasons for rejection if necessary.
  
- **Project Development:** Students can upload project-related PDFs, which are saved in an S3 bucket. Mentors monitor project progress and mark projects as finalized upon completion.
  
- **Access and Monitoring:** College admins, HODs, and professors can monitor projects within their respective domains. Users have the option to update their personal details as needed.

## Workflow

1. **College Admin Registration:**
   - College administrators register their colleges and add unique college codes.
   - Student registration is enabled only after college registration.

2. **Department and HOD Addition:**
   - Admins add departments and HODs along with their details.
   - HODs receive email notifications with login credentials.

3. **Professor Registration:**
   - HODs add department professors with their credentials.
   - Professors receive email notifications about their registration.

4. **Student Registration:**
   - Students create accounts, mentioning the college code provided by their college admin.

5. **Project Submission:**
   - Students submit project ideas and choose professors as mentors.
   - Inter-departmental projects are limited to students from the same department, while inter-college projects allow participation from any student and professor within the same college.

6. **Project Review and Approval:**
   - Mentors review project ideas and either accept or reject them.
   - Accepted projects move to the "In Progress" status.

7. **Project Development:**
   - Students upload project-related PDFs, which are saved in an S3 bucket.
   - Mentors monitor project progress and mark projects as finalized upon completion.

8. **Access and Monitoring:**
   - College admins, HODs, and professors can monitor projects within their respective domains.
   - Users have the option to update their personal details as needed.





## Getting Started

To get started with Project Harbor, follow these steps:

1. ### Clone the repository:
   ```bash
   git clone  https://github.com/MaxAnii/ProjectHarbor.git

2. ### Install dependencies: 
 
  ```bash
  cd ProjectHarbor/client
  ```
  ```bash
  npm install
  ```
  ```bash
  cd ../server
  ```
  ```bash
  npm install
```

3. ### Set up environment variables:

Create a .env file in the server folder and add the necessary environment variables for database, S3, and Nodemailer configurations.
 #### Database

- Configure the postgreSQL database connection in the server folder.
- Use the following environment variables:
  - `user`: Database username.
  - `password`: Database password.
  - `host`: Database host.
  - `port`: Database port.
  - `database`: Database name.

#### Nodemailer Setup

- Configure Nodemailer in the server folder.
- Use the following environment variables:
  - `email`: Email address for sending notifications.
  - `pass`: Password for the email account.

#### S3 Integration

- Configure the S3 integration in the server folder.
- Use the following environment variables:
  - `ACCESS_KEY`: AWS Access Key.
  - `SECRET_KEY`: AWS Secret Key.
  - `REGION`: AWS region.
  - `BUCKET`: S3 bucket name.

- Additionally, if you're using a service account key for authentication (for example, with Google Cloud Storage), use:
- `jsonKey`: JSON key for authentication.

4. ### Create Database Schema:

- Before running the application, create the database schema.
- You can find the SQL schema file at `server/schema/db.sql`.
- Execute the SQL commands in your database management tool to create the necessary tables.



5. ### Run the application:

To run the application, follow these steps:

#### Start the Frontend

```bash
cd client
npm run dev
```
#### Start the Backend

```bash
cd server
node index
```

## Support

By [Ansar](https://github.com/MaxAnii) with ❤️.

Feel free to open an issue or use this as your project!
