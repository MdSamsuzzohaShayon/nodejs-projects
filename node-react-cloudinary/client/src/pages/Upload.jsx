import React, { useState } from 'react';


function Upload() {
    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState();
    const [selectedFile, setSelectedFile] = useState('');
    const handleFileInputChange = (e) => {
        // FOR MULTIPLE FILE DO NOT USE INDEX NUMBER
        const file = e.target.files[0];
        console.log(file);
        previewFile(file);
    }

    const previewFile = (file) => {
        // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/FileReader
        // The FileReader() constructor creates a new FileReader.
        const reader = new FileReader();
        console.log("File reader", reader);
        // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
        // The readAsDataURL method is used to read the contents of the specified Blob or File.
        reader.readAsDataURL(file);
        // https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onloadend
        // when progress has stopped on the loading of a resource
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        }
    }


    const handleSubmit = (e) => {
        console.log("form submited");
        e.preventDefault();
        if (!previewSource) return;
        // const reader = new FileReader();
        // reader.readAsDataURL(selectedFile);


        uploadImage(previewSource);
    }

    const uploadImage = async (base64EncodedImage) => {
        console.log("Base 54 image: ", base64EncodedImage);
        try {
            await fetch('http://localhost:3001/api/upload', {
                method: 'POST',
                body: JSON.stringify({ data: base64EncodedImage }),
                headers: { 'Content-Type': 'application/json' },
            });
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="form" >
                <input type="file" name="image" onChange={handleFileInputChange} value={fileInputState} className="form-input" />
                <button className="btn" >Submit</button>
            </form>
            {previewSource && (
                <img src={previewSource} style={{ height: '300px' }} alt="" />
            )}
        </div>
    )
}

export default Upload;