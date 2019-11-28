import React, { useState, useEffect } from "react";
const AWS = require("aws-sdk");

const useS3 = () => {
  const [s3, setS3] = useState(null);

  const createAlbum = (nickname, date) => {
    const albumName = nickname.concat("_", date).trim();

    if (!albumName) {
      console.log("Album names must contain at least one non-space character.");
      return;
    }

    if (albumName.indexOf("/") !== -1) {
      console.log("Album names cannot contain slashes.");
      return;
    }

    const albumKey = "post-images/" + encodeURIComponent(albumName) + "/";

    s3.headObject({ Key: albumKey }, function(err, data) {
      if (!err) {
        console.log("Album already exists.");
        return;
      }

      if (err.code === "NotFound") {
        s3.putObject({ Key: albumKey }, function(err, data) {
          if (err) {
            console.log(
              "There was an error creating your album: " + err.message
            );
            return;
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

    const response = Promise.all(
      files.map(file => {
        const fileName = file.name;
        const albumPhotosKey =
          "post-images/" + encodeURIComponent(albumName) + "/";
        const photoKey = albumPhotosKey + fileName;

        const upload = new AWS.S3.ManagedUpload({
          params: {
            // eslint-disable-next-line no-undef
            Bucket: `${ALBUM_BUCKET_NAME}`,
            Key: photoKey,
            Body: file,
            ACL: "public-read"
          }
        });

        return upload.promise();
      })
    ).then(
      uploadedUrl => {
        return uploadedUrl.reduce((acc, cur) => {
          return acc.concat(cur.Location);
        }, []);
      },
      err =>
        console.log("There was an error uploading your photo: ", err.message)
    );

    return response;
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
