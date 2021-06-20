import Link from 'next/link';
import { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';

import Layout from '../../components/Layout';
import firebase from 'firebase';
import '../../components/fire';

const db = firebase.firestore();

export default function Home() {
  const mydata: firebase.firestore.DocumentData[] = [];
  const [data, setData] = useState(mydata);
  const [message, setMessage] = useState('wait...');

  useEffect(() => {
    db.collection('mydata')
      .get()
      .then((snapshot) => {
        snapshot.forEach((document) => {
          mydata.push(document);
        });
        setData(mydata);
        setMessage('Firebase data.');
      });
  }, []);

  return (
    <div>
      <Layout header="Next.js" title="Top page.">
        <div className="alert alert-primary text-center">
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
              {data.map((document) => {
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
              })}
            </tbody>
          </table>
        </div>
        <Link href="/fire/add">
          <Button variant="contained">add</Button>
        </Link>
      </Layout>
    </div>
  );
}
