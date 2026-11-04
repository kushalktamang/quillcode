import { useCallback } from "react";

import type { SearchListRowProps } from "./types";

function SearchListRow<T>({
  item,
  index,
  isSelected,
  onHover,
  onPick,
  children,
}: SearchListRowProps<T>) {
  const handleMouseMove = useCallback(() => {
    onHover(index, item);
  }, [onHover, index, item]);
  const handleMouseDown = useCallback(() => {
    onPick(item);
  }, [onPick, item]);

  return (
    <box
      flexDirection="row"
      height={1}
      overflow="hidden"
      backgroundColor={isSelected ? "#89b4FA" : "transparent"}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
    >
      {children}
    </box>
  );
}

export default SearchListRow;
