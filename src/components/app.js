const {useState, useEffect} = require("react");
const SignUp = require("./signup");
const Chat = require("./chat");
const supabase = require("../utils/supabase");

function App() {
  const [session, setSession] = useState(null);

  useEffect(function () {
    // let s = supabase.auth.session();
    supabase.auth.onAuthStateChange(function (event, supaSession) {
      setSession(supaSession);
    });
  }, []);

  let markup = <SignUp />;
  if (session) {
    let email = session.user.email;
    markup = (
      <div>
        <h2>You are logged in as {email}</h2>
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
// JACK WORKING CODE BELOW!

// const {BrowserRouter, Switch, Route} = require("react-router-dom");
// const {useState, useEffect} = require("react");
// const supabase = require("../utils/supabase");
// const Nav = require("./nav");
// const Login = require("./login");
// const About = require("./about");
// const Home = require("./home");
// const Contact = require("./contact");
// const Chat = require("./chat");

// function App() {
//   const [session, setSession] = useState(null);
//   useEffect(() => {
//     setSession(supabase.auth.session());
//     supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session);
//     });
//   }, []);
//   return (
//     <BrowserRouter>
//       {!session && <Login />}
//       {session && (
//         <div>
//           <Nav />
//           <div>
//             <Switch>
//               <Route exact={true} path="/">
//                 <Home />
//               </Route>
//               <Route path="/chat">
//                 <Chat user={session.user} />
//               </Route>
//               <Route path="/about">
//                 <About />
//               </Route>
//               <Route path="/contact">
//                 <Contact />
//               </Route>
//             </Switch>
//           </div>
//         </div>
//       )}
//     </BrowserRouter>
//   );
// }

// module.exports = App;
