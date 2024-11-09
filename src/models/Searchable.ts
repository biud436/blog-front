export interface Searchable<T extends string> {
  setSearchType(searchType: T): void;
  setSearchQuery(searchQuery: string): void;
  getSearchType(): string | undefined;
  getSearchQuery(): string | undefined;
  clearSearch(): void;
  setSearchMode(isSearchMode: boolean): void;
  isSearchMode(): boolean;
  getSearchCategories(): Record<string, string> | undefined;
  getDefaultCategory(): string | undefined;
}
