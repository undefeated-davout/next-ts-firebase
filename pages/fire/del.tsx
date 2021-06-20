import { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '@material-ui/core/Button';

import Layout from '../../components/Layout';
import firebase from 'firebase';
import { useRouter } from 'next/router';
import '../../components/fire';

const db = firebase.firestore();

export default function Delete() {
  const [message, setMessage] = useState('wait.');
  const [data, setData] = useState<firebase.firestore.DocumentData | undefined | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (router.query.id !== undefined) {
      setMessage('Delete id = ' + router.query.id);
      db.collection('mydata')
        .doc(router.query.id as string)
        .get()
        .then((ob) => {
          setData(ob.data());
        });
    } else {
      setMessage(message + '.');
    }
  }, [message]);

  const doAction = () => {
    db.collection('mydata')
      .doc(router.query.id as string)
      .delete()
      .then((ref) => {
        router.push('/fire');
      });
  };

  return (
    <div>
      <Layout header="Next.js" title="Top page.">
        <div className="alert alert-primary text-center">
          <h5 className="mb-4">{message}</h5>
          <pre className="card p-3 m-3 h5 text-left">
            Name: {data == undefined || data == null ? '...' : data.name}
            <br />
            Mail: {data == undefined || data == null ? '...' : data.mail}
            <br />
            Age: {data == undefined || data == null ? '...' : data.age}
          </pre>
          <button onClick={doAction} className="btn btn-primary">
            Delete
          </button>
        </div>
        <Link href="/fire">
          <Button variant="contained">top</Button>
        </Link>
      </Layout>
    </div>
  );
}
