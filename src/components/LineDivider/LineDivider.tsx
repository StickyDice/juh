import styles from "./line-divider.module.css";

export default function LineDivider({ className }: { className?: string }) {
  const combinedStyles = `${styles.lineDivider} ${className}`;
  return <div className={combinedStyles} />;
}
