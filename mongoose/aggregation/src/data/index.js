// Fake user data
export const usersData = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    password: "password123",
    role: "user",
    isActive: true,
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    password: "password456",
    role: "admin",
    isActive: true,
  },
  {
    firstName: "Robert",
    lastName: "Johnson",
    email: "robert.johnson@example.com",
    password: "password789",
    role: "user",
    isActive: true,
  },
  {
    firstName: "Emily",
    lastName: "Williams",
    email: "emily.williams@example.com",
    password: "password101",
    role: "user",
    isActive: false,
  },
  {
    firstName: "Michael",
    lastName: "Brown",
    email: "michael.brown@example.com",
    password: "password202",
    role: "admin",
    isActive: true,
  },
];

// Fake post data (author references will be set based on user IDs)
export const postsData = [
  {
    title: "Getting Started with Node.js",
    content:
      "Node.js is a powerful JavaScript runtime that allows you to build scalable server-side applications. In this post, we'll explore the basics of Node.js and how to get started with building your first application.",
  },
  {
    title: "Understanding MongoDB and Mongoose",
    content:
      "MongoDB is a popular NoSQL database that offers flexibility and scalability. Mongoose is an ODM (Object Document Mapper) that provides a schema-based solution for MongoDB. Let's dive deep into how to effectively use Mongoose.",
  },
  {
    title: "REST API Best Practices",
    content:
      "Building a REST API requires following certain conventions and best practices to ensure your API is secure, scalable, and easy to maintain. This article covers the essential best practices for building REST APIs.",
  },
  {
    title: "Async/Await in JavaScript",
    content:
      "Async/await is a modern way to handle asynchronous operations in JavaScript. It makes your code more readable and easier to understand compared to callbacks and promises. Learn how to effectively use async/await in your projects.",
  },
  {
    title: "Database Indexing Strategies",
    content:
      "Database indexing is crucial for improving query performance. In this article, we'll explore various indexing strategies and how to implement them in MongoDB to optimize your application's performance.",
  },
];
