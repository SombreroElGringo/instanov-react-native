import { ImageManipulator } from 'expo';

export const reduceImageAsync = (uri) => ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width: 500 } }], {
    compress: 0.5,
    }
  );
