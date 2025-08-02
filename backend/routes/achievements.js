import express from 'express';
import Achievement from '../models/Achievement.js';

const router = express.Router();

// GET all achievements
router.get('/', async (req, res) => {
  try {
    const achievements = await Achievement.find().sort({ date: -1, order: 1 });
    res.json(achievements);
  } catch (error) {
    console.error('Error fetching achievements:', error);
    res.status(500).json({ message: 'Error fetching achievements', error: error.message });
  }
});

// GET featured achievements
router.get('/featured', async (req, res) => {
  try {
    const featuredAchievements = await Achievement.find({ featured: true }).sort({ date: -1, order: 1 });
    res.json(featuredAchievements);
  } catch (error) {
    console.error('Error fetching featured achievements:', error);
    res.status(500).json({ message: 'Error fetching featured achievements', error: error.message });
  }
});

// GET achievement by ID
router.get('/:id', async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);
    if (!achievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }
    res.json(achievement);
  } catch (error) {
    console.error('Error fetching achievement:', error);
    res.status(500).json({ message: 'Error fetching achievement', error: error.message });
  }
});

// POST new achievement
router.post('/', async (req, res) => {
  try {
    const achievement = new Achievement(req.body);
    const savedAchievement = await achievement.save();
    res.status(201).json(savedAchievement);
  } catch (error) {
    console.error('Error creating achievement:', error);
    res.status(400).json({ message: 'Error creating achievement', error: error.message });
  }
});

// PUT update achievement
router.put('/:id', async (req, res) => {
  try {
    const updatedAchievement = await Achievement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedAchievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }
    res.json(updatedAchievement);
  } catch (error) {
    console.error('Error updating achievement:', error);
    res.status(400).json({ message: 'Error updating achievement', error: error.message });
  }
});

// DELETE achievement
router.delete('/:id', async (req, res) => {
  try {
    const deletedAchievement = await Achievement.findByIdAndDelete(req.params.id);
    if (!deletedAchievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }
    res.json({ message: 'Achievement deleted successfully' });
  } catch (error) {
    console.error('Error deleting achievement:', error);
    res.status(500).json({ message: 'Error deleting achievement', error: error.message });
  }
});

export default router; 