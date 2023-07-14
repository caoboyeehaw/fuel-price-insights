export default function handler(req, res) {
    if(req.method === 'POST'){
        const {fullName, address1, address2, city, state, zipcode} = req.body;

        if(fullName <= 0){
            return res.status(400).json({error: 'Please enter valid name'});
        }
        if(address1 <= 0){
            return res.status(400).json({error: 'Please enter valid address'});
        }
        if(city <= 0){
            return res.status(400).json({error: 'Please enter valid city'});
        }
        if(state <= 0){
            return res.status(400).json({error: 'Please enter valid state'});
        }
        if(zipcode <= 0 || zipocde > 9){
            return res.status(400).json({error: 'Please enter 5 digit zipcode'});
        }
        return res.status(200).json({ message: 'Registration successful' });

    }
    return res.status(405).json({ error: 'Method not allowed' });

}