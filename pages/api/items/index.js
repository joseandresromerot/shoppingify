import conn from "@/lib/db";

async function handler(req, res) {
  if (req.method !== "GET") {
    return;
  }

  try {
    const result = await conn.query("SELECT i.id, i.name, c.name as category FROM item i INNER JOIN category c ON i.category_id = c.id");
    res.status(200).json({ success: true, items: result.rows});
  } catch ( error ) {
    console.log( error );
    res.status(500).json({ success: false, message: error.toString() });
  }
}

export default handler;