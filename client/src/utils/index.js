const api_base =
  process.env.NODE_ENV === "development"
    ? "http://localhost:2222"
    : "https://seize-the-day-api.up.railway.app";

export const createTodo = async ({ title, subTasks, tags }) => {
  const token = localStorage.getItem("auth");
  const data = await fetch(api_base + "/profile/createTodo", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `bearer ${token}`,
    },
    body: JSON.stringify({
      title: title,
      subTasks: subTasks,
      tags: tags,
    }),
  }).then((res) => res.json());

  console.log(data);
};

export const deleteTodo = async ({ id }) => {
  const token = localStorage.getItem("auth");
  const data = await fetch(api_base + "/profile/delete/" + id, {
    method: "DELETE",
    headers: { authorization: `bearer ${token}` },
  }).then((res) => res.json());
};

export const completeTodo = async (id) => {
  // NOTE: Make sure to set the local storage key before trying to get it.
  const token = localStorage.getItem("auth");
  const data = await fetch(api_base + "/profile/complete/" + id, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      authorization: `bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const getTodos = async () => {
  const token = localStorage.getItem("auth");

  try {
    const data = await fetch(api_base + "/profile", {
      headers: { authorization: `bearer ${token}` },
    });
    console.log(await data.json());
    return await data.json();
  } catch (err) {
    console.log(err);
  }
};
