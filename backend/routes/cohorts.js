// backend/routes/cohorts.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/cohorts.json');

// Read cohorts data from file
const getCohortsData = () => {
  try {
    return JSON.parse(fs.readFileSync(dataPath));
  } catch (err) {
    return [];
  }
};

// Write cohorts data to file
const saveCohortsData = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// Get all cohorts
router.get('/', (req, res) => {
  res.json(getCohortsData());
});

// Add a new cohort
router.post('/create', (req, res) => {
  const { name, adminId } = req.body;
  if (!name || !adminId) {
    return res.status(400).json({ error: 'Cohort name and adminId are required' });
  }

  const cohorts = getCohortsData();
  const newCohort = {
    id: Date.now(),
    name,
    adminId,  // adminId is passed when creating the cohort
    members: []
  };
  cohorts.push(newCohort);
  saveCohortsData(cohorts);
  res.status(201).json(newCohort);
});

// Delete a cohort
router.delete('/:id', (req, res) => {
  const cohorts = getCohortsData();
  const updatedCohorts = cohorts.filter(cohort => cohort.id !== parseInt(req.params.id));

  if (updatedCohorts.length === cohorts.length) {
    return res.status(404).json({ error: 'Cohort not found' });
  }

  saveCohortsData(updatedCohorts);
  res.sendStatus(204); // No content, successful deletion
});

// Add a member to a cohort
router.post('/:id/addMember', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Member name is required' });
  }

  const cohorts = getCohortsData();
  const cohort = cohorts.find(cohort => cohort.id === parseInt(req.params.id));

  if (!cohort) {
    return res.status(404).json({ error: 'Cohort not found' });
  }

  cohort.members.push({ name, role: 'user' }); // Default role is 'user'
  saveCohortsData(cohorts);
  res.status(201).json(cohort);  // Return updated cohort
});

// Remove a member from a cohort (Only accessible to the admin)
router.post('/:id/removeMember', (req, res) => {
  const { adminId, memberName } = req.body;

  // Ensure both adminId and memberName are provided
  if (!adminId || !memberName) {
    return res.status(400).json({ error: 'adminId and memberName are required' });
  }

  const cohorts = getCohortsData();
  const cohort = cohorts.find(cohort => cohort.id === parseInt(req.params.id));

  if (!cohort) {
    return res.status(404).json({ error: 'Cohort not found' });
  }

  // Check if the adminId matches the cohort's adminId
  if (cohort.adminId !== adminId) {
    return res.status(403).json({ error: 'Only the admin can remove members from this cohort' });
  }

  // Find the member in the cohort's members list
  const memberIndex = cohort.members.findIndex(member => member.name === memberName);
  if (memberIndex === -1) {
    return res.status(404).json({ error: 'Member not found in this cohort' });
  }

  // Remove the member
  cohort.members.splice(memberIndex, 1);
  saveCohortsData(cohorts);

  res.json({ message: `Member ${memberName} has been removed from cohort ${cohort.name}` });
});

module.exports = router;
