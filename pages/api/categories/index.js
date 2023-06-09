import conn from "@/lib/db";
import { uuid } from 'uuidv4';

async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const result = await conn.query("SELECT i.id, i.name FROM category i");
      res.status(200).json({ success: true, categories: result.rows});
    } catch ( error ) {
      console.log( error );
      res.status(500).json({ success: false, message: error.toString() });
    }
  }

  if (req.method === "POST") {

    const data = req.body;

    const { name } = data;

    if (!name) {
      res.status(422).json({
        success: false,
        message: "No category name especified"
      });
      return;
    }

    try {
      const existingResult = await conn.query(
        "SELECT * FROM category c " +
        "WHERE c.name = '" + name.trim() + "' "
      );

      if (existingResult.rowCount > 0) {
        res.status(200).json({ success: false, message: "Category already exists" });
        return;
      }

      const insertResult = await conn.query(
        'INSERT INTO category(id, name) VALUES($1, $2)',
        [uuid(), name]
      );

      res.status(200).json({ success: true });
    } catch ( error ) {
      console.log( error );
      res.status(500).json({ success: false, message: error.toString() });
    }
  }
}

export default handler;