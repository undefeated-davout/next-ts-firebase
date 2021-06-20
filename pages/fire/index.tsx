import { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '@material-ui/core/Button';
import firebase from 'firebase';

import Layout from '../../components/Layout';
import '../../components/fire';

const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export default function Home() {
  const mydata: firebase.firestore.DocumentData[] = [];
  const [data, setData] = useState(mydata);
  const [message, setMessage] = useState('wait...');

  useEffect(() => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        if (result.user !== null) {
          setMessage('logined: ' + result.user.displayName);
        }
      })
      .catch((error) => {
        setMessage('not logined.');
      });
  }, []);

  useEffect(() => {
    if (auth.currentUser === null) {
      setData([]);
    } else {
      db.collection('mydata')
        .get()
        .then((snapshot) => {
          snapshot.forEach((document) => {
            mydata.push(document);
          });
          setData(mydata);
          setMessage('Firebase data.');
        });
    }
  }, [message]);

  return (
    <div>
      <Layout header="Next.js" title="Top page.">
        <div className="alert alert-primary text-center">
          <Button
            variant="contained"
            onClick={() =>
              auth.signOut().then(() => {
                setMessage('logouted.');
              })
            }
          >
            SIGN OUT
          </Button>
          <h5 className="mb-4">{message}</h5>
          <table className="table bg-white text-left">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Mail</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((document) => {
                  const doc = document.data();
                  return (
                    <tr key={document.id}>
                      <td>
                        <a href={'/fire/del?id=' + document.id}>{document.id}</a>
                      </td>
                      <td>{doc.name}</td>
                      <td>{doc.mail}</td>
                      <td>{doc.age}</td>
                    </tr>
                  );
                })
              ) : (
                <tr key="1">
                  <th>no data</th>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Link href="/fire/add">
          <Button variant="contained">add</Button>
        </Link>
        <Link href="/fire/find">
          <Button variant="contained">find</Button>
        </Link>
      </Layout>
    </div>
  );
}
