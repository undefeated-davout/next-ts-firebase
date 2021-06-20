import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import firebase from 'firebase';
import Button from '@material-ui/core/Button';

import Layout from '../../components/Layout';
import '../../components/fire';

const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

auth.signOut();

export default function Index() {
  const [user, setUser] = useState<string | null>(null);
  const [data, setData] = useState<firebase.firestore.DocumentData[]>([]);
  const [message, setMessage] = useState('please login...');
  const router = useRouter();

  // ログイン処理
  const login = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        if (result.user !== null) {
          setUser(result.user.displayName);
          setMessage('logined: ' + result.user.displayName);
        }
      })
      .catch((error) => {
        setUser('NONE');
        setMessage('not logined.');
      });
  };

  // ログアウト処理
  const logout = () => {
    auth.signOut();
    setUser(null);
    setData([]);
    setMessage('logout...');
  };

  // ログイン表示をクリックしたとき
  const doLogin = () => {
    if (auth.currentUser == null) {
      login();
    } else {
      logout();
    }
  };

  // アドレスデータの取得と表示
  useEffect(() => {
    if (auth.currentUser !== null) {
      setUser(auth.currentUser.displayName);
      setMessage(auth.currentUser.displayName + 'さんの登録アドレス');
      if (auth.currentUser.email !== null) {
        db.collection('address')
          .doc(auth.currentUser.email)
          .collection('address')
          .get()
          .then((snapshot) => {
            let addresses: firebase.firestore.DocumentData[] = [];
            snapshot.forEach((document) => {
              addresses.push(document);
            });
            setData(addresses);
          });
      }
    } else {
      setMessage('no data');
    }
  }, [message]);

  return (
    <div>
      <Layout header="Next.js" title="Address book.">
        <div className="alert alert-primary text-center">
          <h6 className="text-right" onClick={doLogin}>
            <Button variant="contained">{user === null ? 'LOGIN' : `LOGINED:${user}`}</Button>
          </h6>
          <h5 className="mb-4">{message}</h5>
          <ul className="list-group">
            {data.map((document) => {
              const doc = document.data();
              return (
                <li>
                  <Link href={`/address/info?id=${document.id}`}>
                    {doc.flag ? '√' : ''}
                    {doc.name} ({doc.mail})
                  </Link>
                </li>
              );
            })}
          </ul>
          <hr />
          <Link href="/address/add">
            <button className="btn btn-primary">Add address</button>
          </Link>
        </div>
      </Layout>
    </div>
  );
}
