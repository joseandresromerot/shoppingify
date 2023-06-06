import conn from "@/lib/db";
import { getToken } from "next-auth/jwt"

async function handler(req, res) {
  if (req.method !== "GET") {
    return;
  }

  try {
    const token = await getToken({ req });

    if (!token) {
      res.status(500).json({ success: false, message: "User not logged in" });
      return;
    }

    const result = await conn.query(
      "SELECT * FROM shopping_list sl " +
      "WHERE sl.state = 'active' AND sl.created_by = '" + token.user.id + "' " +
      "ORDER BY sl.created_on DESC LIMIT 1"
    );

    let activeShoppingList = { items: [] };

    /*if (result.rowCount == 0) {
      //res.status(500).json({ success: false, message: "No active shopping list" });
      res.status(200).json({ success: true, shoppingList: null});
      return;
    }*/

    if (result.rowCount > 0) {
        activeShoppingList = {
          ...result.rows[0]
        };

        const itemsResult = await conn.query(
          "SELECT i.id, i.name, c.name as category, sli.checked, sli.amount " +
          "FROM shopping_list_item sli " +
          "INNER JOIN item i ON sli.item_id = i.id " +
          "INNER JOIN category c ON i.category_id = c.id " +
          "WHERE sli.shopping_list_id = '" + activeShoppingList.id + "' "
        );
    
        activeShoppingList.items = itemsResult.rows;
    }

    res.status(200).json({ success: true, shoppingList: activeShoppingList});
  } catch ( error ) {
    console.log( error );
    res.status(500).json({ success: false, message: error.toString() });
  }
}

export default handler;