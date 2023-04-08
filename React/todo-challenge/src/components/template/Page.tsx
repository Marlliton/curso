import styles from "./page.module.css"

interface PageProps {
  children: any
}


export function Page({children}: PageProps) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}