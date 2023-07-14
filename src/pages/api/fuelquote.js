

export default function handler(req, res){
    if(req.method === 'POST'){
        const {GallonNeeded, deliveryAddress, deliveryDate, ppg, totalAmountDue} = req.body;

        //validations below

        if(GallonNeeded <= 0){
            return res.status(400).json({error: 'Gallons requested must be greater than 0'});
        }

        //validate date (setting a minimum date limit)
        const parsedDeliveryDate = new Date(deliveryDate);

        if(isNaN(parsedDeliveryDate)){
            return res.status(400).json({error: 'Must select a valid delivery date'});
        }

        const currentDate = new Date();
        
        if(parsedDeliveryDate < currentDate){
            return res.status(400).json({error: 'Delivery date cannot be set in the past'});
        }
    }
}

//need to implement a pull action to grab data from the db.

//fuel quote module needs to include a list of quote history for said clients. 