import Stadium from "../models/Stadium.js";

const addStadium = async(req, res) => {
    try {
        const { Std_name, Std_location, Std_capacity, resourceres } = req.body;
        const newStadium = new Stadium({
            Std_name,
            Std_location,
            Std_capacity,
            resourceres
        });
        await newStadium.save();
        return res.status(200).jason({success: true, stadium:newStadium})
    } catch (error) {
        return res.status(500).jason({
            success: false,
            error: 'add department error'
        })
        
    }

}

export {addStadium}