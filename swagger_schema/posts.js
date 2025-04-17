/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Posts:
 *       type: object
 *       required:
 *         - content
 *       properties:
 *         content:
 *           type: string
 *           description: Post Contents
 *       example:
 *         content: "makan"
 *
 * tags:
 *   name: Posts
 *   description: The Posts managing API
 * 
 * /posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     responses:
 *        200:
 *         description: successfully loaded all post data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Posts'
 * 
 *        500:
 *         description: Failed to load all Post data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Posts' 
 * 
 *   post:
 *     summary: Create a Post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Posts'
 *     responses:
 *        201:
 *         description: Successfully created a post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Posts'
 * 
 *        400:
 *         description: Missing or invalid data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Posts' 
 *        
 *        401:
 *         description: access denied
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Posts' 
 * 
 *        500:
 *         description: Failed to create post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Posts' 
 * 
 * /posts/{id}:
 *  get:
 *     summary: Get a post by post id
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Post id
 *     responses:
 *        200:
 *         description: successfully loaded post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Posts'
 * 
 *        500:
 *         description: failed to load post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Posts' 
 * 
 *  put:
 *     summary: Update Post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Post id
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Posts'
 *     responses:
 *        201:
 *         description: Successfully updated post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Posts'
 * 
 *        400:
 *         description: Missing or invalid data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Posts' 
 *        
 *        401:
 *         description: access denied
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Posts' 
 * 
 *        403:
 *         description: access forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Posts' 
 * 
 *        500:
 *         description: Failed to update post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Posts'
 * 
 *  delete:
 *     summary: Delete Post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Post id
 *     security:
 *       - bearerAuth: []
 *     responses:
 *        200:
 *         description: Successfully deleted post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Posts'
 *        
 *        401:
 *         description: access denied
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Posts' 
 * 
 *        403:
 *         description: access forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Posts' 
 * 
 *        500:
 *         description: Failed to delete post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Posts'
 * 
 */