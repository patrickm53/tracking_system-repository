export async function getBook() {
  const response = await fetch("http://localhost:3000/api/book");
  const data = await response.json();
  return data;
}

export async function fetchBookPost(token, body) {
  const response = await fetch("http://localhost:3000/api/book", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return data;
}

export async function fetchBookId(bookId) {
  const response = await fetch(`http://localhost:3000/api/book/${bookId}`);
  const data = await response.json();
  return data;
}

export async function fetchProfileBook(userId) {
  const response = await fetch(
    `http://localhost:3000/api/book/profile/${userId}`
  );
  const data = await response.json();
  return data;
}

export async function fetchProfile(userId) {
  const response = await fetch(`http://localhost:3000/api/profile/${userId}`);
  const data = await response.json();
  return data;
}

export async function fetchComment(bookId) {
  const response = await fetch(`http://localhost:3000/api/comment/${bookId}`);
  const data = await response.json();
  return data;
}

export async function fetchCommentPost(token, body) {
  const response = await fetch("http://localhost:3000/api/comment", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: JSON.stringify(body),
  });

  const data = await response.json();

  return data;
}

export async function fetchDeleteComment(token, commentId) {
  await fetch(`http://localhost:3000/api/comment/${commentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "DELETE",
  });
}
