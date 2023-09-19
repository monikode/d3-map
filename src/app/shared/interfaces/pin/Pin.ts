export interface Pin {
  id: string;
  name: string;
  color: string;
  x: number;
  y: number;
  r?: number;
  url?: string | ArrayBuffer;
}
