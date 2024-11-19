import { useQuery } from '@tanstack/react-query';
import { getVideo } from '../services/videos';
import { VideoResponseInterface } from '../interfaces/video.interface';
import { useParams } from 'react-router-dom';
import { UpdateVideo } from '../components/Update';

export const VideoPageDetail = () => {
  const { id } = useParams();
  const { data: video } = useQuery<VideoResponseInterface>({
    queryKey: ['video', id],
    queryFn: () => getVideo(id ?? ''),
  });

  return (
    <div className="flex flex-col gap-4">
      <section className="wrapper">
        <div className="w-full">
          {<h2 className="pb-2">{video?.videoName}</h2>}
          <hr />
          {video && <UpdateVideo video={video} />}
        </div>
      </section>
    </div>
  );
};
