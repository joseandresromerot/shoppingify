import conn from "@/lib/db";

async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const result = await conn.query(
        "SELECT i.id, i.name, (count(sli.amount) * 100 / " +
        "(SELECT COUNT(sli2.amount) FROM shopping_list_item sli2)) as percentage " +
        "FROM shopping_list_item sli " +
        "INNER JOIN item i ON sli.item_id = i.id " +
        "GROUP BY i.id, i.name " +
        "ORDER BY percentage DESC "
      );
      res.status(200).json({ success: true, top: result.rows});
    } catch ( error ) {
      console.log( error );
      res.status(500).json({ success: false, message: error.toString() });
    }
  }
}

export default handler;