const mongoose = require("mongoose");


const connectionRequestSchema = new mongoose.Schema(
    {
       fromUserId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Users",  // reference to the user collection.
         required : true,
       } ,

       toUserId: {
          type: mongoose.Schema.Types.ObjectId,
           ref: "Users",  // reference to the user collection.
          required: true,
       },

       status: {
           type: String,
           required: true,
           enum: {
             values: ['ignored', "interested", "accepted", "rejected"],
             message: `{VALUE} is incorrect status type`
           },
          
       },

    },
    {
        timestamps: true
    }
)
//Putting compound index on both the items so that my query be faster.
connectionRequestSchema.index({fromUserId: 1 , toUserId: 1 });

connectionRequestSchema.pre("save", function(next){
  const connectionRequest = this;
  //check if fromUserId is same as toUserId 
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
    throw new Error("Cannot Sent Connection Request to yourself")
  }
  next()
})


const ConnectionRequestModel = new mongoose.model(
    "ConnectionRequest",
    connectionRequestSchema,
);

module.exports = ConnectionRequestModel;