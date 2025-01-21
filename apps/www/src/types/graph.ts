export interface Coords {
  x?: number;
  y?: number;
  z?: number;
}

interface CommonProps {
  width?: number;
  opacity?: number;
  index?: number;
}

export interface LinkObject extends CommonProps {
  source?: number;
  target?: number;
}
export interface NodeObject extends Coords, CommonProps {
  id?: number;
  vx?: number;
  vy?: number;
  vz?: number;
  fx?: number;
  fy?: number;
  fz?: number;
  lookAt?: Coords;
  name?: string;
  size?: number;
  importance?: boolean;
}
