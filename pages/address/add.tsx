import { useState, useEffect } from 'react';
import firebase from 'firebase';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Layout from '../../components/Layout';
import '../../components/fire';

const db = firebase.firestore();
const auth = firebase.auth();

export default function Add() {
  const [message, setMessage] = useState('add address');
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [tel, setTel] = useState('');
  const [memo, setMemo] = useState('');
  const router = useRouter();

  // ログインしてなければトップページに戻る
  useEffect(() => {
    if (auth.currentUser == null) {
      router.push('/address');
    }
  }, []);

  // name, mail, tel, memoの入力処理
  const onChangeName = (e: React.FormEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };
  const onChangeMail = (e: React.FormEvent<HTMLInputElement>) => {
    setMail(e.currentTarget.value);
  };
  const onChangeTel = (e: React.FormEvent<HTMLInputElement>) => {
    setTel(e.currentTarget.value);
  };
  const onChangeMemo = (e: React.FormEvent<HTMLInputElement>) => {
    setMemo(e.currentTarget.value);
  };

  // アドレスの登録
  const doAction = () => {
    const ob = {
      name: name,
      mail: mail,
      tel: tel,
      memo: memo,
      flag: false,
    };

    if (auth.currentUser !== null && auth.currentUser.email !== null) {
      db.collection('address')
        .doc(auth.currentUser.email)
        .collection('address')
        .doc(mail)
        .set(ob)
        .then((ref) => {
          router.push('/address');
        });
    }
  };

  return (
    <div>
      <Layout header="Next.js" title="Create data.">
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
              <label>Tel:</label>
              <input type="text" onChange={onChangeTel} className="form-control" />
            </div>
            <div className="form-group">
              <label>Memo:</label>
              <input type="text" onChange={onChangeMemo} className="form-control" />
            </div>
          </div>
          <button onClick={doAction} className="btn btn-primary">
            Add
          </button>
          <Link href="/address">
            <button className="btn">Go Back</button>
          </Link>
        </div>
      </Layout>
    </div>
  );
}
