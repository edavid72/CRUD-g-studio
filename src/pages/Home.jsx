import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/firebase';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container, Grid } from '@mui/material';

const Home = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const unsub = onSnapshot(
      collection(db, 'users'),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setUsers(list);
        console.log(users);
        setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('jhsakfjhkjfh')) {
      try {
        await deleteDoc(doc(db, 'users', id));
        setUsers(users.filter((user) => user.id !== id));
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Container >
      <Grid container spacing={3} marginTop={5} justifyContent={'center'}>
        {users &&
          users.map((user) => {
            return (
              <Grid item key={user.id}>
                <Card sx={{width:'310px' }}>
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    height="140"
                    image={user.img}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {user.name}
                    </Typography>

                    <Typography gutterBottom variant="p" component="div">
                      {user.email}
                    </Typography>

                    <Typography gutterBottom variant="p" component="div">
                      {user.phone}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user.info}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      variant="outlined"
                      color="secondary"
                      onClick={() => navigate(`/update/${user.id}`)}
                    >
                      Update
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </Container>
  );
};

export default Home;
