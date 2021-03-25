import { gql } from '@apollo/client';

export const UPLOAD_FILE = gql`
    mutation($file: Upload!) {
        uploadFile(file: $file) {
            filename
            mimetype
            encoding
        }
    }
  `;

  export const DELETE_FILE = gql`
    mutation($file: String!) {
        deleteFile(file: $file)
    }
  `;