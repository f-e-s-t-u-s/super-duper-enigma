import db from "../config/database.js";

const executeQuery = (query, params = []) => {
    return new Promise((resolve, reject) => {
        db.run(query, params, function (error) {
            if (error) {
                return reject(error);
            }
            resolve({ lastID: this.lastID });
        });
    });
};

const executeSelectQuery = (query, params = []) => {
    return new Promise((resolve, reject) => {
        db.get(query, params, (error, row) => {
            if (error) {
                return reject(error);
            }
            resolve(row);
        });
    });
};

class User {
    // register new user
    async registerNewUser(data) {
        try {
            const { email, password } = data;

            const query = `
                INSERT INTO users (email, password) VALUES (?, ?);
            `;
            const params = [email, password];
            const result = await executeQuery(query, params);

            return { message: "User registered successfully", userId: result.lastID };
        } catch (error) {
            throw error;
        }
    }
      // Get user by email
      async getUserByEmail(email) {
        try {
            const query = `
                SELECT * FROM users WHERE email = ?;
            `;
            const params = [email];
            const user = await executeSelectQuery(query, params);

            return user ? user : null;
        } catch (error) {
            throw error;
        }
    }
}

export default User;