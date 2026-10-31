import { TextAttributes } from "@opentui/core";
import type { InputRenderable, ScrollBoxRenderable } from "@opentui/core";
import { useKeyboard } from "@opentui/react";
import { useCallback, useRef, useState } from "react";

import { useKeyboardLayer } from "../../providers/keybindings";
import MAX_VISIBLE_ITEMS from "./constants";
import SearchListRow from "./search-list-row";
import type { SearchListProps } from "./types";

function SearchList<T>({
  items,
  onSelect,
  onHighlight,
  filterFunc,
  renderItem,
  getKey,
  placeholder = "Search",
  emptyText = "No results",
}: SearchListProps<T>) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef<InputRenderable>(null);
  const scrollRef = useRef<ScrollBoxRenderable>(null);
  const { isTopLayer } = useKeyboardLayer();

  const handleContentChange = useCallback(() => {
    const text = inputRef.current?.value ?? "";
    setSearchValue(text);
    setSelectedIndex(0);

    const scrollbox = scrollRef.current;
    if (scrollbox !== null) {
      scrollbox.scrollTo(0);
    }
  }, []);

  const filtered = items.filter((item) => filterFunc(item, searchValue));

  const visibleHeight = Math.min(filtered.length, MAX_VISIBLE_ITEMS);

  useKeyboard((key) => {
    if (!isTopLayer("dialog")) return;

    if (key.name === "return" || key.name === "enter") {
      const item = filtered[selectedIndex];
      if (item !== undefined) {
        onSelect(item);
      }
    } else if (key.name === "up") {
      setSelectedIndex((i) => {
        const newIndex = Math.max(0, i - 1);
        const sb = scrollRef.current;
        if (sb !== null && newIndex < sb.scrollTop) {
          sb.scrollTo(newIndex);
        }
        const item = filtered[newIndex];
        if (item !== undefined && onHighlight !== undefined) {
          onHighlight(item);
        }
        return newIndex;
      });
    } else if (key.name === "down") {
      setSelectedIndex((i) => {
        const newIndex = Math.min(filtered.length - 1, i + 1);
        const sb = scrollRef.current;
        if (sb !== null) {
          const viewportHeight = sb.viewport.height;
          const visibleEnd = sb.scrollTop + viewportHeight - 1;
          if (newIndex > visibleEnd) {
            sb.scrollTo(newIndex - viewportHeight + 1);
          }
        }
        const item = filtered[newIndex];
        if (item !== undefined && onHighlight !== undefined) {
          onHighlight(item);
        }
        return newIndex;
      });
    }
  });

  const handleHover = useCallback(
    (index: number, item: T) => {
      setSelectedIndex(index);
      if (onHighlight !== undefined) onHighlight(item);
    },
    [onHighlight],
  );

  return (
    <box flexDirection="column" gap={1}>
      <input
        ref={inputRef}
        placeholder={placeholder}
        focused
        onContentChange={handleContentChange}
      />
      {filtered.length === 0 ? (
        <text attributes={TextAttributes.DIM}>{emptyText}</text>
      ) : (
        <scrollbox ref={scrollRef} height={visibleHeight}>
          {filtered.map((item, i) => {
            return (
              <SearchListRow
                key={getKey(item)}
                item={item}
                index={i}
                isSelected={i === selectedIndex}
                onHover={handleHover}
                onPick={onSelect}
              >
                {renderItem(item, i === selectedIndex)}
              </SearchListRow>
            );
          })}
        </scrollbox>
      )}
    </box>
  );
}

export default SearchList;
