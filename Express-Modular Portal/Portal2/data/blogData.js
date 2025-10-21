const blogPosts = [
    {
        id: 1,
        title: "Understanding Express Routing",
        content: "Express makes routing easy and modular. Learn how to structure your routes.",
        author: "Alice",
        createdAt: "2024-06-01T10:00:00Z"
    },
    {
        id: 2,
        title: "Multi-Module API Design",
        content: "Splitting your API into modules improves maintainability and scalability.",
        author: "Bob",
        createdAt: "2024-06-02T12:30:00Z"
    },
    {
        id: 3,
        title: "Handling Comments in Express",
        content: "Comments can be managed via dedicated routes for clarity.",
        author: "Charlie",
        createdAt: "2024-06-03T09:15:00Z"
    }
];

const blogComments = [
    {
        id: 1,
        postId: 1,
        author: "Dave",
        content: "Great explanation on routing!",
        createdAt: "2024-06-01T11:00:00Z"
    },
    {
        id: 2,
        postId: 2,
        author: "Eve",
        content: "Modular design really helps with large projects.",
        createdAt: "2024-06-02T13:00:00Z"
    },
    {
        id: 3,
        postId: 1,
        author: "Frank",
        content: "Looking forward to more posts like this.",
        createdAt: "2024-06-01T12:00:00Z"
    }
];

module.exports = { blogPosts, blogComments };