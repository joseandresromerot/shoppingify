import conn from "@/lib/db";
import { parse, format } from "date-fns";

async function handler(req, res) {
  if (req.method !== "GET") {
    return;
  }

  try {
    const currentMonth = (new Date()).getMonth() + 1;
    let minMonth = 0;
    let maxMonth = 0;

    if (currentMonth >= 1 && currentMonth <= 4) {
      minMonth = 1;
      maxMonth = 7;
    } else if (currentMonth >= 9 && currentMonth <= 12) {
      minMonth = 6;
      maxMonth = 12;
    } else {
      minMonth = currentMonth - 3;
      maxMonth = currentMonth + 3;
    }

    const monthlySummary = [];

    for (var i = minMonth; i <= maxMonth; i++) {
      const query = "SELECT COALESCE(SUM(sli.amount), 0) AS items " +
        "FROM shopping_list_item sli " +
        "INNER JOIN shopping_list sl ON sli.shopping_list_id = sl.id " +
        "WHERE DATE_PART('Month', sl.finished_on) = " + i;
      const result = await conn.query(query);
      const year = (new Date()).getFullYear();
      const month = ("" + i).padStart(2, "0");
      const parsedDate = parse(`${year}-${month}-01`, "yyyy-MM-dd", new Date());

      monthlySummary.push({
        name: format(parsedDate, "LLLL"),
        items: result.rows[0].items
      });
    }

    res.status(200).json({ success: true, monthlySummary });
  } catch ( error ) {
    console.log( error );
    res.status(500).json({ success: false, message: error.toString() });
  }
}

export default handler;