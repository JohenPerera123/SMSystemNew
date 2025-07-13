import Resource from "../models/Resource.js";

// Get all resources with stadium names populated
const getResources = async (req, res) => {
  try {
    const resources = await Resource.find().populate('stadium', 'Std_name');
    return res.status(200).json({ success: true, resources });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Get resources error',
    });
  }
};

// Add a new resource (linked to a stadium)
const addResource = async (req, res) => {
  try {
    const { stadiumId, resources } = req.body;
    const photo = req.file ? req.file.filename : null;

    const newResource = new Resource({
      stadium: stadiumId,
      resources,
      photo,
    });

    await newResource.save();
    return res.status(200).json({ success: true, resource: newResource });
  } catch (error) {
      console.error("Add resource error:", error);  // <-- Add this line

    return res.status(500).json({
      success: false,
      error: 'Add resource error',
    });
  }
};

// Get a single resource
const getResource = async (req, res) => {
  try {
    const { id } = req.params;
    const resource = await Resource.findById(id).populate('stadium', 'Std_name');

    if (!resource) {
      return res.status(404).json({ success: false, error: 'Resource not found' });
    }

    return res.status(200).json({ success: true, resource });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Get resource error',
    });
  }
};

// Update a resource
const updateResource = async (req, res) => {
  try {
    const { id } = req.params;
    const { stadiumId, resources } = req.body;
    const photo = req.file ? req.file.filename : undefined;

    const updateFields = {
      stadium: stadiumId,
      resources,
    };

    if (photo) {
      updateFields.photo = photo;
    }

    const updatedResource = await Resource.findByIdAndUpdate(
      id,
      updateFields,
      // { stadium: stadiumId, resources },
      { new: true }
    );

    return res.status(200).json({ success: true, updatedResource });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Update resource error',
    });
  }
};

// Delete a resource
const deleteResource = async (req, res) => {
  try {
    const { id } = req.params;
    await Resource.findByIdAndDelete(id);

    return res.status(200).json({ success: true, message: 'Resource deleted successfully' });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Delete resource error',
    });
  }
};

export {
  getResources,
  addResource,
  getResource,
  updateResource,
  deleteResource,
};