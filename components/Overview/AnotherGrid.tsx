import React from "react";
import styles from "./index.module.scss";

interface GridProps {
  children: React.ReactNode;
  isInfo?: boolean;
  isDark?: boolean;
  className?: string;
  gridColumns?: string;
  highlight?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const Grid = ({
  children,
  isInfo,
  isDark,
  className,
  gridColumns,
  highlight,
  onMouseEnter,
  onMouseLeave,
}: GridProps) => {
  return (
    <div
      className={`${styles.grid} ${styles.is_hover} ${
        isInfo ? styles.is_info : ""
      } ${isDark ? styles.is_dark : ""} ${className ?? ""} ${
        highlight ? styles.highlight : ""
      }`}
      style={{ gridTemplateColumns: gridColumns }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
};

export default Grid;

interface GridItemProps {
  children: React.ReactNode;
}

export const GridItem = ({ children }: GridItemProps) => {
  return <div>{children}</div>;
};
