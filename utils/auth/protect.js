export default function isAuthorized(req, roles) {
  return roles.includes(req.role)
}
