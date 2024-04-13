import styles from "./line-divider.module.css";

export function LineDivider({ className }: { className?: string }) {
  const combinedStyles = `${styles.lineDivider} ${className}`;
  return <div className={combinedStyles} />;
}
