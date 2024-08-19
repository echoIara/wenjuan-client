import React, { FC, useEffect, useState } from "react";
import styles from "./QuestionCheckbox.module.scss";

type PropsType = {
  fe_id: string;
  props: {
    title: string;
    list: Array<{
      value: string;
      text: string;
      checked: boolean;
    }>;
    isVertical: boolean;
  };
};
const QuestionCheckbox: FC<PropsType> = ({ fe_id, props }) => {
  const { title, list = [], isVertical } = props;

  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  // 初始化时判断默认选中
  useEffect(() => {
    list.forEach((item) => {
      const { value, checked } = item;
      if (checked) {
        setSelectedValues((selectedValues) => selectedValues.concat(value));
      }
    });
  }, [list]);
  function toggleChecked(value: string) {
    if (selectedValues.includes(value)) {
      setSelectedValues((selectedValues) =>
        selectedValues.filter((v) => v !== value)
      );
    } else {
      setSelectedValues(selectedValues.concat(value));
    }
  }
  return (
    <>
      <p>{title}</p>

      <input type="hidden" name={fe_id} value={selectedValues.toString()} />

      <ul className={styles.list}>
        {list.map((item) => {
          const { value, text, checked } = item;

          //判断竖向、横向
          let liClassName = "";
          if (isVertical) liClassName = styles.verticalItem;
          else liClassName = styles.horizontalItem;

          return (
            <li key={value} className={liClassName}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedValues.includes(value)}
                  onChange={() => toggleChecked(value)}
                />
                {text}
              </label>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default QuestionCheckbox;
