// server/src/models/Settings.js
const db = require('../config/database');

class Settings {
    /**
     * Ensure the settings table exists and initialize with a default row if empty.
     */
    static async _init() {
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS settings (
                id INT AUTO_INCREMENT PRIMARY KEY,
                siteName VARCHAR(255) DEFAULT 'Viralstan CRM',
                logo VARCHAR(255) DEFAULT NULL,
                primaryColor VARCHAR(50) DEFAULT '#F43F5E',
                secondaryColor VARCHAR(50) DEFAULT '#3B82F6',
                metaTitle VARCHAR(255) DEFAULT 'Viralstan | Premium Agency Solutions',
                metaDescription TEXT,
                currency VARCHAR(50) DEFAULT 'USD ($)',
                timezone VARCHAR(100) DEFAULT 'UTC+5:30 (Mumbai)',
                email VARCHAR(255) DEFAULT 'admin@viralstan.com',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `;
        await db.query(createTableQuery);

        const [rows] = await db.query('SELECT COUNT(*) as count FROM settings');
        if (rows[0].count === 0) {
            await db.query(
                `INSERT IGNORE INTO settings (id, siteName, metaTitle, metaDescription) VALUES (1, ?, ?, ?)`,
                ['Viralstan CRM', 'Viralstan | Premium Agency Solutions', 'The most advanced CMS and CRM for modern digital agencies.']
            );
        }
    }

    static async getSettings() {
        await this._init();
        const [rows] = await db.query('SELECT * FROM settings LIMIT 1');
        return rows[0] || null;
    }

    static async updateSettings(data) {
        await this._init();
        const { siteName, logo, primaryColor, secondaryColor, metaTitle, metaDescription, currency, timezone, email } = data;
        
        await db.query(
            `UPDATE settings SET 
                siteName = COALESCE(?, siteName),
                logo = COALESCE(?, logo),
                primaryColor = COALESCE(?, primaryColor),
                secondaryColor = COALESCE(?, secondaryColor),
                metaTitle = COALESCE(?, metaTitle),
                metaDescription = COALESCE(?, metaDescription),
                currency = COALESCE(?, currency),
                timezone = COALESCE(?, timezone),
                email = COALESCE(?, email)
             WHERE id = 1`,
            [siteName, logo, primaryColor, secondaryColor, metaTitle, metaDescription, currency, timezone, email]
        );
        
        return this.getSettings();
    }
}

module.exports = Settings;
