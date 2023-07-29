import environment_url from "./check_env";
import { genDigits } from "./digits_only";
import connectMongo from "@/database/connectMongo";
import { usersCollection } from "@/database/databaseModels";

export async function auth_cred_signUp(email: string, password: string, username: string) {
  const res = await fetch(`${environment_url}/api/users/create-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      username,
      password,
    }),
  });

  const user = await res.json();

  if (res.ok && user) {
    return {id: user?._id, name: user?.username, email: user?.email, verified: user?.verified, theme: user?.theme};
  }else {
    throw new Error(user?.error);
  }
}

export async function auth_cred_logIn(email: string, password: string) {
  const res = await fetch(`${environment_url}/api/users/login-user`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password
    }),
  });

  const user = await res.json();

  if (res.ok && user) {
    return {id: user?._id, name: user?.username, email: user?.email, verified: user?.verified, theme: user?.theme};
  }else {
    throw new Error(user?.error);
  }
}

interface googleAuthLoginArgs {
  email: string;
  name: string;
  given_name?: string;
  family_name?: string;
  image: string | null | undefined;
  email_verified: boolean;
}
export async function auth_google_logIn(authArgs: googleAuthLoginArgs) {
  // connect to db
  try{
    await connectMongo();
  }catch(error){
    throw new Error("Failed to connect to server");
  }
  
  // check db if email exist and if the provider is true
  const user = await usersCollection.findOne({email: authArgs?.email}).exec();
  if(user) {
    if(!user?.provider) {
      throw new Error("Authorization for this email requires a password");
    }
    return {id: user?._id, username: user?.username, verified: user?.verified, theme: user?.theme};
  }else {
    // generate username from email
    let first_split = authArgs?.email.split("@");
    let firstVal = first_split[0];
    let secondVal = first_split[1].split(".").join("-");

    let username = firstVal + "-" + secondVal;
    // but what if i generate a username that already exist, cos username must be unique
    // in a do-while loop check if username exists if yes, generate a digit attach it to 
    // the end of the username and check again, if still yes, generate 2 digits and attach
    // to the end & check again, if still yes, generate 3 digits, attach and check again...
    let digits = ""
    let num_of_digits = 1;
    let validUsername = false;
    do{
      // attach
      let new_username = username + digits;
      // check db
      const num_of_user = await usersCollection.find({username: new_username}).count().exec();
      if(num_of_user) {
        validUsername = false;
      }else {
        validUsername = true;
        username = new_username;
      }
      // generate a new set of digits based on num_of_digits
      digits = genDigits(num_of_digits);
      // increment num_of_digits by 1;
      num_of_digits++;
    }while(!validUsername);

    // create user
    const createdUser = await usersCollection.create({
      email: authArgs?.email,
      username,
      fullname: {
        firstname: authArgs?.given_name ?? authArgs?.name,
        lastname: authArgs?.family_name
      },
      image_url: authArgs?.image,
      provider: true,
      verified: authArgs?.email_verified
    });

    return {id: createdUser?._id, username: createdUser?.username, verified: createdUser?.verified, theme: createdUser?.theme};
  }
}