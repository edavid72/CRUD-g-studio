import { useEffect, useState } from 'react';
import { db, storage } from '../firebase/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FormControl,
  Input,
  InputLabel,
  Container,
  FormHelperText,
  Grid,
  TextareaAutosize,
  Button,
  Stack,
  Typography,
} from '@mui/material';
import ErrorMsg from '../components/ErrorMsg';

import {
  addDoc,
  collection,
  serverTimestamp,
  getDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';

const AddEditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState({
    name: '',
    email: '',
    phone: '',
    info: '',
  });
  const { name, email, phone, info } = data;
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState(false);

  // Update User/
  useEffect(() => {
    id && getUser();
  }, [id]);

  const getUser = async () => {
    const docRef = doc(db, 'users', id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setData({ ...snapshot.data() });
    }
  };

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is pause');
              break;

            case 'running':
              console.log('Upload is running');
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(data).includes('')) {
      setError(true);
      return;
    }

    if (!id) {
      try {
        await addDoc(collection(db, 'users'), {
          ...data,
          timestamp: serverTimestamp(),
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await updateDoc(doc(db, 'users', id), {
          ...data,
          timestamp: serverTimestamp(),
        });
      } catch (error) {
        console.log(error);
      }
    }

    setError(false);
    setIsSubmit(true);
    navigate('/');
  };

  return (
    <Container>
      <Typography variant="h3" padding={2} textAlign={'center'}>
        {id ? 'Update User' : 'Add User'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          spacing={2}
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          marginTop={6}
          padding={3}
        >
          {/* Name */}
          <Grid xs={12} lg={5} padding={3}>
            <FormControl fullWidth>
              <InputLabel htmlFor="name" textAlign={'center'}>
                Name
              </InputLabel>
              <Input
                id="name"
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                aria-describedby="name-helper"
              />
              <FormHelperText id="name-helper">
                Write your full name
              </FormHelperText>
            </FormControl>
          </Grid>

          {/* Email */}
          <Grid xs={12} lg={5} padding={3}>
            <FormControl fullWidth>
              <InputLabel htmlFor="email" textAlign={'center'}>
                Email
              </InputLabel>
              <Input
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                aria-describedby="email-helper"
              />
              <FormHelperText id="name-helper">Write your email</FormHelperText>
            </FormControl>
          </Grid>

          {/* Phone */}
          <Grid xs={12} lg={5} padding={3}>
            <FormControl fullWidth>
              <InputLabel htmlFor="phone" textAlign={'center'}>
                Phone
              </InputLabel>
              <Input
                id="phone"
                type="phone"
                name="phone"
                value={phone}
                onChange={handleChange}
                aria-describedby="phone-helper"
              />
              <FormHelperText id="name-helper">
                Write your full phone
              </FormHelperText>
            </FormControl>
          </Grid>

          {/* Upload */}
          <Grid xs={12} lg={5} padding={3}>
            <FormControl fullWidth>
              <Input
                id="file"
                type="file"
                aria-describedby="file-helper"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <FormHelperText id="file-helper">
                Upload a image or photo{' '}
              </FormHelperText>
            </FormControl>
          </Grid>

          {/* Info */}
          <Grid xs={12} lg={5} padding={3}>
            <FormControl fullWidth>
              <TextareaAutosize
                id="info"
                type="text"
                name="info"
                value={info}
                onChange={handleChange}
                fullWidth
                maxRows={6}
                placeholder="Write any other information"
              />
            </FormControl>
          </Grid>
        </Grid>
        <Stack spacing={2}>
          <Button
            variant="contained"
            type="submit"
            disabled={progress !== null && progress < 100}
          >
            Submit
          </Button>
        </Stack>

        {error && <ErrorMsg />}
      </form>
    </Container>
  );
};

export default AddEditUser;
