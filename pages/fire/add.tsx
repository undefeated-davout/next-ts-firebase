import Link from 'next/link';
import { useState } from 'react';
import Button from '@material-ui/core/Button';

import Layout from '../../components/Layout';
import firebase from 'firebase';
import { useRouter } from 'next/router';
import '../../components/fire';

const db = firebase.firestore();

export default function Add() {
  const [message, setMessage] = useState('add data');
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [age, setAge] = useState(0);
  const router = useRouter();

  const onChangeName = (e: React.FormEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };
  const onChangeMail = (e: React.FormEvent<HTMLInputElement>) => {
    setMail(e.currentTarget.value);
  };
  const onChangeAge = (e: React.FormEvent<HTMLInputElement>) => {
    setAge(Number(e.currentTarget.value));
  };

  const doAction = () => {
    const ob: {
      name: string;
      mail: string;
      age: number;
    } = {
      name: name,
      mail: mail,
      age: age,
    };
    db.collection('mydata')
      .add(ob)
      .then((ref) => {
        router.push('/fire'); // 一覧画面にリダイレクト
      });
  };

  return (
    <div>
      <Layout header="Next.js" title="Top page.">
        <div className="alert alert-primary text-center">
          <h5 className="mb-4">{message}</h5>
          <div className="text-left">
            <div className="form-group">
              <label>Name:</label>
              <input type="text" onChange={onChangeName} className="form-control" />
            </div>
            <div className="form-group">
              <label>Mail:</label>
              <input type="text" onChange={onChangeMail} className="form-control" />
            </div>
            <div className="form-group">
              <label>Age:</label>
              <input type="number" onChange={onChangeAge} className="form-control" />
            </div>
          </div>
          <button onClick={doAction} className="btn btn-primary">
            Add
          </button>
        </div>
        <Link href="/fire">
          <Button variant="contained">top</Button>
        </Link>
      </Layout>
    </div>
  );
}
