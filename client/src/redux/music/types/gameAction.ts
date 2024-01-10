
import Track from './track';

type MusicAction =
  | { type: 'music/load'; payload: Track[] }
  | {
      type: 'music/answer';
      payload: string;
    };
export default MusicAction;
