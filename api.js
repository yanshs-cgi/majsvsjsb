export function auth(req) {
  if (req.query.logout === "true") return false;
  return true;
}
