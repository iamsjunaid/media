import ExpandablePanel from "./ExpandablePanel";
import { GoTrashcan } from "react-icons/go";
import Button from "./Button";
import { useRemoveAlbumMutation } from "../store";
import PhotosList from "./PhotosList";

function AlbumsListItem({ album }) {

  const [removeAlbum, results] = useRemoveAlbumMutation(album);

  const handleRemoveClick = () => {
    removeAlbum(album);
  };

  const header =
    <>
      <Button className="mr-2" loading={results.isLoading} onClick={handleRemoveClick}>
        <GoTrashcan />
      </Button>
      {album.name}
    </>
  return <ExpandablePanel key={album.id} header={header}>
    <PhotosList album={album} />
  </ExpandablePanel>
}

export default AlbumsListItem