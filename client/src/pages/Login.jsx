import React from 'react'
import { useEffect } from 'react'
import GoogleLogin from "react-google-login"
import { gapi } from "gapi-script"
import { googleAuth } from '../apis/auth'
import { useState } from 'react'
import { loginUser } from '../apis/auth'
import { Link, useNavigate } from 'react-router-dom'
import { BsEmojiLaughing, BsEmojiExpressionless } from "react-icons/bs"
import { toast } from 'react-toastify';
import { validUser } from '../apis/auth'
import chatbg from '../assets/chat-bg.png'

const defaultData = {
  email: "",
  password: ""
}
function Login() {
  const [formData, setFormData] = useState(defaultData)
  const [isLoading, setIsLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const pageRoute = useNavigate()
  const googleSuccess = async (res) => {
    if (res?.profileObj) {
      console.log(res.profileObj)
      setIsLoading(true)
      const response = await googleAuth({ tokenId: res.tokenId })
      setIsLoading(false)

      console.log("response :" + res)
      if (response.data.token) {
        localStorage.setItem("userToken", response.data.token)
        pageRoute("/chats")

      }
    }
  }
  const googleFailure = (error) => {
    toast.error("Something went Wrong.Try Again!")

    console.log(error);
  }
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const formSubmit = async (e) => {
    e.preventDefault()
    if (formData.email.includes("@") && formData.password.length > 6) {
      setIsLoading(true)
      const { data } = await loginUser(formData)
      if (data?.token) {
        localStorage.setItem("userToken", data.token)
        toast.success("Succesfully Login!")
        setIsLoading(false)
        pageRoute("/chats")
      }
      else {
        setIsLoading(false)
        toast.error("Invalid Credentials!")
        setFormData({ ...formData, password: "" })
      }
    }
    else {
      setIsLoading(false)
      toast.warning("Provide valid Credentials!")
      setFormData(defaultData)

    }
  }
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: process.env.REACT_APP_CLIENT_ID,
        scope: ''
      });
    };
    gapi.load('client:auth2', initClient);
    const isValid = async () => {
      const data = await validUser()
      if (data?.user) {
        window.location.href = "/chats"
      }

    }
    isValid()
  }, [])

  const imgStyle = {
    backgroundImage: `url(${chatbg})`,
    backgroungSize: 'cover',
  };
  return (
    <>
      <div
        className="min-h-screen bg-no-repeat bg-cover flex justify-center items-center"
        style={imgStyle}
      >
        <div className="container backdrop-blur-md bg-black/50 rounded-2xl w-[90%] sm:w-[80%] md:w-[80%] lg:w-[80%] xl:w-[60%] 2xl:w-[50%] pl-0 ml-0 h-[570px] sm:pl-0 sm:ml-9 mt-20 relative mx-4 shadow-lg grid grid-cols-2 flex-col justify-center items-center">
          <div className="col-span-1 pl-5">
            <h1 className="text-[30px] font-bold tracking-wider text-[#b9c92b]">
              Welcome to Chatly
            </h1>
            <p className="text-[#f5cef1] text-[20px] tracking-wider font-medium mt-6">
              Your Gateway to Seamless Communication!
            </p>
            <p className="text-[#c8dc9c] text-[17px] tracking-wider font-medium mt-5">
              Connecting Loved Ones, Near and Far
            </p>
          </div>

          <div className="col-span-1 text-center mt-3">
            <h3 className="text-[32px] font-bold tracking-wider text-[#fff]">
              Login
            </h3>
            <p className="text-[#fff] text-[15px] tracking-wider font-medium mt-2">
              Don't have an account?{' '}
              <Link
                className="text-[rgba(0,195,154,1)] underline"
                to="/register"
              >
                Sign up
              </Link>
            </p>

            <form
              className=" mr-4 flex flex-col gap-y-3 mt-[10%]"
              onSubmit={formSubmit}
            >
              <div>
                <input
                  className="w-[100%] sm:w-[93%] bg-[#515050] h-[50px] pl-3 text-[#ffff]"
                  onChange={handleOnChange}
                  name="email"
                  type="text"
                  placeholder="Email"
                  value={formData.email}
                  required
                />
              </div>
              <div className="relative">
                <input
                  className="w-[100%] sm:w-[93%] bg-[#515050] h-[50px] pl-3 text-[#ffff]"
                  onChange={handleOnChange}
                  type={showPass ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  required
                />
                {!showPass ? (
                  <button type="button">
                    <BsEmojiLaughing
                      onClick={() => setShowPass(!showPass)}
                      className="text-[#fff] absolute top-3 right-12 sm:right-8 w-[30px] h-[25px]"
                    />
                  </button>
                ) : (
                  <button type="button">
                    {' '}
                    <BsEmojiExpressionless
                      onClick={() => setShowPass(!showPass)}
                      className="text-[#fff] absolute top-3 right-12 sm:right-8 w-[30px] h-[25px]"
                    />
                  </button>
                )}
              </div>

              <button
                style={{
                  background:
                    'linear-gradient(90deg, rgba(0,195,154,1) 0%, rgba(224,205,115,1) 100%)',
                }}
                className="w-[100%]  sm:w-[93%] h-[50px] font-bold text-[#0f1013] tracking-wide text-[19px] relative ml-3 mt-5"
                type="submit"
              >
                <div
                  style={{ display: isLoading ? '' : 'none' }}
                  className="absolute -top-[53px] left-[27%] sm:-top-[53px] sm:left-[56px]"
                >
                  <lottie-player
                    src="https://assets2.lottiefiles.com/packages/lf20_h9kds1my.json"
                    background="transparent"
                    speed="1"
                    style={{ width: '200px', height: '160px' }}
                    loop
                    autoplay
                  ></lottie-player>
                </div>
                <p
                  style={{ display: isLoading ? 'none' : 'block' }}
                  className="test-[#fff]"
                >
                  Login
                </p>
              </button>
              <div className="border-t-[1px] w-[100%] sm:w-[93%] my-3 ml-3"></div>

              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                render={(renderProps) => (
                  <button
                    style={{
                      borderImage:
                        'linear-gradient(to right, rgba(0,195,154,1) 50%, rgba(224,205,115,1) 80%)',
                      borderImageSlice: '1',
                    }}
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    aria-label="Continue with google"
                    className="focus:ring-2 focus:ring-offset-1  py-3.5 px-4 border rounded-lg  flex justify-center items-center w-[100%]  sm:w-[93%] ml-3 mt-3 outline-none"
                    disableElevation={true}
                    disablefocusRipple={true}
                  >
                    <img
                      src="https://tuk-cdn.s3.amazonaws.com/can-uploader/sign_in-svg2.svg"
                      alt="google"
                    />
                    <p className="text-[17px] font-medium ml-4 text-[#f0ebba]">
                      Continue with Google
                    </p>
                  </button>
                )}
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy={'single_host_origin'}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login