import { useAddPhotoMutation, useFetchPhotosQuery } from "../store";
import Button from "./Button";
import Skeleton from "./Skeleton";
import PhotosListItem from "./PhotosListItem";

function PhotosList({ album }) {
  const { data, error, isFetching } = useFetchPhotosQuery(album);

  const [addPhoto, addPhotoResults] = useAddPhotoMutation(album);

  const handleAddPhoto = () => {
    addPhoto(album);
  }

  let content;
  if (isFetching) {
    content = <Skeleton times={4} className='h-8 w-8' />
  } else if (error) {
    content = <div>Error fetching data...</div>
  } else { 
    content = data.map(photo => {
      return <div key={photo.id}>
        <PhotosListItem key={photo.id} photo={photo} />
      </div>
    })
  }

  return <div>
    <div className="m-2 flex flex-row items-center justify-between">
      <h3 className="text-large font-bold">Photos In {album.name}</h3>
      <Button loading={addPhotoResults.isLoading} onClick={handleAddPhoto}>
        + Add Photo
      </Button>
    </div>
      <div className="mx-8 flex flex-wrap justify-center gap-4">
        {content}
      </div>
  </div>
}

export default PhotosList;