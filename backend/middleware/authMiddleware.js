import jwt from 'jsonwebtoken'
import asyncHandler from './asyncHandler.js'
import User from '../models/userModel.js'

/**
 * @desc    Protect routes and verify JWT token
 * @access  Private
 */
export const protect = asyncHandler(async (req, res, next) => {
    // Get token from cookies
    let token = req.cookies.jwt

    if (token) {
        try {
            // Verify token using JWT_SECRET
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Attach user to request object, excluding password
            req.user = await User.findById(decoded.userId).select('-password')

            // Proceed to the next middleware or route
            next()
        } catch (err) {
            res.status(401)
            throw new Error('Not authorized, token failed')
        }
    } else {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

/**
 * @desc    Admin middleware to allow only admin users
 * @access  Private/Admin
 */
export const admin = (req, res, next) => {
    // Check if user exists and is an admin
    if (req.user && req.user.isAdmin) {
        next() // Proceed if admin
    } else {
        res.status(403) // Forbidden
        throw new Error('Not authorized as admin')
    }
}
