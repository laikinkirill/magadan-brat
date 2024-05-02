import React, { useEffect, useState } from "react";
import styles from "./Admin.module.scss";
import axios from "axios";
import { Container, Header } from "../../components";

function Admin() {
  const [isInputValue, setIsInputValue] = useState("");
  const [isAdmin, setIsAdmin] = useState("");
  const buttonHandler = () => {
    setIsAdmin(isInputValue);
  };
  const [fact, setFact] = useState([]);

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    axios
      .get("https://magadan-3137c-default-rtdb.firebaseio.com/title.json")
      .then((response) => {
        setFact(response.data.text);
      });
  }, [fact]);

  const putFact = () => {
    axios.put(`https://magadan-3137c-default-rtdb.firebaseio.com/title.json`, {
      text: inputValue,
    });

    setTimeout(() => {
      axios
        .get("https://magadan-3137c-default-rtdb.firebaseio.com/title.json")
        .then((response) => {
          setFact(response.data.text);

          console.log(fact);
        });
    }, 1000);
  };

  return (
    <>
      {isAdmin === "admin" ? (
        <>
          <Header />
          <Container>
            <div className={styles.test}>
              <h1>{fact}</h1>
              <input
                className={styles.input}
                type="text"
                placeholder="Мой текст"
                value={inputValue}
                onChange={handleInputChange}
              />
              {/* {inputValue} */}
              <div
                value="Find fact"
                className={styles.button}
                onClick={putFact}
              >
                Изменить
              </div>
            </div>
          </Container>
        </>
      ) : (
        <div className={styles.login}>
          <input
            placeholder="Пароль"
            onChange={(e) => setIsInputValue(e.target.value)}
            className={styles.loginInput}
            type="password"
          />

          <div className={styles.button} onClick={buttonHandler}>
            Войти
          </div>
        </div>
      )}
    </>
  );
}

export default Admin;
