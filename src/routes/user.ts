 // Delete user endpoint
 router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id);
        
        if (isNaN(userId)) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: "Invalid user ID" });
        }

        // Check if user exists
        const user = await DatabaseHelper.findById(userId);
        
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "User not found" });
        }

        // Delete user
        const deleted = await DatabaseHelper.deleteUser(userId);
        
        if (deleted) {
            return res.status(StatusCodes.OK).json({ message: "User deleted successfully" });
        } else {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Failed to delete user" });
        }
    } catch (error) {
        console.error('Delete user error:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
});