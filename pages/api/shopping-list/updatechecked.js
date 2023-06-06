import conn from "@/lib/db";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;

  const { shoppingListId, itemId, checked } = data;

  if (!shoppingListId) {
    res.status(422).json({
      success: false,
      message: "Shopping list id not specified"
    });
    return;
  }

  if (!itemId) {
    res.status(422).json({
      success: false,
      message: "Item id not specified"
    });
    return;
  }

  try {
    const updateResult = await conn.query(
      'UPDATE shopping_list_item SET checked = $1 WHERE shopping_list_id = $2 AND item_id = $3',
      [checked, shoppingListId, itemId]
    );

    res.status(200).json({ success: true});
  } catch ( error ) {
    console.log( error );
    res.status(500).json({ success: false, message: error.toString() });
  }
}

export default handler;