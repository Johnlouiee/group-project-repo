// Get all users
router.get("/", async (req: Request, res: Response) => {
    try {
        const users = await DatabaseHelper.getAllUsers();
        
        // Remove password from each user object
        const usersWithoutPasswords = users.map((user: User) => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });
        
        return res.status(StatusCodes.OK).json(usersWithoutPasswords);
    } catch (error) {
        console.error('Get users error:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
});
