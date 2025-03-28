// Get user by ID
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id);
        
        if (isNaN(userId)) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: "Invalid user ID" });
        }

        const user = await DatabaseHelper.findById(userId);
        
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "User not found" });
        }

        // Remove password from response
        const { password, ...userWithoutPassword } = user;
        return res.status(StatusCodes.OK).json(userWithoutPassword);
    } catch (error) {
        console.error('Get user error:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
});