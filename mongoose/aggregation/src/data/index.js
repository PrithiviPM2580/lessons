// Fake user data
export const usersData = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    role: "user",
    isActive: true,
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    role: "admin",
    isActive: true,
  },
  {
    firstName: "Robert",
    lastName: "Johnson",
    email: "robert.johnson@example.com",
    role: "user",
    isActive: true,
  },
  {
    firstName: "Emily",
    lastName: "Williams",
    email: "emily.williams@example.com",
    role: "user",
    isActive: false,
  },
  {
    firstName: "Michael",
    lastName: "Brown",
    email: "michael.brown@example.com",
    role: "admin",
    isActive: true,
  },
  {
    firstName: "Sarah",
    lastName: "Davis",
    email: "sarah.davis@example.com",
    role: "user",
    isActive: true,
  },
  {
    firstName: "David",
    lastName: "Miller",
    email: "david.miller@example.com",
    role: "user",
    isActive: true,
  },
  {
    firstName: "Lisa",
    lastName: "Wilson",
    email: "lisa.wilson@example.com",
    role: "user",
    isActive: true,
  },
];

// Fake post data (author references will be set based on user IDs)
export const postsData = [
  {
    title: "Getting Started with Node.js",
    content:
      "Node.js is a powerful JavaScript runtime that allows you to build scalable server-side applications. In this post, we'll explore the basics of Node.js and how to get started with building your first application.",
    tags: ["nodejs", "javascript", "backend"],
    views: 150,
    isPublished: true,
  },
  {
    title: "Understanding MongoDB and Mongoose",
    content:
      "MongoDB is a popular NoSQL database that offers flexibility and scalability. Mongoose is an ODM (Object Document Mapper) that provides a schema-based solution for MongoDB. Let's dive deep into how to effectively use Mongoose.",
    tags: ["mongodb", "mongoose", "database"],
    views: 230,
    isPublished: true,
  },
  {
    title: "REST API Best Practices",
    content:
      "Building a REST API requires following certain conventions and best practices to ensure your API is secure, scalable, and easy to maintain. This article covers the essential best practices for building REST APIs.",
    tags: ["api", "rest", "backend", "best-practices"],
    views: 180,
    isPublished: true,
  },
  {
    title: "Async/Await in JavaScript",
    content:
      "Async/await is a modern way to handle asynchronous operations in JavaScript. It makes your code more readable and easier to understand compared to callbacks and promises. Learn how to effectively use async/await in your projects.",
    tags: ["javascript", "async", "promises"],
    views: 320,
    isPublished: true,
  },
  {
    title: "Database Indexing Strategies",
    content:
      "Database indexing is crucial for improving query performance. In this article, we'll explore various indexing strategies and how to implement them in MongoDB to optimize your application's performance.",
    tags: ["database", "mongodb", "performance", "indexing"],
    views: 95,
    isPublished: true,
  },
  {
    title: "Introduction to React Hooks",
    content:
      "React Hooks revolutionized how we write React components. Learn about useState, useEffect, and other essential hooks to build modern React applications.",
    tags: ["react", "javascript", "frontend", "hooks"],
    views: 420,
    isPublished: true,
  },
  {
    title: "Docker for Beginners",
    content:
      "Docker simplifies application deployment by containerizing your applications. This guide will help you understand Docker basics and how to containerize your first application.",
    tags: ["docker", "devops", "containers"],
    views: 275,
    isPublished: true,
  },
  {
    title: "GraphQL vs REST",
    content:
      "Comparing GraphQL and REST APIs. Understand the differences, advantages, and when to use each approach for your next project.",
    tags: ["graphql", "rest", "api", "backend"],
    views: 190,
    isPublished: true,
  },
  {
    title: "TypeScript Best Practices",
    content:
      "TypeScript adds type safety to JavaScript. Learn the best practices for writing clean, maintainable TypeScript code in your projects.",
    tags: ["typescript", "javascript", "best-practices"],
    views: 310,
    isPublished: true,
  },
  {
    title: "Microservices Architecture",
    content:
      "Understanding microservices architecture and how it differs from monolithic applications. Learn when and how to implement microservices.",
    tags: ["architecture", "microservices", "backend"],
    views: 145,
    isPublished: false,
  },
  {
    title: "CSS Grid Layout Guide",
    content:
      "Master CSS Grid Layout with this comprehensive guide. Learn how to create complex, responsive layouts with ease.",
    tags: ["css", "frontend", "layout", "design"],
    views: 260,
    isPublished: true,
  },
  {
    title: "JWT Authentication Explained",
    content:
      "JSON Web Tokens (JWT) are widely used for authentication. Learn how JWT works and how to implement secure authentication in your applications.",
    tags: ["security", "authentication", "jwt", "backend"],
    views: 380,
    isPublished: true,
  },
];

// Fake comment data (post and author references will be set based on IDs)
export const commentsData = [
  {
    content: "Great article! This really helped me understand Node.js better.",
    isSpam: false,
  },
  {
    content: "Thanks for sharing this. Very informative!",
    isSpam: false,
  },
  {
    content: "Could you explain more about event loop?",
    isSpam: false,
  },
  {
    content: "Best tutorial I've found on Mongoose!",
    isSpam: false,
  },
  {
    content: "The schema examples are really helpful.",
    isSpam: false,
  },
  {
    content: "How do you handle complex relationships?",
    isSpam: false,
  },
  {
    content: "I disagree with point #3, but overall good article.",
    isSpam: false,
  },
  {
    content: "Check out my website for more tips! www.spam.com",
    isSpam: true,
  },
  {
    content: "This is exactly what I was looking for!",
    isSpam: false,
  },
  {
    content: "Can you make a video tutorial on this?",
    isSpam: false,
  },
  {
    content: "Awesome explanation of async/await!",
    isSpam: false,
  },
  {
    content: "I had trouble with promises before, this helps a lot.",
    isSpam: false,
  },
  {
    content: "What about error handling with async/await?",
    isSpam: false,
  },
  {
    content: "Buy cheap products here! Limited time offer!",
    isSpam: true,
  },
  {
    content: "The indexing strategies really improved my query performance!",
    isSpam: false,
  },
  {
    content: "Could you cover compound indexes in more detail?",
    isSpam: false,
  },
  {
    content: "Very practical examples. Thanks!",
    isSpam: false,
  },
  {
    content: "React Hooks changed everything for me!",
    isSpam: false,
  },
  {
    content: "useEffect is still confusing, any tips?",
    isSpam: false,
  },
  {
    content: "Great comparison between custom hooks and regular functions.",
    isSpam: false,
  },
  {
    content: "Docker made deployment so much easier.",
    isSpam: false,
  },
  {
    content: "What about Docker Compose for multi-container apps?",
    isSpam: false,
  },
  {
    content: "I prefer GraphQL over REST for complex APIs.",
    isSpam: false,
  },
  {
    content: "REST is still better for simple CRUD operations.",
    isSpam: false,
  },
  {
    content: "TypeScript caught so many bugs in my code!",
    isSpam: false,
  },
  {
    content: "The type inference examples are gold!",
    isSpam: false,
  },
  {
    content: "Microservices can be overkill for small projects.",
    isSpam: false,
  },
  {
    content: "What tools do you recommend for microservices?",
    isSpam: false,
  },
  {
    content: "CSS Grid is so much better than floats!",
    isSpam: false,
  },
  {
    content: "Finally understand how grid areas work!",
    isSpam: false,
  },
  {
    content: "JWT is great but remember to use HTTPS!",
    isSpam: false,
  },
  {
    content: "How do you handle token refresh?",
    isSpam: false,
  },
  {
    content: "Security best practices are crucial. Thanks!",
    isSpam: false,
  },
];
