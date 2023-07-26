import environment_url from "./check_env";

export async function auth_signUp(email: string, password: string, username: string) {
  const res = await fetch(`${environment_url}/api/users/create-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      username,
      password,
    }),
  });

  const user = await res.json();

  if (res.ok && user) {
    return {id: user?._id, name: user?.username, email: user?.email, verified: user?.verified, theme: user?.theme};
  }else {
    throw new Error(user?.error);
  }
}

export async function auth_logIn(email: string, password: string) {
  const res = await fetch(`${environment_url}/api/users/login-user`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password
    }),
  });

  const user = await res.json();

  if (res.ok && user) {
    return {id: user?._id, name: user?.username, email: user?.email, verified: user?.verified, theme: user?.theme};
  }else {
    throw new Error(user?.error);
  }
}