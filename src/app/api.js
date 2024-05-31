export async function getBook() {
  const response = await fetch(`/api/book`);
  const data = await response.json();
  return data;
}

export async function getBookPage(page) {
  const response = await fetch(`/api/book/page/${page}`);
  const data = await response.json();
  return data;
}

export async function fetchSearchBook(searchBook) {
  const response = await fetch(`/api/search/${searchBook}`);
  const data = await response.json();
  return data;
}

export async function fetchSearchUser(searchUser) {
  const response = await fetch(`/api/search/${searchUser}/user`);
  const data = await response.json();
  return data;
}

export async function fetchSearchCreateBook(searchBook) {
  const response = await fetch(`/api/search/${searchBook}/createbook`);
  const data = await response.json();
  return data;
}

export async function fetchBookPost(token, body) {
  const response = await fetch(`/api/book`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return data;
}

export async function fetchBookId(bookId) {
  const response = await fetch(`/api/book/${bookId}`);
  const data = await response.json();
  return data;
}

export async function fetchDeleteBook(token, bookId) {
  await fetch(`/api/book/${bookId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "DELETE",
  });
}

export async function fetchUpdateBook(token, bookId, body) {
  const response = await fetch(`/api/book/${bookId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "PUT",
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return data;
}

export async function fetchProfileBook(userId) {
  const response = await fetch(`/api/book/profile/${userId}`);
  const data = await response.json();
  return data;
}

export async function fetchAllProfile() {
  const response = await fetch(`/api/profile`);
  const data = await response.json();
  return data;
}

export async function fetchSuggestionProfile(userId, profileId) {
  const response = await fetch(
    `/api/profile/suggestion/${userId}/${profileId}`
  );
  const data = await response.json();
  return data;
}

export async function fetchProfile(userId) {
  const response = await fetch(`/api/profile/${userId}`);
  const data = await response.json();
  return data;
}

export async function fetchComment(bookId) {
  const response = await fetch(`/api/comment/${bookId}`);
  const data = await response.json();
  return data;
}

export async function fetchCommentPost(token, body) {
  const response = await fetch(`/api/comment`, {
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
  await fetch(`/api/comment/${commentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "DELETE",
  });
}

export async function fetchProfilesAll() {
  const response = await fetch("/api/register");
  const data = await response.json();
  return data;
}

export async function fetchBookComment(body) {
  const response = await fetch("/api/bookComment", {
    method: "POST",
    body: body,
  });
  const data = await response.json();
  return data;
}

export async function fetchGetBookComment(bookId) {
  const response = await fetch(`/api/bookComment/${bookId}`);
  const data = response.json();
  return data;
}

export async function fetchProfileBookPage(userId, page) {
  const response = await fetch(`/api/book/profile/${userId}/${page}`);
  const data = await response.json();
  return data;
}

export async function fetchFollowUser(token, userId, followId, action) {
  const response = await fetch(`/api/follow/${userId}/${followId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: JSON.stringify({ action }),
  });

  const data = await response.json();
  return data;
}

export async function fetchGetFollowControl(userId, followId) {
  const response = await fetch(`/api/follow/${userId}/${followId}`);
  const data = await response.json();
  return data;
}

export async function fetchFollowCount(userId) {
  const response = await fetch(`/api/follow/count/${userId}`);
  const data = await response.json();
  return data;
}

export async function fetchFollowerViewData(userId, action) {
  const response = await fetch(`/api/follow/${action}/${userId}`);
  const data = await response.json();
  return data;
}

export async function fetchFollowSearch(searchUser, userId, action) {
  const response = await fetch(
    `/api/follow/search/${searchUser}/${userId}/${action}`
  );
  const data = await response.json();
  return data;
}
