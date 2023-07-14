export default function handler(req, res) {
    if(req.method === 'POST'){
        const {email, password} = req.body;

        if(email <= 0){
            return res.status(400).json({error: 'Email must be entered'});
        }
        if(password <= 0){
            return res.status(400).json({error: 'Please enter valid password'});
        }
        return res.status(200).json({ message: 'Log in successful' });

    }
    return res.status(405).json({ error: 'Method not allowed' });

}