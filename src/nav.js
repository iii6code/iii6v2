export const land = document.getElementById("land");
export const signup = document.getElementById("signup");
export const profile = document.getElementById("profile");
export const newsafe = document.getElementById("newsafe");
export const safe = document.getElementById("safe");
export const gosignup = document.getElementById("gosignup");
export const gonewsafe = document.getElementById("gonewsafe");
export const golog = document.getElementById("golog");
export const closeAll = () => {
  land.style.display = "none";
  signup.style.display = "none";
  profile.style.display = "none";
  newsafe.style.display = "none";
  safe.style.display = "none";
};
export const go = (e) => {
  closeAll();
  if (e.target.id === "gosignup") signup.style.display = "grid";
  if (e.target.id === "golog") signup.style.display = "grid";
  if (e.target.id === "gonewsafe") newsafe.style.display = "grid";
};
