import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import './profile.css'
import ImageCard from '../Image/ImageCard';
import axios from "axios";
import noprofile from '../assets/noprofile.jpg'
import { useNavigate } from 'react-router-dom';

function Profile() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [openImages, setOpenImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchImages = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/image/images?googleId=${user?.googleId}`);
      setImages(response.data.images);
    } catch (err) {
      setError("Failed to fetch images. Please try again.");
    }
    setLoading(false);
  };
  console.log(user.photo);
  return (
    <div className='m-40'>
      {
        user
          ?
          <div className="relative max-w-md mx-auto md:max-w-1xl mt-6 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-16">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full flex justify-center">
                  <div className="relative">
                    <img src={user.photo ? user.photo : noprofile} className="shadow-xl rounded-full align-middle w-24 h-24 border-t-2 border-solid border-black-600 absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]" />
                  </div>
                </div>
                <div className="w-full text-center mt-10">
                  <div className="flex justify-center lg:pt-4 pt-8 pb-0">
                    <div className="p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">50</span>
                      <span className="text-sm text-slate-400">Followers</span>
                    </div>
                    <div className="p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">5</span>
                      <span className="text-sm text-slate-400">Following</span>
                    </div>
                    <div className="p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">{user?.generatedImages.length}</span>
                      <span className="text-sm text-slate-400">Images</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-2">
                <h3 className="text-2xl text-slate-700 font-bold leading-normal mb-1">{user?.displayName}</h3>
                <div className="text-xs mt-0 mb-2 text-slate-400 font-bold">
                  <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>{user?.email.toLowerCase()}
                </div>
              </div>
              <div className="mt-6 py-6 border-t border-slate-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full px-4">

                    <p className="font-light leading-relaxed text-slate-600 mb-4">User Description</p>
                    <p className="w-fit inline-block bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"  onClick={() => {fetchImages(); setOpenImages(!openImages)}} disabled={loading}>
                      {openImages ? `Hide Images`: `Show Images`}
                    </p>

                  </div>
                </div>
              </div>
            </div>
          </div>
          :
          navigate('/')
      }
      {error && <p className="error-text">{error}</p>}
      {openImages 
        ? 
      <div className="images-grid">
        {images.length > 0 ? (
          images.map((img, index) => <ImageCard key={index} img={img} index={index} />)
        ) : (
          !loading && <p className="no-images"></p>
        )}
      </div> 
        : 
      null}
    </div>
  )
}

export default Profile