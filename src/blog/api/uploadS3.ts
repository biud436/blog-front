import axios from 'axios';

export default function uploadS3(formData: FormData) {
    return axios.post('/image/s3/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}
