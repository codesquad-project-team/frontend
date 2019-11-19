import React, { useState, useEffect } from "react";
const AWS = require("aws-sdk");

const useS3 = () => {
  const [s3, setS3] = useState(null);

  const createAlbum = (nickname, date) => {
    let albumName = nickname.concat("_", date).trim();

    if (!albumName) {
      return alert(
        "Album names must contain at least one non-space character."
      );
    }

    if (albumName.indexOf("/") !== -1) {
      return alert("Album names cannot contain slashes.");
    }

    var albumKey = "post-images/" + encodeURIComponent(albumName) + "/";

    s3.headObject({ Key: albumKey }, function(err, data) {
      if (!err) {
        return alert("Album already exists.");
      }
      if (err.code !== "NotFound") {
        return alert("There was an error creating your album: " + err.message);
      }

      if (err.code === "NotFound") {
        s3.putObject({ Key: albumKey }, function(err, data) {
          if (err) {
            return alert(
              "There was an error creating your album: " + err.message
            );
          }
        });
      }
    });

    return albumName;
  };

  const addImage = (files, albumName) => {
    if (!files.length) {
      return alert("Please choose a file to upload first.");
    }
    var file = files[0];
    var fileName = file.name;
    var albumPhotosKey = "post-images/" + encodeURIComponent(albumName) + "//";
    var photoKey = albumPhotosKey + fileName;

    var upload = new AWS.S3.ManagedUpload({
      params: {
        // eslint-disable-next-line no-undef
        Bucket: `${ALBUM_BUCKET_NAME}`,
        Key: photoKey,
        Body: file,
        ACL: "public-read"
      }
    });

    var promise = upload.promise();

    promise.then(
      function(data) {
        alert("Successfully uploaded photo.");
      },
      function(err) {
        return alert("There was an error uploading your photo: ", err.message);
      }
    );
  };

  useEffect(() => {
    AWS.config.update({
      // eslint-disable-next-line no-undef
      region: `${BUCKET_REGION}`,
      credentials: new AWS.CognitoIdentityCredentials({
        // eslint-disable-next-line no-undef
        IdentityPoolId: `${IDENTITY_POOL_ID}`
      })
    });

    setS3(
      new AWS.S3({
        apiVersion: "2006-03-01",
        // eslint-disable-next-line no-undef
        params: { Bucket: `${ALBUM_BUCKET_NAME}` }
      })
    );
  }, []);

  return { s3, createAlbum, addImage };
};

export default useS3;
