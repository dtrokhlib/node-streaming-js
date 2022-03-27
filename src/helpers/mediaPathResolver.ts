const placeholderExtensions = ['jpg', 'jpeg', 'png'];
const videoExtensions = ['mp4', 'mov', 'mpeg-2', 'wmv', 'avi'];

export const mediaPathResolver = (file: any) => {
  const fileExtension = file.mimetype.split('/')[1];

  if (placeholderExtensions.includes(fileExtension)) {
    return './src/public/media/placeholder';
  }

  if (videoExtensions.includes(fileExtension)) {
    return './src/public/media/video';
  }

  return './src/public/media/general';
};
