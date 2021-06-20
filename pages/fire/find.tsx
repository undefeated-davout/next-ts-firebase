import { useState } from 'react';
import Link from 'next/link';
import Button from '@material-ui/core/Button';

import Layout from '../../components/Layout';
import firebase from 'firebase';
import '../../components/fire';

const db = firebase.firestore();

export default function Find() {
  const [message, setMessage] = useState('find data');
  const [findText, setFindText] = useState('');
  const [data, setData] = useState<firebase.firestore.DocumentData[]>([]);
  const mydata: firebase.firestore.DocumentData[] = [];

  const onChangeFind = (e: React.FormEvent<HTMLInputElement>) => {
    setFindText(e.currentTarget.value);
  };

  const doAction = () => {
    db.collection('mydata')
      .where('name', '==', find)
      .get()
      .then((snapshot) => {
        snapshot.forEach((document) => {
          mydata.push(document);
        });
        setData(mydata);
        setMessage('find: ' + findText);
      });
  };

  return (
    <div>
      <Layout header="Next.js" title="Top page.">
        <div className="alert alert-primary text-center">
          <h5 className="mb-4">{message}</h5>
          <div className="text-left">
            <div className="form-group">
              <label>Find:</label>
              <input type="text" onChange={onChangeFind} className="form-control" />
            </div>
          </div>
          <button onClick={doAction} className="btn btn-primary">
            Find
          </button>
        </div>
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
        <Link href="/fire">
          <Button variant="contained">top</Button>
        </Link>
      </Layout>
    </div>
  );
}
