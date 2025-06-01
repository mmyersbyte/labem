export function rootHandler(req, res) {
  res.send(`
    <h1>🔬 Labem API - RESTful Service</h1>
    <p>This API was developed using Node.js, Express, and MongoDB with a focus on scalability, modularity, and security.</p>
    <p>Endpoints include user authentication (JWT), file uploads (Multer), and data management using Mongoose ODM.</p>
    <p><strong>Developer:</strong> Pedro Victor (github: mmyersbyte)</p>
    <p><a href="https://github.com/mmyersbyte" target="_blank">View project on GitHub</a></p>
  `);
}
