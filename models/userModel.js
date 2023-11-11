const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');



const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,'please add a name']
    },
    email:{
        type:String,
        required:[true, 'please add an email'],
        unique: true,
        trim:true,
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'please enter a valid email'
        ]
    },
    password:{
        type:String,
        required:[true,'please add a password'],
        minLenght:[6, "password must be up to 6 characters"],
        // maxLenght:[23, "password must not be more than 23 characters"]
    },
    photo:{
        type:String,
        required:[true,'please enter a photo'],
        default:"https://cdn.pixabay.com/photo/2017/02/25/22/04/user-icon-2098873__340.png"
    },
    bio:{
        type:String,
        maxLenght:[250, "Bio must not be more than 250 characters"],
        default:'bio'
    },
    phone:{
        type:String,
        default:"+234"
    }
},
{
    timestamps:true
}
)

// encrpypt password before saving to DB

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next()
    }
const salt = await bcrypt.genSalt(10)
 const harshedpassword = await bcrypt.hash(this.password,salt);

 this.password = harshedpassword
  
})

const User = mongoose.model("user", userSchema)

module.exports = User