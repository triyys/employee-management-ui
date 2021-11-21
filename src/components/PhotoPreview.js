import { useEffect } from "react";

function PhotoPreview({ photoFile, setPhotoFile }) {
    useEffect(() => {
        return () => {
            photoFile && URL.revokeObjectURL(photoFile.preview);
        }
    }, [photoFile]);

    const handleFileSelected = e => {
        const file = e.target.files[0];

        file.preview = URL.createObjectURL(file);

        setPhotoFile(file);

        e.target.value = null;
    }

    return (
        <div>
            <input
                className="mt-3 mb-3"
                type="file"
                onChange={handleFileSelected}
            />
            {photoFile && <img width="200px" height="200px" src={photoFile.preview} alt=""/>}
        </div>
    )
}

export default PhotoPreview;