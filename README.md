
**CodePulse Blog: A Hands-On ASP.NET Core 8 & Angular Learning Project**

CodePulse is a training project designed to explore and solidify skills in full-stack web development. This blog application empowers users to write and share their thoughts, accompanied by photos, while providing a robust backend for content management.

**Key Features & Technologies**

* **Backend (ASP.NET Core 8 Web API)**
    * **Entity Framework Core (EF Core):** Efficient database interaction for storing blog posts, user data, and more.
    * **Authentication & Authorization (JWT):** Secure user registration, login, and role-based access control with JSON Web Tokens.
    * **CRUD Operations:** Create, Read, Update, and Delete blog posts and associated data.
    * **Sorting, Filtering, Pagination:** Enhanced content navigation and organization for users.
    * **Photo Upload:**  Functionality to include images within blog posts.

* **Frontend (Angular)**
    * **User Interface:**  Intuitive Angular components for a seamless user experience.
    * **API Integration:** Smooth communication with the backend API for fetching and updating data.
    * **Rich Text Editor:**  (Optional) Enable users to format their blog posts with ease.

**Project Goals**

* **Learning & Skill Development:**  Gain hands-on experience with modern web development tools and techniques.
* **Full-Stack Integration:** Understand the interplay between frontend and backend components.
* **Security Best Practices:**  Implement secure user authentication and data management.
* **Code Quality:**  Strive for clean, maintainable, and well-structured code.

**Getting Started**

1. **Prerequisites:**
   * [.NET 8 SDK](https://dotnet.microsoft.com/download)
   * [Node.js and npm](https://nodejs.org/)
   * [Angular CLI](https://angular.io/cli)
   * (Optional) Your preferred database (e.g., SQL Server, PostgreSQL)

2. **Clone Repository:**
   ```bash
   git clone https://github.com/hamedahmed100/CodePulse.git
   ```

3. **Backend Setup:**
   * Navigate to the `CodePulse.API` directory.
   * Configure your database connection in `appsettings.json`.
   * Run EF Core migrations:
      ```bash
      dotnet ef database update
      ```
   * Start the API:
      ```bash
      dotnet run
      ```

4. **Frontend Setup:**
   * Navigate to the `CodePulse.UI` directory.
   * Install dependencies:
      ```bash
      npm install
      ```
   * Start the Angular development server:
      ```bash
      ng serve
      ```

**Contributing**

Contributions and feedback are welcome! Feel free to open issues or submit pull requests.


**Disclaimer:**

This project is primarily for educational purposes. For production-level applications, additional security and performance optimizations would be necessary.
