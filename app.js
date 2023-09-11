// app.js
import { fetchPuppyParticipants, addPuppyParticipant } from './api.js';

// DOM elements
const playerForm = document.getElementById('playerForm');
const nameInput = document.getElementById('name');
const breedInput = document.getElementById('breed');
const participantsList = document.getElementById('participantsList');

// Function to render puppy participants
function renderParticipants(participants) {
  participantsList.innerHTML = ''; // Clear the list
  participants.forEach((participant) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${participant.name} (${participant.breed})`;
    participantsList.appendChild(listItem);
  });
}

// Event listener for form submission
playerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = nameInput.value;
  const breed = breedInput.value;
  if (name && breed) {
    try {
      await addPuppyParticipant(name, breed);
      const participants = await fetchPuppyParticipants();
      renderParticipants(participants);
      // Clear the input fields
      nameInput.value = '';
      breedInput.value = '';
    } catch (error) {
      console.error('Error:', error);
    }
  }
});

// Initial rendering of participants
(async () => {
  try {
    const participants = await fetchPuppyParticipants();
    renderParticipants(participants);
  } catch (error) {
    console.error('Error:', error);
  }
})();
