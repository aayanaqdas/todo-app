import connectionPool from "@/lib/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const client = await connectionPool.connect();
      const result = await client.query("SELECT * FROM tasks");
      client.release();
      res.status(200).json(result.rows);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ error: "Failed to fetch tasks" });
    }
  } else if (req.method === "POST") {
    try {
      const { name, description } = req.body;
      const client = await connectionPool.connect();
      await client.query(
        "INSERT INTO tasks (name, description) VALUES ($1, $2)",
        [name, description]
      );

      // Fetch the newest task
      const result = await client.query(
        "SELECT * FROM tasks ORDER BY id DESC LIMIT 1"
      );
      const newestTask = result.rows[0];
      client.release();
      res
        .status(201)
        .json({ message: "Task added successfully", newTask: newestTask });
    } catch (error) {
      console.error("Error adding task:", error);
      res.status(500).json({ error: "Failed to add task" });
    }
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.body;
      const client = await connectionPool.connect();
      await client.query("DELETE FROM tasks WHERE id = $1", [id]);
      client.release();
      res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).json({ error: "Failed to delete task" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
