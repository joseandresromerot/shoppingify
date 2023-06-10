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
      "SELECT sl.*, CAST(DATE_PART('Year', sl.finished_on) AS VARCHAR) || CAST(TO_CHAR(DATE_PART('Month', sl.finished_on), 'fm00') AS VARCHAR) || " +
      "'-' || TO_CHAR(sl.finished_on, 'FMMonth YYYY') as period, TO_CHAR(sl.finished_on, 'YYYY-mm-dd') AS finished_on_text FROM shopping_list sl " +
      "WHERE sl.state <> 'active' AND sl.finished_on IS NOT NULL AND sl.created_by = '" + token.user.id + "' " +
      "ORDER BY sl.finished_on DESC"
    );

    res.status(200).json({ success: true, shoppingLists: result.rows});
  } catch ( error ) {
    console.log( error );
    res.status(500).json({ success: false, message: error.toString() });
  }
}

export default handler;