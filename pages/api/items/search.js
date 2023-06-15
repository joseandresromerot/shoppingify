import conn from "@/lib/db";

async function handler(req, res) {
  const keyword = req.query.keyword;

  if (req.method === "GET") {
    try {
      const result = await conn.query("SELECT i.id, i.name, c.name as category FROM item i INNER JOIN category c ON i.category_id = c.id WHERE i.name ILIKE $1", [`%${keyword}%`]);

      res.status(200).json({ success: true, items: result.rows});
    } catch ( error ) {
      console.log( error );
      res.status(500).json({ success: false, message: error.toString() });
    }
  }
}

export default handler;