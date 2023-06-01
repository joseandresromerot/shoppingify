import conn from "@/lib/db";
import { hashPassword } from "@/lib/auth";
import { uuid } from 'uuidv4';

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;

  const { username, password, fullname } = data;

  if (!username || !password || !fullname || password.trim().length < 8) {
    res.status(422).json({
      success: false,
      message: "Invalid input"
    });
  }

  try {
    const userResult = await conn.query(
      "SELECT * FROM appuser WHERE username = $1",
      [username]
    );

    if (userResult.rowCount > 0) {
      res.status(422).json({ success: false, message: "Username already taken" });
      return;
    }

    const hashedPassword = await hashPassword(password);
    const query = 'INSERT INTO appuser(id, username, password, fullname) VALUES($1, $2, $3, $4)';
    const result = await conn.query(
      query,
      [uuid(), username, hashedPassword, fullname]
    );

    res.status(201).json({ success: true, message: "User created successfully! Please log in" });
  } catch ( error ) {
    console.log( error );
    res.status(500).json({ success: false, message: error.toString() });
  }
}

export default handler;