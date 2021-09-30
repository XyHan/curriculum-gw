export type optionsFindAll = {
  sort?: string;
  offsetStart?: number;
  size?: number;
  filters?: Map<string, string | number | boolean | null>;
  sources?: string[];
};

export type optionsFindOne = {
  uuid: string;
  sources?: string[];
};
