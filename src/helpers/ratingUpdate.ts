import { Reaction } from '../model/Reaction';
import { Video } from '../model/Video';

export const ratingUpdate = async (videoId: any) => {
  const reaction = await Reaction.find({ videoId });
  const video = await Video.findById(videoId);

  const like = reaction.filter((item) => item.reaction == 'like').length;
  const dislike = reaction.filter((item) => item.reaction == 'dislike').length;

  video!.rating = like / (like + dislike);

  await video?.save();
};
