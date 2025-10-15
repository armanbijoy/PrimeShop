import asyncHandler from "../middleware/asyncHandler.js"
import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'

/**
 * @desc    Authenticate user & get token
 * @route   GET /api/users/login
 * @access  Public
 */
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.query

  // Find user by email
  const user = await User.findOne({ email })

  // If user exists and password matches
  if (user && (await user.matchPassword(password))) {
    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d'
    })

    // Set JWT as HTTP-only cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    })

    // Send user data (excluding password)
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

/**
 * @desc    Register a new user
 * @route   POST /api/users
 * @access  Public
 */
const registerUser = asyncHandler(async (req, res) => {
  // Placeholder for user registration logic
  res.send('register user')
})

/**
 * @desc    Logout user / clear JWT cookie
 * @route   POST /api/users/logout
 * @access  Private
 */
const logoutUser = (req, res) => {
  res.clearCookie('jwt') // Clear JWT cookie
  res.status(200).json({ message: 'Logged out successfully' })
}

/**
 * @desc    Get logged-in user profile
 * @route   GET /api/users/profile
 * @access  Private
 */
const getUserProfile = asyncHandler(async (req, res) => {
  // Placeholder for getting user profile
  res.send('get user profile')
})

/**
 * @desc    Update logged-in user profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
const updateUserProfile = asyncHandler(async (req, res) => {
  // Placeholder for updating user profile
  res.send('update user profile')
})

/**
 * @desc    Get all users
 * @route   GET /api/users
 * @access  Private/Admin
 */
const getUsers = asyncHandler(async (req, res) => {
  // Placeholder for getting all users
  res.send('get users')
})

/**
 * @desc    Get user by ID
 * @route   GET /api/users/:id
 * @access  Private/Admin
 */
const getUsersbyID = asyncHandler(async (req, res) => {
  // Placeholder for getting user by ID
  res.send('get users by ID')
})

/**
 * @desc    Delete a user
 * @route   DELETE /api/users/:id
 * @access  Private/Admin
 */
const deleteUsers = asyncHandler(async (req, res) => {
  // Placeholder for deleting a user
  res.send('delete users')
})

/**
 * @desc    Update a user
 * @route   PUT /api/users/:id
 * @access  Private/Admin
 */
const updateUser = asyncHandler(async (req, res) => {
  // Placeholder for updating a user
  res.send('update users')
})

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUsers,
  getUsersbyID,
  updateUser
}
