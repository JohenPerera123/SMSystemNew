import Stadium from "../models/Stadium.js";

const getStadiums = async(req,res) =>{
    try {
        const stadiums = await Stadium.find()
        return res.status(200).json({success: true, stadiums})
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'add stadium error'
        })
    }
}

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
        return res.status(200).json({success: true, stadium:newStadium})
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'add stadium error'
        })
        
    }

}

const getStadium = async(req,res) =>{
    try {
        const {id} =req.params
        const stadium =await Stadium.findById({_id: id})
     return res.status(200).json({success: true, stadium})
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'get department error'
        })
    }
}

const updateStadium = async(req,res) =>{
    try {
        const {id} =req.params
        const { Std_name, Std_location, Std_capacity, resourceres } = req.body;
        const updatedStadium = await Stadium.findByIdAndUpdate(
            {_id: id},
            {Std_name, Std_location, Std_capacity, resourceres},
            {new: true}
        )
     return res.status(200).json({success: true, updatedStadium})
    } catch (error) {
         return res.status(500).json({
            success: false,
            error: 'edit department error'
        })
    }
}

const deleteStadium = async(req,res) =>{
    try {
        const {id} =req.params
        const deleteStd = await Stadium.findByIdAndDelete({_id: id})
     return res.status(200).json({success: true, message: 'Stadium deleted successfully'})
    } catch (error) {
         return res.status(500).json({
            success: false,
            error: 'delete department error'
        })
    }
}

export {addStadium, getStadiums, getStadium, updateStadium, deleteStadium}