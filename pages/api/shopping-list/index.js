import conn from "@/lib/db";
import { getToken } from "next-auth/jwt";
import { uuid } from 'uuidv4';

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;

  const { activeShoppingList } = data;
  let shoppingListId = activeShoppingList.id;
  const shoppingListName = activeShoppingList.name;
  const items = activeShoppingList.items;

  if (!activeShoppingList) {
    res.status(422).json({
      success: false,
      message: "No shopping list specified"
    });
    return;
  }

  if (activeShoppingList.items.length == 0) {
    res.status(422).json({
      success: false,
      message: "Add items for the shopping list"
    });
    return;
  }

  if(!activeShoppingList.name) {
    res.status(422).json({
      success: false,
      message: "Enter a valid name for the shopping list"
    });
    return;
  }

  try {

    const token = await getToken({ req });

    if (!token) {
      res.status(500).json({ success: false, message: "User not logged in" });
      return;
    }

    if(!shoppingListId) {
      shoppingListId = uuid();
      const insertResult = await conn.query(
        'INSERT INTO shopping_list(id, name, created_on, state, created_by) VALUES($1, $2, NOW(), $3, $4)',
        [shoppingListId, shoppingListName, "active", token.user.id]
      );
    } else {
      const updateResult = await conn.query(
        'UPDATE shopping_list SET name = $1 WHERE id = $2',
        [shoppingListName, shoppingListId]
      );
    }

    const deleteResult = await conn.query(
      'DELETE FROM shopping_list_item WHERE shopping_list_id = $1',
      [shoppingListId]
    );

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const insertItemResult = await conn.query(
        'INSERT INTO shopping_list_item(id, shopping_list_id, item_id, checked, amount) VALUES($1, $2, $3, $4, $5)',
        [uuid(), shoppingListId, item.id, item.checked, item.amount]
      );
    }


    const result = await conn.query(
      "SELECT * FROM shopping_list sl " +
      "WHERE sl.state = 'active' AND sl.created_by = '" + token.user.id + "' " +
      "ORDER BY sl.created_on DESC LIMIT 1"
    );

    if (result.rowCount == 0) {
      res.status(500).json({ success: false, message: "Shopping list couldn't be created" });
      return;
    }

      const activeShoppingList = {
        ...result.rows[0],
        editing: false
      };

    const itemsResult = await conn.query(
      "SELECT i.id, i.name, c.name as category, sli.checked, sli.amount " +
      "FROM shopping_list_item sli " +
      "INNER JOIN item i ON sli.item_id = i.id " +
      "INNER JOIN category c ON i.category_id = c.id " +
      "WHERE sli.shopping_list_id = '" + activeShoppingList.id + "' "
    );

    activeShoppingList.items = itemsResult.rows;

    res.status(200).json({ success: true, shoppingList: activeShoppingList});
  } catch ( error ) {
    console.log( error );
    res.status(500).json({ success: false, message: error.toString() });
  }
}

export default handler;