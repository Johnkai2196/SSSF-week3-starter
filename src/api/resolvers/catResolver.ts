// TODO: Add resolvers for cat
// 1. Queries
// 1.1. cats
// 1.2. catById
// 1.3. catsByOwner
// 1.4. catsByArea
// 2. Mutations
// 2.1. createCat
// 2.2. updateCat
// 2.3. deleteCat

import {Cat} from '../../interfaces/Cat';
import rectangleBounds from '../../utils/rectangleBounds';
import catModel from '../models/catModel';
import {locationInput} from '../../interfaces/Location';

export default {
  Query: {
    cats: async () => {
      const cats = await catModel.find();
      console.log(cats);
      return cats;
    },
    catById: async (_parent: undefined, args: Cat) => {
      console.log(args);
      return await catModel.findById(args.id);
    },
    catsByOwner: async (_parent: undefined, args: Cat) => {
      console.log(args);
      return await catModel.find({owner: args.owner});
    },
    catsByArea: async (_parent: undefined, args: locationInput) => {
      const bounds = rectangleBounds(args.topRight, args.bottomLeft);
      return await catModel.find({
        location: {
          $geoWithin: {
            $geometry: bounds,
          },
        },
      });
    },
  },

  Mutation: {
    createCat: async (_parent: undefined, args: Cat) => {
      console.log(args);
      const cat = new catModel(args);
      return await cat.save();
    },
    updateCat: async (_parent: undefined, args: Cat) => {
      console.log(args);
      return await catModel.findByIdAndUpdate(args.id, args, {new: true});
    },
    deleteCat: async (_parent: undefined, args: Cat) => {
      console.log(args);
      return await catModel.findByIdAndDelete(args.id);
    },
  },
};
