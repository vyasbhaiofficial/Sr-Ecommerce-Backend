const Policy = require('../../model/policy.model');

// Add Policy
exports.addPolicy = async (req, res) => {
    try {
        const { type, content } = req.body;
        const policy = new Policy({ type, content });
        await policy.save();

        res.status(201).json({
            success: true,
            message: 'Policy created successfully',
            data: policy
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// Get Policies
exports.getPolicies = async (req, res) => {
    try {
        const filters = {};
        if (req.query.type) {
            filters.type = req.query.type;
        }

        const policies = await Policy.find(filters).sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            message: 'Policies fetched successfully',
            data: policies
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// Get Policy by ID
exports.getPolicy = async (req, res) => {
    try {
        const policy = await Policy.findById(req.params.id);
        if (!policy) {
            return res.status(404).json({ success: false, message: 'Policy not found' });
        }
        res.status(200).json({
            success: true,
            data: policy
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// Update Policy
exports.updatePolicy = async (req, res) => {
    try {
        const { type, content } = req.body;
        
        const policy = await Policy.findByIdAndUpdate(
            req.params.id,
            { type, content },
            { new: true }
        );

        if (!policy) {
            return res.status(404).json({ success: false, message: 'Policy not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Policy updated successfully',
            data: policy
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// Delete Policy
exports.deletePolicy = async (req, res) => {
    try {
        const policy = await Policy.findByIdAndDelete(req.params.id);

        if (!policy) {
            return res.status(404).json({ success: false, message: 'Policy not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Policy deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};
