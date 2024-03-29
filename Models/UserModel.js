const UserSchema = require("../Schema/UserSchema");
const bcrypt = require('bcryptjs');

const User = class {
    name;
    email;
    username;
    password;

    constructor({email, username, password, name}){
        this.name = name;
        this.email = email;
        this.username = username;
        this.password = password;
    }

    registerUser(){
        return new Promise(async(resolve, reject) => {

            const hashedPassword = await bcrypt.hash(
                this.password,
                parseInt(process.env.SALT)
                );

            const userObj = new UserSchema({
                name: this.name, 
                email: this.email, 
                username: this.username, 
                password: hashedPassword,
            });

            try{
                const userDb = await userObj.save();
                resolve(userDb);
            } catch (error){
                reject(error);
            }
            
        });
    }

    static emailAndUsernameExist({username, email}){
        return new Promise(async (resolve, reject) => {
            try{
            const userExist = await UserSchema.findOne({
                $or: [{email}, {username}]
            });

            if(userExist && userExist.email === email) reject("Email already exist");
            if(userExist && userExist.username === email) reject("Username already exist");

            resolve();
        } catch(error) {
            reject(error);
        }
        });
    }

    static findUserWithLoginId({loginId}){
        return new Promise(async(resolve, reject)=>{
            // console.log(loginId);
            try{
            const userDb = await UserSchema.findOne({
                $or: [{email: loginId}, {username: loginId}]
            }).select("+password");

            if(!userDb) reject("User not found, please register first");
             
            resolve(userDb);
        } catch(error){
            reject(error);
        }
        })
    }
};

module.exports = User;



// Index.js(Router) -----> controller(userModel) ----->Model(userSchema) <------>Schema