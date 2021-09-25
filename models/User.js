const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,

            //this code found from stackoverflow
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
        }],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },

        // Prevents virtuals from creating duplicate of _id as 'id'
        id: false
    }
);

UserSchema.virtual('friendCount').get(function () {
    return this.friends.length + 1;
});

const User = model('User', UserSchema)

module.exdports = User