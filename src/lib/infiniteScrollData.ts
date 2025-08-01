// infiniteScrollData.js

export const userData = Array.from({ length: 1000 }, (_, index) => ({
  id: index + 1,
  name: `User ${index + 1}`,
  email: `user${index + 1}@example.com`,
  avatar: `https://i.pravatar.cc/150?img=${(index % 70) + 1}`
}));
