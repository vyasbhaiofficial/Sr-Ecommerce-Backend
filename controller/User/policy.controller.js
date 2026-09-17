const Policy = require('../../model/policy.model');

// Get Policies
exports.getPolicies = async (req, res) => {
    try {
        const filters = {};
        if (req.query.type) {
            filters.type = req.query.type;
        }
        const policies = await Policy.find(filters).sort({ createdAt: -1 });
        
        // Group by type for easier consumption on frontend if no specific type is requested
        if (!req.query.type) {
            const grouped = policies.reduce((acc, curr) => {
                if (!acc[curr.type]) {
                    acc[curr.type] = [];
                }
                acc[curr.type].push(curr);
                return acc;
            }, {});
            
            return res.status(200).json({
                success: true,
                message: 'Policies fetched successfully',
                data: grouped
            });
        }

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
