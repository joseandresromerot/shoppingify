import conn from "@/lib/db";

async function handler(req, res) {
  const id = req.query.id;

  if (req.method === "GET") {
    try {
      const result = await conn.query("SELECT sl.*, TO_CHAR(sl.finished_on, 'YYYY-mm-dd') AS finished_on_text FROM shopping_list sl WHERE sl.id = $1", [id]);

      if (result.rowCount === 0) {
        res.status(500).json({ success: false, message: "Shopping list not found" });
        return;
      }

      const shoppingList = {
        ...result.rows[0]
      };

      const itemsResult = await conn.query("SELECT i.*, c.name as category, sli.amount FROM shopping_list_item sli INNER JOIN item i ON sli.item_id = i.id INNER JOIN category c ON i.category_id = c.id WHERE sli.shopping_list_id = $1", [id]);

      shoppingList.items = itemsResult.rows;

      res.status(200).json({ success: true, shoppingList });
    } catch ( error ) {
      console.log( error );
      res.status(500).json({ success: false, message: error.toString() });
    }
  }
}

export default handler;