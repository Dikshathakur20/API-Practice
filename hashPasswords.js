import bcrypt from "bcryptjs";
import { connectDB } from "./config/db.js";
import sql from "mssql";

const hashExistingPasswords = async () => {
  try {
    const pool = await connectDB();

    // Fetch all admins
    const result = await pool.request().query(
      `SELECT id, password FROM tbladmins_rows_diksha`
    );

    for (let admin of result.recordset) {
      const currentPassword = admin.password;

      // Check if password is already hashed (bcrypt hashes start with $2)
      if (!currentPassword.startsWith("$2")) {
        const hashed = bcrypt.hashSync(currentPassword, 10);

        // Update the password in DB
        await pool
          .request()
          .input("id", sql.VarChar, admin.id)
          .input("password", sql.VarChar, hashed)
          .query(
            `UPDATE tbladmins_rows_diksha SET password = @password WHERE id = @id`
          );

        console.log(`Password hashed for admin ID: ${admin.id}`);
      }
    }

    console.log("All passwords hashed successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error hashing passwords:", err);
    process.exit(1);
  }
};

hashExistingPasswords();
