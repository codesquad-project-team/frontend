import React, { useState, useEffect } from 'react';

const errorMsgMap = (key, msg = '') => {
  const obj = {
    ALBUM_NAME_PREREQUISITE_CHAR:
      '폴더명은 공백을 제외한 최소 1자 이상의 문자가 포함되어야 합니다.',
    ALBUM_NAME_CANNOT_CONTAIN_SLASH: `폴더명에 슬래시는 포함될 수 없습니다`,
    ALBUM_NAME_ALREADY_EXIST: `동일한 폴더명을 이미 사용 중입니다. `,
    ALBUM_NAME_UNKNOWN_ERROR: `폴더를 생성 하는 중 해당 에러가 발생했습니다. ${msg}`,
    CAN_SELECT_UPLOAD_IMAGE: '업로드 할 이미지를 최소 1개 이상 선택해주세요.',
    IMAGE_UPLOAD_UNKNOWN_ERROR: `이미지를 업로드 하는 도중 해당 에러가 발생했습니다. ${msg}`
  };

  console.log(obj[key]);

  return obj[key];
};

const displayUserError = () => {};

const displayServerError = () => {};

const useS3 = () => {
  const initS3 = () => {
    // eslint-disable-next-line no-undef
    AWS.config.update({
      // eslint-disable-next-line no-undef
      region: `${BUCKET_REGION}`,
      // eslint-disable-next-line no-undef
      credentials: new AWS.CognitoIdentityCredentials({
        // eslint-disable-next-line no-undef
        IdentityPoolId: `${IDENTITY_POOL_ID}`
      })
    });
    // eslint-disable-next-line no-undef
    return new AWS.S3({
      apiVersion: '2006-03-01',
      // eslint-disable-next-line no-undef
      params: { Bucket: `${ALBUM_BUCKET_NAME}` }
    });
  };

  const deleteS3 = (s3, albumKey) => {
    const params = {
      // eslint-disable-next-line no-undef
      Bucket: `${ALBUM_BUCKET_NAME}`,
      Key: `${albumKey}`
    };
    s3.deleteObject(params, (err, data) => {
      if (err) console.log(err, err.stack);
      // an error occurred
      else console.log(data); // successful response
    });
  };

  const createAlbum = (s3, nickname, date) => {
    const albumName = nickname.concat('_', date).trim();

    if (!albumName)
      return {
        error: true,
        msg: errorMsgMap('ALBUM_NAME_PREREQUISITE_CHAR')
      };

    if (albumName.indexOf('/') !== -1)
      return {
        error: true,
        msg: errorMsgMap('ALBUM_NAME_CANNOT_CONTAIN_SLASH')
      };

    const albumKey = 'post-images/' + encodeURIComponent(albumName) + '/';

    s3.headObject({ Key: albumKey }, function(err, data) {
      if (!err)
        return { error: true, msg: errorMsgMap('ALBUM_NAME_ALREADY_EXIST') };

      if (err.code === 'NotFound') {
        s3.putObject({ Key: albumKey }, function(err, data) {
          if (err)
            return {
              error: true,
              msg: errorMsgMap('ALBUM_NAME_UNKNOWN_ERROR', err.message)
            };
        });
      }
    });

    return { error: false, msg: albumKey };
  };

  const addImage = (files, albumKey) => {
    if (!files.length) {
      return {
        error: true,
        msg: errorMsgMap('CAN_SELECT_UPLOAD_IMAGE')
      };
    }

    const response = Promise.all(
      files.map(file => {
        const fileName = file.name;

        const photoKey = albumKey + fileName;
        // eslint-disable-next-line no-undef
        const upload = new AWS.S3.ManagedUpload({
          params: {
            // eslint-disable-next-line no-undef
            Bucket: `${ALBUM_BUCKET_NAME}`,
            Key: photoKey,
            Body: file,
            ACL: 'public-read'
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
      err => {
        return {
          error: true,
          msg: errorMsgMap('IMAGE_UPLOAD_UNKNOWN_ERROR', err.message)
        };
      }
    );

    return {
      error: false,
      msg: response
    };
  };

  return { initS3, deleteS3, createAlbum, addImage };
};

export default useS3;
