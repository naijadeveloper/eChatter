let environment_url = "";

if(process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
  environment_url = "http://localhost:3000";
}else {
  environment_url = "https://echatter-naijadev.vercel.app";
}

export default environment_url;