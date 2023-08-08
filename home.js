// Retrieve username from query parameter
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');

// Display the username
if (username) {
  document.getElementById('username').textContent = username;
} else {
  redirectToLogin(); // Redirect to login if username is not provided
}

// Open the create post modal
function openCreatePostModal() {
  document.getElementById('createPostModal').style.display = 'flex';
}

// Close the create post modal
function closeCreatePostModal() {
  document.getElementById('createPostModal').style.display = 'none';
}

// Handle post form submission
document.getElementById('postForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const postTitle = document.getElementById('postTitle').value;
  const postDescription = document.getElementById('postDescription').value;
  const postImage = document.getElementById('postImage').value; // Add logic to handle image upload
  // Create a new post object and add it to the posts array
  const post = {
    title: postTitle,
    description: postDescription,
    image: postImage,
    timestamp: new Date().toLocaleString()
  };
  addPost(post);
  closeCreatePostModal();
  displayPosts();
});

// Store and retrieve posts using localStorage
function getPosts() {
  return JSON.parse(localStorage.getItem('posts')) || [];
}

function addPost(post) {
  const posts = getPosts();
  posts.push(post);
  localStorage.setItem('posts', JSON.stringify(posts));
}

function deletePost(index) {
  const posts = getPosts();
  posts.splice(index, 1);
  localStorage.setItem('posts', JSON.stringify(posts));
  displayPosts();
}

// Display posts in the post feed
function displayPosts() {
  const postFeed = document.getElementById('postFeed');
  postFeed.innerHTML = '';
  const posts = getPosts();
  posts.forEach((post, index) => {
    const postContainer = document.createElement('div');
    postContainer.classList.add('post-container');
    postContainer.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.description}</p>
      <p class="time-date">${post.timestamp}</p>
      <img src="${post.image}" alt="Post Image">
      <button class="delete-post-button" onclick="deletePost(${index})">&times;</button>
    `;
    postFeed.appendChild(postContainer);
  });
}

// Initial display of posts
displayPosts();

// Chat Box
function sendMessage() {
  const chatInput = document.getElementById('chatInput');
  const message = chatInput.value;
  if (message) {
    const chatMessages = document.getElementById('chatMessages');
    const chatMessage = document.createElement('div');
    chatMessage.classList.add('chat-message');
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();
    chatMessage.innerHTML = `
      <span class="chat-user">${username}:</span>
      ${message}
      <br>
      <span class="chat-time-date">${formattedDate}</span>
    `;
    chatMessages.appendChild(chatMessage);
    chatInput.value = '';

    // Store chat messages in local storage
    const chatHistory = getChatHistory();
    chatHistory.push({ username, message, timestamp: formattedDate });
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
  }
}

function getChatHistory() {
  return JSON.parse(localStorage.getItem('chatHistory')) || [];
}

// Display chat messages from local storage
function displayChatHistory() {
  const chatMessages = document.getElementById('chatMessages');
  chatMessages.innerHTML = '';
  const chatHistory = getChatHistory();
  chatHistory.forEach(chat => {
    const chatMessage = document.createElement('div');
    chatMessage.classList.add('chat-message');
    chatMessage.innerHTML = `
      <span class="chat-user">${chat.username}:</span>
      ${chat.message}
      <br>
      <span class="chat-time-date">${chat.timestamp}</span>
    `;
    chatMessages.appendChild(chatMessage);
  });
}

// Initial display of chat messages
displayChatHistory();

function createAnnouncement() {
  const announcementContainer = document.createElement('div');
  announcementContainer.classList.add('announcement');
  const announcementTitle = document.createElement('h3');
  announcementTitle.textContent = 'The Terminal';
  announcementTitle.style.color = '#27ae60'; // Set title text color to green
  const announcementText = document.createElement('p');
  announcementText.textContent = 'Here is the access to the LOCO terminal where you can run our pre-programmed commands for Discord and more features.';
  const linkElement = document.createElement('a');
  linkElement.href = 'another_page.html';
  linkElement.textContent = 'Click here';
  linkElement.style.color = '#27ae60'; // Set link text color to green
  linkElement.style.textDecoration = 'underline';
  announcementText.appendChild(linkElement);
  announcementContainer.appendChild(announcementTitle);
  announcementContainer.appendChild(announcementText);

  const chatBox = document.querySelector('.chat-box');
  chatBox.appendChild(announcementContainer);
}

// Function to create the button container
function createButtonContainer() {
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('button-container');
  const runTerminalButton = document.createElement('a');
  runTerminalButton.classList.add('run-terminal-button');
  runTerminalButton.textContent = 'Run Terminal';
  runTerminalButton.href = 'another_page.html';
  buttonContainer.appendChild(runTerminalButton);
  chatBox.appendChild(buttonContainer);
}

// Call the functions to create the announcement and button container
createAnnouncement();
createButtonContainer();
