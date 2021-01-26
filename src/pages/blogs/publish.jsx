import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';
import {DatePicker, Upload, Spin, message, Button} from 'antd';
import ImgCrop from 'antd-img-crop';
import {uploadBlogImage} from '../../actions/index';
import UserAvatar from '../../components/avatar';
import {updateUserProfile} from '../../actions/index';
import AvatarCropper from '../../components/cropper';
import { Editor } from '@tinymce/tinymce-react';


export default function Publish() {
    const dispatch = useDispatch();

    const [fileList, setFileList] = useState([]);
    const [file, setFile] = useState(null);

    const onChange = ({ fileList: newFileList ,file }) => {
        setFileList(newFileList);
        // setFileList(file)
      };
    console.log('fileList', fileList)

    const onPreview = async file => {
        let src = file.url;
        if (!src) {
          src = await new Promise(resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader.result);
          });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
      };
    
      const handleEditorChange = (content, editor) => {
          console.log('Content was updated:', content);
      }

      function dataURItoBlob(dataURI) {
        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
        var byteString = atob(dataURI.split(',')[1]);
      
        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
      
        // write the bytes of the string to an ArrayBuffer
        var ab = new ArrayBuffer(byteString.length);
      
        // create a view into the buffer
        var ia = new Uint8Array(ab);
      
        // set the bytes of the buffer to the correct values
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
      
        // write the ArrayBuffer to a blob, and you're done
        var blob = new Blob([ab], {type: mimeString});
        return blob;
      
      }

      const handleFileChangeProfile = async ({file}) => {
        // let reader = new FileReader();
        let src = file.url;
        if (!src) {
          src = await new Promise(resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader.result);
          });
        }
        const blob = dataURItoBlob(src);
          // if (!file) return;
          // reader.onload = function (img) {
          //   // handleFileChangeProfile(file);
          //   // handlePhotoChanged(file);
          //   // setImage(img.target.result);
          //   const blob = dataURItoBlob(img.target.result);
          // };
          // reader.readAsDataURL(file);
          // setUploading(true);
        let status = {status: "info", text: "text"};
        setFile(blob);
        dispatch(uploadBlogImage(blob, (success, data) => {
            if(success){
              console.log('data', data);  
              // setUploading(false);
              status = {
                  status: "success",
                  text: "Profile Photo was uploaded Successfully"
              };
            }else{
                console.log('error', data);
                // setUploading(false);
                status = {
                    status: "error",
                    text: "Profile Photo has some issues"
                };
            }
            // renderMessage(status);
          }))
      };

      // if(fileList.length  === 1){
      //   handleFileChangeProfile(fileList[0])
      // }

    // const [uploading, setUploading] = useState(false);
    // const [cropperVisible, setCropperVisible] = useState(false);
    // const [image, setImage] = useState(null);


    // function dataURItoBlob(dataURI) {
    //     // convert base64 to raw binary data held in a string
    //     // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    //     var byteString = atob(dataURI.split(',')[1]);
      
    //     // separate out the mime component
    //     var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
      
    //     // write the bytes of the string to an ArrayBuffer
    //     var ab = new ArrayBuffer(byteString.length);
      
    //     // create a view into the buffer
    //     var ia = new Uint8Array(ab);
      
    //     // set the bytes of the buffer to the correct values
    //     for (var i = 0; i < byteString.length; i++) {
    //         ia[i] = byteString.charCodeAt(i);
    //     }
      
    //     // write the ArrayBuffer to a blob, and you're done
    //     var blob = new Blob([ab], {type: mimeString});
    //     return blob;
      
    //   }
    //   const renderMessage = (status) => {
    //     if (!uploading){
    //         if(status.status === "success"){
    //             message.success(status.text);
    //         }else if(status.status === "error"){
    //             message.error(status.text);
    //         }
    //     }
    // }

    // const handleFileChangeProfile = (dataURI) => {
    //     const file = dataURItoBlob(dataURI);
    //     setUploading(true);
    //     let status = {status: "info", text: "text"};
    //     // dispatch(uploadUserPhoto(file, (success, data) => {
    //     //     if(success){
    //     //       console.log('data', data);  
    //     //       setUploading(false);
    //     //       status = {
    //     //           status: "success",
    //     //           text: "Profile Photo was uploaded Successfully"
    //     //       };
    //     //     }else{
    //     //         console.log('error', data);
    //     //         setUploading(false);
    //     //         status = {
    //     //             status: "error",
    //     //             text: "Profile Photo has some issues"
    //     //         };
    //     //     }
    //     //     renderMessage(status);
    //     //   }))
    //   };

    // const handlePhotoChanged = (dataUrl) => {
    //     // setImage(dataUrl);
    //     setCropperVisible(true);
    //   }

    const renderUploadButton = () => {
        return (
            <ImgCrop rotate aspect={12/8}>
                <Upload
                    // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onChange={handleFileChangeProfile}
                    onPreview={onPreview}
                >
                    {fileList.length < 1 && '+ Upload'}
                </Upload>
            </ImgCrop>
        )
    }

    

//   const profileProps = {
//       name: 'file',
//       accept: 'image/*',
//       beforeUpload: (file) => {
//         let reader = new FileReader();
//         var file = file;
//         if (!file) return;
//         reader.onload = function (img) {
//           // handleFileChangeProfile(file);
//           handlePhotoChanged(file);
//           setImage(img.target.result);
//         };
//         reader.readAsDataURL(file);
//         return false;
//       },
//     };

    const renderEditor = () => {
        return (
          <Editor
            initialValue="<p>This is the initial content of the editor</p>"
            init={{
              height: 500,
              menubar: false,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
              ],
              toolbar:
                'undo redo | formatselect | bold italic backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help'
            }}
            onEditorChange={handleEditorChange}
          />
        );
      }

    return (
        <div>
            <div className="change-photo-btn">
                {renderUploadButton()}
            </div>
            {renderEditor()}
            {/* {image ? <AvatarCropper
              modalSize='520px'
              onRequestHide={() => { setCropperVisible(false)}}
              cropperOpen={cropperVisible}
              onCrop={(croppedImage) => {setImage(croppedImage); setCropperVisible(false); handleFileChangeProfile(croppedImage)}}
              image={image}
              width={340}
              height={340}
              targetWidth={340}
              targetHeight={340}
              title='Change profile picture'
            /> : null} */}
        </div>
    )
}
