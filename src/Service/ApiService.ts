const logIn = async (enteredEmail: string, enteredPassword: string) => {
  try {
    const data = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCkLePHqkPxNxPalsSLE_C4CbAaOiaGwNw",
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!data.ok) {
      console.log(data);
      let errorMessage = "Authentication failed! \n 로그인에 실패하였습니다.";
      throw new Error(errorMessage);
    }
    const json = await data.json();
    console.log(json);
    return json;
  } catch (err) {
    alert(err);
  }
};

const signIn = async (enteredEmail: string, enteredPassword: string) => {
  try {
    const data = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCkLePHqkPxNxPalsSLE_C4CbAaOiaGwNw",
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!data.ok) {
      console.log(data);
      let errorMessage =
        "Sign In failed! Password Should be more than 7 digits. \n 회원가입에 실패하였습니다. 비밀번호는 7자 이상이여야 합니다.";
      throw new Error(errorMessage);
    }
    const json = await data.json();
    console.log(json);
    return json;
  } catch (err) {
    alert(err);
  }
};

export { logIn, signIn };
