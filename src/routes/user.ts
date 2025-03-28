import express, { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { DatabaseHelper } from "../helpers/database"

const router = express.Router()

router.post("/register", async (req : Request, res : Response) => {
    try {
    const { username, email, password } = req.body
    
    if (!username || !email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({error : "Please provide all the required parameters..."})
    }
    
    // Check if user exists
    const existingUser = await DatabaseHelper.findByEmail(email)
    
    if (existingUser) {
    return res.status(StatusCodes.BAD_REQUEST).json({error : "This email has already been registered..."})
    }
    
    // Create new user
    const newUser = await DatabaseHelper.createUser({
    username,
    email,
    password
    })
    
    return res.status(StatusCodes.CREATED).json(newUser)
    } catch (error) {
    console.error('Registration error:', error)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error : "Internal server error"})
    }
    })
    
    router.post("/login", async (req : Request, res : Response) => {
    try {
    const { email, password } = req.body
    
    if (!email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({error : "Please provide all the required parameters..."})
    }
    
    // Find user
    const user = await DatabaseHelper.findByEmail(email)
    
    if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json({error : "No user exists with the email provided..."})
    }
    
    // Compare password
    const isValidPassword = await DatabaseHelper.verifyPassword(password, user.password)
    
    if (!isValidPassword) {
    return res.status(StatusCodes.BAD_REQUEST).json({error : "Incorrect Password!"})
    }
    
    // Remove password from response
    const { password: _, ...userWithoutPassword } = user
    return res.status(StatusCodes.OK).json(userWithoutPassword)
    } catch (error) {
    console.error('Login error:', error)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error : "Internal server error"})
    }
    })

export default router