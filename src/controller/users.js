const userModel = require('../models/userTable.js')

const getUser = async (req, res) => {
    const { id, name } = req.query; // Using query parameters for flexibility
    try {
        if (!id && !name) {
            return res.status(400).json({
                message: 'Please provide either id or name.',
            });
        }

        const [user] = await userModel.getUserByIdOrName(id || null, name || null);

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        res.json({
            message: 'GET user success',
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error while retrieving user',
            serverMessage: error.message,
        });
    }
};

const createNewUser = async (req, res) => {
    const { body } = req;
    // Validate request body
    if (!body.name || !body.email) {
        return res.status(400).json({
            message: 'Name and Email are required.',
        });
    }
    try {
        await userModel.createNewUser(body);
        res.status(201).json({
            message: 'CREATE new user success',
            data: body,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error while creating user',
            serverMessage: error.message,
        });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { body } = req;

    // Check if ID is provided
    if (!id) {
        return res.status(400).json({
            message: 'User ID is required to update.',
        });
    }

    // Validate update fields
    if (!body || Object.keys(body).length === 0) {
        return res.status(400).json({
            message: 'No data provided to update.',
        });
    }

    try {
        const userExists = await userModel.getUserByIdOrName(id, null);
        if (!userExists[0]) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        await userModel.updateUser(body, id);
        res.json({
            message: 'UPDATE user success',
            data: {
                id,
                ...body,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error while updating user',
            serverMessage: error.message,
        });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            message: 'User ID is required to delete.',
        });
    }

    try {
        const userExists = await userModel.getUserByIdOrName(id, null);
        if (!userExists[0]) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        await userModel.deleteUser(id);
        res.status(204).json({
            message: 'DELETE user success',
            data: null,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error while deleting user',
            serverMessage: error.message,
        });
    }
};

module.exports = {
    getUser,
    createNewUser,
    updateUser,
    deleteUser,
}