import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordsarray, setpasswordsarray] = useState([]);

  const getpasswords =  async () => {
    let req = await fetch("https://localhost:3000/")
    let passwords = await req.json()
    console.log(passwords)
    setpasswordsarray(passwords);
  }
  

  useEffect(() => {
    getpasswords();
    
  }, []);

  const showpassword = () => {
    passwordRef.current.type = "text";
    if (ref.current.src.includes("/eye.svg")) {
      passwordRef.current.type = "text";
      ref.current.src = "/eyecross.svg";
    } else {
      passwordRef.current.type = "password";
      ref.current.src = "/eye.svg";
    }
  };

  const savepassword = () => {

    if(form.site.length> 3 &&  form.username.length > 3&& form.password.length >3){

      setpasswordsarray([...passwordsarray, {...form , id: uuidv4()}]);
      localStorage.setItem( ["passwords", JSON.stringify([...passwordsarray ,{...form , id: uuidv4()}])]);
      console.log([...passwordsarray , form]);
      setform({site:"" , username:"" , password:""})
    }
    else{
      toast('error: cant save empty password')
    }
    
  };

  const deletepassword = (id) => {
    console.log("deleting password with id" , id)
    let c = confirm("do you want to delete this password")
    if(c){
    setpasswordsarray(passwordsarray.filter(item=>item.id!==id));
    localStorage.setItem("passwords" ,JSON.stringify(passwordsarray.filter(item=>item.id!==id)));
    toast("🦄 Password deleted succesfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    // console.log(passwordsarray);
        }
  };
  const editpassword = (id) => {
    console.log("editing password with id" , id)
    setform(passwordsarray.filter(i=>i.id===id)[0]);
    setpasswordsarray(passwordsarray.filter(item=>item.id!==id));
    // setpasswordsarray([...passwordsarray, {...form , id: uuidv4()}]);
    // localStorage.setItem( "passwords", JSON.stringify([...passwordsarray, form]));
   // console.log(passwordsarray);
  };

  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const copytext = (text) => {
    toast("🦄 Copied to clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>

      <div className=" mx-auto   max-w-4xl min-h-[84.5vh]">
        <div className="font-bold text-4xl text-center">
          {" "}
          <span className="text-purple-400 "> &lt;</span>
          Pass
          <span className="text-purple-400 ">OP&gt; </span>{" "}
        </div>

        <p className="text-center text-purple-400 font-medium">
          Your Password Manager
        </p>
        <div className=" flex flex-col p-4 bgb items-center">
          <input
            value={form.site}
            onChange={handlechange}
            placeholder="Enter website URL"
            className="rounded-full   border border-purple-800 w-full p-3 py-1"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row my-4 gap-4 w-[50vw]">
            <input
              value={form.username}
              onChange={handlechange}
              placeholder="Enter Username"
              className="rounded-full  border border-purple-800 w-full p-3 py-1"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handlechange}
                placeholder="Enter Password"
                className="rounded-full  border border-purple-800 w-full p-3 py-1"
                type="password"
                name="password"
                id="password"
              />
              <span
                className="absolute right-1 top-1 cursor-pointer"
                onClick={showpassword}
              >
                <img ref={ref} width={23} src="/eye.svg" alt="eye" />
              </span>
            </div>
          </div>
          <button
            onClick={savepassword}
            className="flex justify-center items-center border border-purple-800 py-2 bg-purple-400 w-fit rounded-full hover:bg-purple-300 gap-3 p-3 px-8 "
          >
            <lord-icon
              src="https://cdn.lordicon.com/hqymfzvj.json"
              trigger="hover"
            ></lord-icon>
            Save Password
          </button>
        </div>
        <div className="passwords">
          <h1 className="text-xl font-bold  py-2">Your Passwords</h1>
          {passwordsarray.length === 0 && (
            <div className="font-semibold text-xl py-2">
              No Passwords to show
            </div>
          )}
          {passwordsarray.length != 0 && (
            <table className="table-auto w-full rounded-xl overflow-hidden mb-12">
              <thead className="bg-purple-300">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-purple-100">
                {passwordsarray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 border border-white text-center w-32">
                        {" "}
                        <a href="{item.site}" target="_blank">
                          {item.site}{" "}
                        </a>
                        <span
                          className="lordiconcopy size-7 cursor-pointer "
                          onClick={() => {
                            copytext(item.site);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/lyrrgrsl.json"
                            trigger="hover"
                            style={{
                              width: "25px",
                              height: "30px",
                              top: "7px",
                            }}
                          ></lord-icon>{" "}
                        </span>
                      </td>
                      <td className="py-2 border border-white text-center w-32">
                        {item.username}
                        <span
                          className="lordiconcopy size-7  cursor-pointer"
                          onClick={() => {
                            copytext(item.username);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/lyrrgrsl.json"
                            trigger="hover"
                            style={{
                              width: "25px",
                              height: "30px",
                              top: "1px",
                              padding: "7px",
                            }}
                          ></lord-icon>{" "}
                        </span>
                      </td>
                      <td className="py-2 border border-white text-center w-32">
                        <span> {'*'.repeat(item.password.length)} </span>
                        <span
                          className="lordiconcopy  size-7 cursor-pointer "
                          onClick={() => {
                            copytext(item.password);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/lyrrgrsl.json"
                            trigger="hover"
                            style={{
                              width: "25px",
                              height: "30px",
                              top: "3px",
                              padding: "4px",
                            }}
                          ></lord-icon>{" "}
                        </span>
                      </td>
                      <td className="py-2 border border-white text-center w-32 ">
                        <span className="mx-2 top-2 cursor-pointer" onClick={()=> {editpassword(item.id)}}>
                          <lord-icon
                            src="https://cdn.lordicon.com/wuvorxbv.json"
                            trigger="hover"
                            // style={"width:250px;height:250px"}
                          ></lord-icon>
                        </span>
                        <span className="cursor-pointer mx-4" onClick={()=> {deletepassword(item.id)}}>
                          <lord-icon
                            src="https://cdn.lordicon.com/drxwpfop.json"
                            trigger="hover"
                           
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
