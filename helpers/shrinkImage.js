import { ImageManipulator } from 'expo';

export const reduceImageAsync = (uri) => ImageManipulator.manipulateAsync(
    uri,
    [], {
    compress: 0.5,
    }
  );
