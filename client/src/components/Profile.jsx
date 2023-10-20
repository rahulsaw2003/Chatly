import React, { useState, useRef } from 'react'
import { IoArrowBack } from "react-icons/io5"
import { useDispatch, useSelector } from 'react-redux'
import { setShowProfile } from '../redux/profileSlice'
import { IoMdLogOut } from "react-icons/io"
import { BsCamera } from "react-icons/bs"
import InputEdit from './profile/InputEdit'
import { updateUser } from '../apis/auth'
import { toast } from 'react-toastify'
import { setUserNameAndBio } from '../redux/activeUserSlice'
function Profile(props) {
  const dispatch = useDispatch()
  const { showProfile } = useSelector((state) => state.profile)
  const activeUser = useSelector((state) => state.activeUser)
  const [formData, setFormData] = useState({
    name: activeUser.name,
    bio: activeUser.bio,
    pic: activeUser.profilePic
  })
  const logoutUser = () => {
    toast.success("Logout Successfull!")
    localStorage.removeItem("userToken")
    window.location.href = "/login"
  }

  const fileInputRef = useRef();

  const handleImageChange = (e) => {
    // Handle image selection here
    const selectedImage = e.target.files[0];
    console.log('Selected image:', selectedImage);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {

    dispatch(setUserNameAndBio(formData))
    toast.success("Updated!")
    await updateUser(activeUser.id, formData)

  }
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const submit = async () => {

    dispatch(setUserNameAndBio(formData))
    toast.success("Updated!")
    await updateUser(activeUser.id, formData)

  }

  return (
    <div
      style={{ transition: showProfile ? '0.3s ease-in-out' : '' }}
      className={props.className}
    >
      <div className="absolute w-[100%] min-h-full border-r border-gray-500">
        <div className="bg-[#166e48] h-[69px] pt-[20px]">
          <button
            onClick={() => dispatch(setShowProfile(false))}
            className="flex items-center ml-2"
          >
            <IoArrowBack
              style={{ color: '#fff', width: '30px', height: '25px' }}
            />
            <h6 className="text-[22px] text-[#fff] font-bold ml-2">Profile</h6>
          </button>
        </div>
        <div class="border-b border-gray-400 mt-[1px]"></div>

        <div className=" pt-5">
          <div className="flex items-center flex-col">
            <img
              className="w-[160px] h-[160px] rounded-[100%] -ml-5"
              src={activeUser?.profilePic}
              alt=""
            />
          </div>

          <form encType="multipart/form-data" onSubmit={handleSubmit}>
            <label className="flex items-center justify-center mt-5 cursor-pointer shadow-2xl">
              <BsCamera
                className="text-[#9e03ff] w-[20px] h-[20px]"
                style={{ cursor: 'pointer' }}
              />
              <h6 className="text-[13px] text-[#9e03ff] font-semibold ml-2">
                Change Profile Image
              </h6>
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageChange}
                ref={fileInputRef}
              />
            </label>
            <button type="submit" className="hidden">
              Submit
            </button>
          </form>
        </div>
        <div>
          <InputEdit
            type="name"
            handleChange={handleChange}
            input={formData.name}
            handleSubmit={submit}
          />

          <div>
            <div className="py-5 px-4">
              <p className="text-[10px] tracking-wide text-[#3b4a54] ">
                This is not your username or pin. This name will be visible to
                your contacts
              </p>
            </div>
          </div>
          <InputEdit
            type="bio"
            handleChange={handleChange}
            input={formData.bio}
            handleSubmit={submit}
          />
        </div>

        <div
          onClick={logoutUser}
          className="flex items-center justify-center mt-5 cursor-pointer shadow-2xl"
        >
          <IoMdLogOut
            className="text-[#e44d4d] w-[27px] h-[23px]"
            style={{ cursor: 'pointer' }}
          />
          <h6 className="text-[17px] text-[#e44d4d] font-semibold">Logout</h6>
        </div>
      </div>
    </div>
  );
}

export default Profile