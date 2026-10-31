import type { ReactNode } from "react";

interface SearchListProps<T> {
  items: readonly T[];
  onSelect: (item: T) => void;
  onHighlight?: (item: T) => void;
  filterFunc: (item: T, query: string) => boolean;
  renderItem: (item: T, isSelected: boolean) => ReactNode;
  getKey: (item: T) => string;
  placeholder?: string;
  emptyText?: string;
}
interface SearchListRowProps<T> {
  item: T;
  index: number;
  isSelected: boolean;
  onHover: (index: number, item: T) => void;
  onPick: (item: T) => void;
  children: ReactNode;
}

export type { SearchListProps, SearchListRowProps };
