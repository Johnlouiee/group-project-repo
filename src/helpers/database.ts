// Delete user
static async deleteUser(id: number): Promise<boolean> {
    try {
        const [result] = await pool.query(
            'DELETE FROM users WHERE id = ?',
            [id]
        );
        return (result as any).affectedRows > 0;
    } catch (error) {
        console.error('Delete user error:', error);
        throw error;
    }
}
}

export default DatabaseHelper;
