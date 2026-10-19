import { Link } from 'react-router-dom'

export default function Boton({ to, children, ...props }) {
  if (to) {
    return <Link to={to} {...props}>{children}</Link>
  }
  return <button {...props}>{children}</button>
}
