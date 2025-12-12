const Plan = require('../models/Plan');

const createPlan = async (req, res) => {
  try {
    const { title, duration, price, benefits } = req.body;

    const newPlan = new Plan({ title, duration, price, benefits });
    await newPlan.save();

    res.status(201).json({ message: 'Plan created successfully', plan: newPlan });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
  const deletePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPlan = await Plan.findByIdAndDelete(id);

    if (!deletedPlan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    res.status(200).json({ message: 'Plan deleted successfully' });
  } catch (error) {
    console.error("Delete plan error:", error);
    res.status(500).json({ message: 'Server error' });
  }
};



module.exports = { createPlan, getPlans , deletePlan}
