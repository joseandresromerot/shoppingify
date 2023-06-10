import conn from "@/lib/db";
import { uuid } from 'uuidv4';

async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const result = await conn.query("SELECT i.id, i.name, c.name as category FROM item i INNER JOIN category c ON i.category_id = c.id");
      res.status(200).json({ success: true, items: result.rows});
    } catch ( error ) {
      console.log( error );
      res.status(500).json({ success: false, message: error.toString() });
    }
  }

  if (req.method === "POST") {

    const data = req.body;

    const { name, note, image_url, category_id } = data;

    if (!name) {
      res.status(422).json({
        success: false,
        message: "No item name especified"
      });
      return;
    }

    if (!category_id) {
      res.status(422).json({
        success: false,
        message: "No category especified"
      });
      return;
    }

    try {
      const existingResult = await conn.query(
        "SELECT * FROM item c " +
        "WHERE c.name = '" + name.trim() + "' "
      );

      if (existingResult.rowCount > 0) {
        res.status(200).json({ success: false, message: "Item already exists" });
        return;
      }

      const insertResult = await conn.query(
        'INSERT INTO item(id, name, note, image_url, category_id) VALUES($1, $2, $3, $4, $5)',
        [uuid(), name, note, image_url, category_id]
      );

      const result = await conn.query("SELECT i.id, i.name, c.name as category FROM item i INNER JOIN category c ON i.category_id = c.id");

      res.status(200).json({ success: true, items: result.rows });
    } catch ( error ) {
      console.log( error );
      res.status(500).json({ success: false, message: error.toString() });
    }
  }
}

export default handler;