import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import firebase from 'firebase';

import Layout from '../../components/Layout';
import '../../components/fire';

const db = firebase.firestore();
const auth = firebase.auth();

export default function Info() {
  const [message, setMessage] = useState('address info');
  const [cmt, setCmt] = useState('');
  const [mydata, setMydata] = useState<firebase.firestore.DocumentData | undefined | null>(null);
  const [msgdata, setMsgdata] = useState<string[]>([]);
  const router = useRouter();

  // ログインしてなければトップページに戻る
  useEffect(() => {
    if (auth.currentUser == null) {
      router.push('/address');
    }
  }, []);

  // 入力フィールドの処理
  const onChangeCmt = (e: React.FormEvent<HTMLInputElement>) => {
    setCmt(e.currentTarget.value);
  };

  // メッセージの投稿
  const doAction = () => {
    if (auth.currentUser === null || auth.currentUser.email === null) return;
    const email = auth.currentUser.email;
    const queryID = router.query.id as string;

    const t = new Date().getTime();
    const to = {
      comment: 'To: ' + cmt,
      time: t,
    };
    const from = {
      comment: 'From: ' + cmt,
      time: t,
    };
    // 自身のアドレス内にメッセージを追加
    db.collection('address')
      .doc(email)
      .collection('address')
      .doc(queryID)
      .collection('message')
      .add(to)
      .then((ref) => {
        // 相手のアドレス内にメッセージを追加
        db.collection('address')
          .doc(queryID)
          .collection('address')
          .doc(email)
          .collection('message')
          .add(from)
          .then((ref) => {
            // 相手のアドレス内のflagを変更
            db.collection('address')
              .doc(queryID)
              .collection('address')
              .doc(email)
              .update({ flag: true })
              .then((ref) => {
                router.push('/address');
              });
          });
      });
  };

  // アドレスデータとメッセージを取得し表示
  useEffect(() => {
    if (auth.currentUser !== null && auth.currentUser.email !== null) {
      const queryID = router.query.id as string;
      db.collection('address')
        .doc(auth.currentUser.email)
        .collection('address')
        .doc(queryID)
        .get()
        .then((snapshot) => {
          setMydata(snapshot.data());
        });
      db.collection('address')
        .doc(auth.currentUser.email)
        .collection('address')
        .doc(queryID)
        .collection('message')
        .orderBy('time', 'desc')
        .get()
        .then((snapshot) => {
          const data: string[] = [];
          snapshot.forEach((document) => {
            data.push(document.data().comment);
          });
          setMsgdata(data);
        });
      db.collection('address')
        .doc(auth.currentUser.email)
        .collection('address')
        .doc(queryID)
        .update({ flag: false });
    } else {
      setMessage('no data');
    }
  }, [message]);

  return (
    <div>
      <Layout header="Next.js" title="Info & messages.">
        <div className="alert alert-primary text-center">
          <h5 className="mb-4">{message}</h5>
          <div className="text-left">
            <div>
              {mydata !== undefined && mydata !== null && (
                <>
                  <div>Name: {mydata.name}</div>
                  <div>Mail: {mydata.mail}</div>
                  <div>Tel: {mydata.tel}</div>
                  <div>Memo: {mydata.memo}</div>
                </>
              )}
            </div>
            <hr />
            <div className="form-group">
              <label>Message:</label>
              <input type="text" onChange={onChangeCmt} className="form-control" />
            </div>
          </div>
          <button onClick={doAction} className="btn btn-primary">
            Send Message
          </button>
          <Link href="/address">
            <button className="btn">Go Back</button>
          </Link>
        </div>
        <ul className="list-group">
          {msgdata.map((msg) => {
            <li className="list-group-item px-3 py-1">{msg}</li>;
          })}
        </ul>
      </Layout>
    </div>
  );
}
