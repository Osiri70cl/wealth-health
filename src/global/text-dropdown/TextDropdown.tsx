"use client";

import { useMemo, useState } from "react";
import styles from "./TextDropdown.module.scss";

type Props = {
  content: string[];
  handleSelectedItem: (item: string) => void;
};

const TextDropdown = ({ content, handleSelectedItem }: Props) => {
  const renderContens = useMemo(() => {
    return content.map((item) => {
      return (
        <li key={item.id} onClick={() => handleSelectedItem(item)}>
          {item.name}
        </li>
      );
    });
  }, [content]);

  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>{renderContens}</ul>
    </div>
  );
};

export default TextDropdown;
