import conn from "@/lib/db";

async function handler(req, res) {
  const id = req.query.id;

  if (req.method === "GET") {
    try {
      const result = await conn.query("SELECT i.id, i.name, i.image_url, i.note, c.name as category FROM item i INNER JOIN category c ON i.category_id = c.id WHERE i.id = $1", [id]);

      if (result.rowCount === 0) {
        res.status(500).json({ success: false, message: "Item not found" });
        return;
      }

      res.status(200).json({ success: true, item: result.rows[0]});
    } catch ( error ) {
      console.log( error );
      res.status(500).json({ success: false, message: error.toString() });
    }
  }

  if (req.method === "DELETE") {
    try {
      const result = await conn.query("SELECT * FROM shopping_list_item WHERE item_id = $1", [id]);

      if (result.rowCount > 0) {
        res.status(200).json({ success: false, message: "Item cannot be deleted because it was added to other lists" });
        return;
      }

      const deleteResult = await conn.query("DELETE FROM item WHERE id = $1", [id]);

      const resultItems = await conn.query("SELECT i.id, i.name, c.name as category FROM item i INNER JOIN category c ON i.category_id = c.id");

      res.status(200).json({ success: true, items: resultItems.rows});
    } catch ( error ) {
      console.log( error );
      res.status(500).json({ success: false, message: error.toString() });
    }
  }
}

export default handler;