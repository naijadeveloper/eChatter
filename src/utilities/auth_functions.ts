import environment_url from "./check_env";

export async function auth_cred_signUp(email: string, password: string, username: string) {
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

export async function auth_cred_logIn(email: string, password: string) {
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

interface googleAuthLoginArgs {
  email: string | null | undefined;
  name: string | null | undefined;
  given_name: string | null | undefined;
  family_name: string | null | undefined;
  image: string | null | undefined;
  email_verified: boolean;
}
export async function auth_google_logIn(authArgs: googleAuthLoginArgs) {
  // generate username from email
  // but what if i generate a username that already exist, cos username must be unique
}