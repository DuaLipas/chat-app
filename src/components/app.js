const {useState, useEffect} = require("react");
const SignUp = require("./signup");
const Chat = require("./chat");
const supabase = require("../utils/supabase");

function App() {
  const [session, setSession] = useState(null);

  useEffect(function () {
    // let s = supabase.auth.session();
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange(function (event, supaSession) {
      setSession(supaSession);
    });
  }, []);

  function handleLogOut() {
    supabase.auth.signOut().then(function () {
      console.log("You are sign out!");
    });
  }

  let markup = <SignUp />;
  if (session) {
    let email = session.user.email;
    markup = (
      <div>
        <h2>You are logged in as {email}</h2>
        <h3 onClick={handleLogOut}>Log Out</h3>
        <br></br>
        <input type="submit" value="Log Out" onClick={handleLogOut} />
        <Chat />
      </div>
    );
  }

  return (
    <div>
      <h2>Supabase + REACT CHAT APP</h2>
      {/* <SignUp /> */}
      {markup}
    </div>
  );
}

module.exports = App;

//
//
//
// JACK's WORKING CODE BELOW!

// const {useState, useEffect} = require("react");
// const SignUp = require("./signup");
// const Chat = require("./chat");
// const supabase = require("../utils/supabase");

// function App() {
//   const [session, setSession] = useState(null);
//   useEffect(function () {
//     setSession(supabase.auth.session());
//     supabase.auth.onAuthStateChange(function (event, supaSession) {
//       setSession(supaSession);
//     });
//   }, []);

//   let markup = <SignUp />; // By default, we will assume they are logged out
//   if (session) {
//     // If they are logged in (meaning there is a session)
//     let email = session.user.email;
//     markup = (
//       <div>
//         <h2>You are logged in as {email}</h2>
//         <Chat />
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h2>Supabase + React Chat App</h2>
//       {markup}
//     </div>
//   );
// }

// module.exports = App;
