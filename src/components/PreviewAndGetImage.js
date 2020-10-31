import { PureComponent } from "react";

import { Uploader, Notification} from "rsuite";

export default class extends PureComponent {
    handleUpload = e => {
        const file = e.blobFile;
        const reader = new FileReader();
        const { toWidth, handleImage } = this.props;
        
        // Set the image once loaded into file reader
        reader.readAsDataURL(file);

        reader.onload = e => {
            // This is for resize the image to make it more "ligth" 
            const img = new Image();
            img.src = e.target.result;
            img.onload = () => {
                const elem = document.createElement('canvas');
                const ctx = elem.getContext('2d');

                const width = toWidth;
                const scaleFactor = width / img.width;
                elem.width = width;
                elem.height = img.height * scaleFactor;

                ctx.drawImage(img, 0, 0, width, img.height * scaleFactor);

                const resizedImage = ctx.canvas.toDataURL(img);

                // Send resized image
                handleImage(resizedImage);
            },
            reader.onerror = error => Notification.error({
                title: "Ocurrió un error",
                description: error
            })
        }
    }

    render() {
        return(
            <div className="imageUploader">
                <Uploader action="" draggable onUpload={this.handleUpload}>
                    {this.props.children}
                </Uploader>

                <style jsx global>{`
                    .imageUploader {
                        overflow: hidden;
                    }

                    .imageUploader .rs-uploader-trigger input[type='file'] {
                        width: 0px;
                    }
                `}</style>
            </div>
        )
    }
}