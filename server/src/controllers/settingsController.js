// server/src/controllers/settingsController.js
const Settings = require('../models/Settings');
const { updateSettingsSchema } = require('../validations/settingsValidation');

const getSettings = async (req, res, next) => {
    try {
        const settings = await Settings.getSettings();
        res.status(200).json({ success: true, data: settings });
    } catch (error) {
        next(error);
    }
};

const updateSettings = async (req, res, next) => {
    try {
        const { error, value } = updateSettingsSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        const updatedSettings = await Settings.updateSettings(value);
        res.status(200).json({ success: true, data: updatedSettings, message: 'Settings updated successfully' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getSettings,
    updateSettings
};
