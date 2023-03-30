import {Cat} from '../../interfaces/Cat';
import {User} from '../../interfaces/User';
import userModel from '../models/userModel';

// TODO: Add resolvers for user
export default {
  Cat: {
    owner: async (parent: Cat) => {
      return await userModel.findById(parent.owner);
    },
  },
  // 1. Queries
  Query: {
    // 1.1. users
    users: async () => {
      const users = await userModel.find();
      console.log(users);
      return users;
    },
    // 1.2. userById
    userById: async (_parent: undefined, args: User) => {
      console.log(args);
      return await userModel.findById(args.id);
    },
  },
  // 2. Mutations
  Mutation: {
    // 2.1. createUser
    createUser: async (_parent: undefined, args: User) => {
      console.log(args);
      const user = new userModel(args);
      return await user.save();
    },
    // 2.2. updateUser
    updateUser: async (_parent: undefined, args: User) => {
      console.log(args);
      return await userModel.findByIdAndUpdate(args.id, args, {new: true});
    },
    // 2.3. deleteUser
    deleteUser: async (_parent: undefined, args: User) => {
      console.log(args);
      return await userModel.findByIdAndDelete(args.id);
    },
  },
};
