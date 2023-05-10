import './app_photos.css'
import {useState} from "react";

function AddPhotos() {
    const [files, setFiles] = useState(null)

    return (
        <div className="photosContainer">
            <label className="added-photos-label" htmlFor="image_uploads">Add images (PNG, JPG)</label>
            <input className="hidden-input-files" type="file" id="image_uploads" name="images"
                   accept=".jpg, .jpeg, .png" multiple onChange={(e) => setBox(e.target.files, setFiles)}/>
            <div id="imageBoxContainer">
                {files ? files : <></>}
            </div>
        </div>
    )
}

function setBox(files, box) {
    if (files.length === 0) {
        box(<p className={"files-warn-info"}>Photos didn't choose</p>)
        return
    }
    if (files.length > 10) {
        box(<p className={"files-warn-info"}>Photos more than 10</p>)
        return
    }
    box(toJSX(files))
}

function toJSX(photos) {
    const jsxArray = []

    let keyPhoto = 1;
    for (const photo of photos) {
        jsxArray.push(
            <div className="images-box" key={"photo-id-" + keyPhoto++}>
                <p className="image-info">File name: {photo.name}, file size: {formattedFileSize(photo.size)}. </p>
                <img className="image-style" src={window.URL.createObjectURL(photo)} alt={photo.name}/>
            </div>
        )
    }

    return (<>{jsxArray}</>);
}

function formattedFileSize(number) {
    if (number < 1024) {
        return number + 'bytes';
    } else if (number > 1024 && number < 1048576) {
        return (number / 1024).toFixed(1) + 'KB';
    } else if (number > 1048576) {
        return (number / 1048576).toFixed(1) + 'MB';
    }
}

export default AddPhotos