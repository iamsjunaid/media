import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store/apis/albumsApi";
import Skeleton from './Skeleton'
import Button from './Button'
import AlbumsListItem from "./AlbumsListItem";

function AlbumsList({ user }) {
  const { data, error, isLoading } = useFetchAlbumsQuery(user);

  // console.log(data, error, isLoading);
  const [addAlbum, results] = useAddAlbumMutation();

  const handeAddAlbum = () => {
    addAlbum(user);
  }

  let content;
  if (isLoading) {
    content = <Skeleton times={3} className='h-10 w-full' />
  } else if (error) {
    content = <div>Error fetching data...</div>
  } else {
    content = data.map((album) => {
     return <AlbumsListItem key={album.id} album={album}/>
    });
  }

  return (
    <div>
      <div className="m-2 flex items-center justify-between">
        <h3 className="text-lg font-bold">
          Albums for : {user.name}
          </h3>
        <Button loading={results.isLoading} onClick={handeAddAlbum}>
          + Add Album
        </Button>
      </div>
      <div>{content}</div>
    </div>
  )
}

export default AlbumsList;