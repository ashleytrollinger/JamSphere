require("dotenv").config();
const cloudinary = require("cloudinary");
const { AuthenticationError } = require("apollo-server-express");
const { User, Post, Comment } = require("../models");
const { signToken } = require("../utils/auth");
// const user = require("../models/user");

const resolvers = {
  Query: {
    // Get specific User (View your profile)
    getUser: async (parent, { userId }) => {
      return await User.findOne({ _id: userId });
    },
    // Get all posts from everyone
    getPost: async (parent, { postId }) => {
      return await Post.findOne({ _id: postId });
    },
    // Get all posts from a specific user
    userPosts: async (parent, { userId }) => {
      return await Post.find({ authorId: userId });
    },
    // Get all friends of a specific user
    userFriends: async (parent, { userId }) => {
      const user = await User.findOne({ _id: userId }).populate("friendList");
      return user.friendList;
    },
    // Get comments for a specific post
    getComment: async (parent, { commentId }) => {
      return await Comment.findOne({ _id: commentId });
    },
  },

  Mutation: {
    signup: async (
      parent,
      { name, username, email, password }
    ) => {
      const profile = await User.create({
        name,
        username,
        email,
        password,
      });
      const token = signToken(profile);

      return { token, profile };
    },

    login: async (parent, { email, password }) => {
      const profile = await User.findOne({ email });

      if (!profile) {
        throw new AuthenticationError("No profile with this email found!");
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }

      const token = signToken(profile);
      return { token, profile };
    },

    createPost: async (parent, { artist, title, songURL }, context) => {
      if (context.user) {
          const newPost = await Post.create({
              authorId: context.user._id,
              artist: artist,
              title: title,
              songURL: songURL
          });
  
          await User.findOneAndUpdate(
              { _id: context.user._id },
              { $addToSet: { posts: newPost._id } }
          );
  
          return newPost;
      }
  
      throw new AuthenticationError('You need to be logged in!');
  },

    uploadPhoto: async ( _, { photo } ) => {
      //initialize cloudinary
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });
      
      //try-catch block for handling actual image upload
      try {
        const result = await cloudinary.v2.uploader.upload(photo, {
          //Only jpg and png files can be uploaded
          allowed_formats: ["jpg", "png"],
          //generates a new id for each uploaded image
          public_id: "",
          //creates a folder called "JamSphere" where images will be stored.
          folder: "JamSphere",
        });
      } catch (e) {
        //returns an error message on image upload failure.
        return `Image could not be uploaded:${e.message}`;
      }
      /*returns uploaded photo url if successful `result.url`.
      if we were going to store image name in database,this
      */
      return `Successful-Photo URL: ${result.url}`;
    },
    deletePost: async (parent, { postId }) => {
      // Implement the logic to delete a post by postId
      const deletedPost = await Post.findByIdAndDelete(postId);
      return deletedPost;
    },

    deleteUser: async (parent, { userId }) => {
      // Implement the logic to delete a user by userId
      const deletedUser = await User.findByIdAndDelete(userId);
      return deletedUser;
    },
  },
};

module.exports = resolvers;
