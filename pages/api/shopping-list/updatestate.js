import conn from "@/lib/db";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;

  const { shoppingListId, state } = data;

  if (!shoppingListId) {
    res.status(422).json({
      success: false,
      message: "Shopping list id not specified"
    });
    return;
  }

  try {
    const updateResult = await conn.query(
      'UPDATE shopping_list SET state = $1, finished_on = NOW() WHERE id = $2',
      [state, shoppingListId]
    );

    res.status(200).json({ success: true });
  } catch ( error ) {
    console.log( error );
    res.status(500).json({ success: false, message: error.toString() });
  }
}

export default handler;