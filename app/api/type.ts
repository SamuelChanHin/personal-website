// Types for the API dataset where `root` is required and other section keys are dynamic.
// Types for the API dataset where `root` is required and other section keys are dynamic.

// Common fields for an entry (used by flat entries and the `json` object in nested entries)

// Types for the API dataset where `root` is required and other section keys are dynamic.

// Flat entry shape (your latest payload uses this directly)
export type FlatEntry = {
  name: string;
  type: "dir" | "file" | "link";
  url: string;
  status: number;
  // allow extra fields if backend adds them later
  [key: string]: unknown;
};

// A Section must have a `root` array but may contain any number of additional
// keys (like `projects`, `dummy`, etc.), each mapping to an array of `Entry`.
export interface Section {
  root: FlatEntry[];
  [key: string]: FlatEntry[];
}

// Sometimes the response is wrapped in { data: Section }
export type DataWrapper = { data: Section };

export type ApiResponse = DataWrapper;
// Examples:
// 1) Top-level object with `data`:
// const resp: ApiResponse = {
//   data: {
//     root: [ {  name: 'projects', type: 'dir', url: '', status: 1 } ],
//     projects: [ {  name: 'snakegame', type: 'link', url: 'https://...', status: 1 } ]
//   }
// };
//
// 2) Array of sections (older format):
// const arr: ApiResponse = [ { root: [ ... ] }, { projects: [ ... ] } ];
