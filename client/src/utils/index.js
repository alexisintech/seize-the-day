const api_base =
  process.env.NODE_ENV === "development"
    ? "http://localhost:2222"
    : "https://seize-the-day-api.up.railway.app";

export const getUser = async () => {
  const token = localStorage.getItem("auth");
  const req = await fetch(api_base + "/getUser", {
    headers: { authorization: `bearer ${token}` },
  });

  const res = req.json();

  return res;
};

export const createTodo = async ({ title, subTasks, tags }) => {
  const token = localStorage.getItem("auth");
  const req = await fetch(api_base + "/profile/createTodo", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `bearer ${token}`,
    },
    body: JSON.stringify({
      title,
      // subTasks: subTasks,
      // tags: tags,
    }),
  });

  const res = await req.json();

  console.log("This is the res from createTodo on the API side", res);

  return res;
};

export const deleteTodo = async (id) => {
  const token = localStorage.getItem("auth");
  const req = await fetch(api_base + "/profile/delete/" + id, {
    method: "DELETE",
    headers: { authorization: `bearer ${token}` },
  });

  const res = await req.json();

  return res;
};

export const completeTodo = async (id) => {
  // NOTE: Make sure to set the local storage key before trying to get it.
  const token = localStorage.getItem("auth");
  const req = await fetch(api_base + "/profile/complete/" + id, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      authorization: `bearer ${token}`,
    },
  });

  const res = await req.json();

  return res;
};

export const getTodos = async () => {
  const token = localStorage.getItem("auth");

  try {
    const req = await fetch(api_base + "/profile", {
      headers: { authorization: `bearer ${token}` },
    });

    const res = await req.json();

    return res;
  } catch (err) {
    console.log(err);
  }
};
