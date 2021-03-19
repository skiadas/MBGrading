import { v4 as uuidv4 } from "uuid";

const messages = [];
const sessions = new Map();
export function addChatNeeds(app) {
  app.all("/chat", ensureUsername);
  app.get("/chat/login", showLoginScreen);
  app.post("/chat/login", registerUser);
  app.get("/chat", handleBasicChatPage);
  app.post("/chat", handleMessagePost);
}

function ensureUsername(req, res, next) {
  if (retrievedUsername(req, res)) return next();
  return res.redirect("/chat/login");
}

function showLoginScreen(req, res) {
  return res.render("login");
}

function registerUser(req, res) {
  const username = req.fields.username;
  const sessionId = uuidv4();
  sessions.set(sessionId, username);
  res.cookie("sessionId", sessionId);
  return res.redirect("/chat");
}

function handleBasicChatPage(req, res) {
  return res.render("messages", { messages: [...messages].reverse() });
}

function handleMessagePost(req, res) {
  const message = req.fields.message;
  const sender = res.locals.user;
  messages.push({ message, sender });
  return res.redirect(req.path);
}

// Helpers

function retrievedUsername(req, res) {
  const sessionId = req.cookies.sessionId;
  if (sessionId) res.locals.user = sessions.get(sessionId);
  return sessions.has(sessionId);
}
