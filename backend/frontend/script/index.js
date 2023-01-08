// app.js

const postsContainer = document.getElementById("posts");

const posts = [
  {
    title: "My First Blog Post",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    title: "My Second Blog Post",
    content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    title: "My Third Blog Post",
    content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];

for (const post of posts) {
  const postElement = document.createElement("article");
  postElement.innerHTML = `
    <h3>${post.title}</h3>
    <p>${post.content}</p>
  `;
  postsContainer.appendChild(postElement);
}
