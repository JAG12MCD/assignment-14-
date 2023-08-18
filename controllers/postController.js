const Post = require('../models/Post');
const Comment = require('../models/Comment');

const getAllPosts = async (userId) => {
	return await Post.findAll({
		where: {
			user_id: userId,
		},
	});
};

const getPostById = async (postId) => {
	const post =  await Post.findOne({
		where: { id: postId },
		include: [
			{
				model: Comment,
				as: 'comments',
			},
		],
	});

	return post.dataValues;
};

const addComment = async (content, userId, postId) => {
	return await Comment.create({ content, user_id: userId, post_id: postId });
};

const createPost = async (postData) => {
	return await Post.create(postData);
};

const updatePost = async (postId, postData) => {
	return await Post.update(postData, {
		where: {
			id: postId,
		},
	});
};

const deletePost = async (postId) => {
	return await Post.destroy({
		where: {
			id: postId,
		},
	});
};

const getUserPosts = async (userId) => {
	return await Post.findAll({
		where: {
			user_id: userId,
		},
	});
};

module.exports = {
	getAllPosts,
	getPostById,
	addComment,
	createPost,
	updatePost,
	deletePost,
	getUserPosts,
};
