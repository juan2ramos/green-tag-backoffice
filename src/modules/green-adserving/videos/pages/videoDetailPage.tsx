/* import { useQuery } from '@tanstack/react-query';
import { getVideo } from '../services/videos';
import { VideoResponseInterface } from '../interfaces/video.interface'; */
import { UpdateVideo } from '../components/Update';
/* import { useParams } from 'react-router-dom'; */

export const VideoPage = () => {
  /*   const { videoId } = useParams(); */
  /*  const { data: video } = useQuery<VideoResponseInterface>({
    queryKey: ['videos'],
    queryFn: () => getVideo(videoId),
  }) */ return (
    <div className="flex flex-col gap-4">
      <section className="wrapper">
        <div className="w-full">
          {/* <h2 className="pb-2">Video {video?.videoName}</h2> */}
          <hr />
          <UpdateVideo />
        </div>
      </section>
    </div>
  );
};
