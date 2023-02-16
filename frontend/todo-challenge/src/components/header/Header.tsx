import logo from "../../assets/Logo.svg"
import style from "./header.module.css"

export function Header() {
  return (
    <header>
      <div className={style.logo}><img src={logo} alt="" /></div>
    </header>
  )
}