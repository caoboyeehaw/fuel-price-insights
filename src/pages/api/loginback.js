import { getDatabase } from "./db";
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
    if(req.method === 'POST'){
        const {email, password} = req.body;

        if(!email || email.trim().length === 0){
            return res.status(400).json({error: 'Email must be entered'});
        }
        if(!password || password.trim().length === 0){
            return res.status(400).json({error: 'Please enter valid password'});
        }
        //establishing conenction to mongoDB

        const db = await getDatabase();
        const clientProfile = db.collection('ClientInfo');

        //searching for matching email
        const user = await clientProfile.findOne({ email });
        if(!user){
            return res.status(401).json({ error: 'Invalid email or password! '});
        }

        //unhashing password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(401).json({ error: 'Invalid email or password! '});
        }

        //returns the client's _id from mongodb as a string!
        return res.status(200).json({ cust_id: user._id.toString(), message: 'Log in successful' });

    }
    return res.status(405).json({ error: 'Method not allowed' });

}
