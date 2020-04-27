import React, { useState, useEffect } from 'react';

const errorMsgMap = (key, msg = '') => {
  const obj = {
    ALBUM_NAME_PREREQUISITE_CHAR:
      '폴더명은 공백을 제외한 최소 1자 이상의 문자가 포함되어야 합니다.',
    ALBUM_NAME_CANNOT_CONTAIN_SLASH: `폴더명에 슬래시는 포함될 수 없습니다`,
    ALBUM_NAME_ALREADY_EXIST: `동일한 폴더명을 이미 사용 중입니다. `,
    ALBUM_NAME_UNKNOWN_ERROR: `폴더를 생성 하는 중 해당 에러가 발생했습니다. ${msg}`,
    NO_SELECTED_IMAGE: '업로드 할 이미지를 최소 1개 이상 선택해주세요.',
    IMAGE_UPLOAD_UNKNOWN_ERROR: `이미지를 업로드 하는 도중 해당 에러가 발생했습니다. ${msg}`,
  };

  return obj[key];
};

const useS3 = () => {
  const updateS3 = () => {
    // eslint-disable-next-line no-undef
    AWS.config.update({
      // eslint-disable-next-line no-undef
      region: `${BUCKET_REGION}`,
      // eslint-disable-next-line no-undef
      credentials: new AWS.CognitoIdentityCredentials({
        // eslint-disable-next-line no-undef
        IdentityPoolId: `${IDENTITY_POOL_ID}`,
      }),
    });

    // eslint-disable-next-line no-undef
    return new AWS.S3({
      apiVersion: '2006-03-01',
      // eslint-disable-next-line no-undef
      params: { Bucket: `${ALBUM_BUCKET_NAME}` },
    });
  };

  const initS3 = () => {
    // eslint-disable-next-line no-undef
    AWS.config.update({
      region: null,
      // eslint-disable-next-line no-undef
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: null,
      }),
    });
  };

  const createAlbum = (s3, albumName, albumNamePrefix, files) => {
    if (!albumName) {
      return {
        error: true,
        msg: errorMsgMap('ALBUM_NAME_PREREQUISITE_CHAR'),
      };
    }

    if (albumName.indexOf('/') !== -1) {
      return {
        error: true,
        msg: errorMsgMap('ALBUM_NAME_CANNOT_CONTAIN_SLASH'),
      };
    }

    if (!files.length) {
      return {
        error: true,
        msg: errorMsgMap('NO_SELECTED_IMAGE'),
      };
    }

    const albumKey = albumNamePrefix + encodeURIComponent(albumName) + '/';
    s3.headObject({ Key: albumKey }, (err, data) => {
      if (!err)
        return { error: true, msg: errorMsgMap('ALBUM_NAME_ALREADY_EXIST') };

      if (err.code === 'NotFound') {
        s3.putObject({ Key: albumKey }, (err, data) => {
          if (err)
            return {
              error: true,
              msg: errorMsgMap('ALBUM_NAME_UNKNOWN_ERROR', err.message),
            };
        });
      }
    });

    return { error: false, msg: albumKey };
  };

  const addImage = (files, albumKey) => {
    return Promise.all(
      files.map((file) => {
        const fileName = file.name;

        const photoKey = albumKey + fileName;
        // eslint-disable-next-line no-undef
        const upload = new AWS.S3.ManagedUpload({
          params: {
            // eslint-disable-next-line no-undef
            Bucket: `${ALBUM_BUCKET_NAME}`,
            Key: photoKey,
            Body: file,
            ACL: 'public-read',
          },
        });

        return upload.promise();
      })
    ).then(
      (response) => {
        const uploadedUrl = response.reduce((acc, cur) => {
          return acc.concat(cur.Location);
        }, []);

        return {
          error: false,
          msg: uploadedUrl,
        };
      },
      (err) => {
        return {
          error: true,
          msg: errorMsgMap('IMAGE_UPLOAD_UNKNOWN_ERROR', err.message),
        };
      }
    );
  };

  /**
   * 이미지를 S3에 업로드하고 URL이 담긴 배열을 프로미스 형태로 리턴합니다.
   * @param {string} albumName
   * @param {string} albumNamePrefix
   * @param {Array} images file객체를 담고 있는 배열.
   * @returns {Promise} "S3에 업로드된 URL을 담고있는 배열"을 resolved value로 갖는 Promise.
   */
  const S3imageUploadHandler = async ({
    albumName,
    albumNamePrefix,
    images,
  }) => {
    try {
      const s3 = updateS3();

      const createAlbumResponse = await createAlbum(
        s3,
        albumName,
        albumNamePrefix,
        images
      );
      if (createAlbumResponse.error) throw createAlbumResponse.msg;

      const albumKey = createAlbumResponse.msg;

      const addImageResponse = await addImage(images, albumKey);

      if (addImageResponse.error) throw addImageResponse.msg;

      const uploadedUrl = addImageResponse.msg;

      return uploadedUrl;
    } catch (err) {
      if (err === '업로드 할 이미지를 최소 1개 이상 선택해주세요.') alert(err);
      else {
        console.log(err);
        alert('서버 에러가 발생했습니다. 다음에 다시 시도해주세요. ');
      }
    } finally {
      initS3();
    }
  };

  return { S3imageUploadHandler };
};

export default useS3;
