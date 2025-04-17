/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - emanil
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The email of the User
 *         password:
 *           type: string
 *           description: The password of the User
 *       example:
 *         email: "admin@gmail.com"
 *         password: "12345"
 * 
 *     Register:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the USer
 *         email:
 *           type: string
 *           description: The email of the User
 *         password:
 *           type: string
 *           description: The password of the User
 *       example:
 *         name: "admin"
 *         email: "admin@gmail.com"
 *         password: "12345"
 * 
 * tags:
 *   name: Login/Register
 *   description: Login and Register managing API
 
 * /login:
 *  post:
 *     summary: User Login
 *     tags: [Login/Register]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Login'
 *     responses:
 *        200:
 *         description: Success generated token acceess
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Login'
 * 
 *        400:
 *         description: Missing or invalid data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Login' 
 * 
 *        401:
 *         description: Incorrect email or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Login' 
 * 
 * /register:
 *  post:
 *     summary: Create New User
 *     tags: [Login/Register]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Register'
 *     responses:
 *        201:
 *         description: Successfully created a new user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Register'
 * 
 *        400:
 *         description: Missing or invalid data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Register' 
 * 
 *        500:
 *         description: Failed to create new user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Register' 
 */
