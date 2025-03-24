import React, { useEffect, useState } from 'react';
import GalleryFilter from './GalleryFilter';

const Gallery = ({ galleryData,  collection, handleFilterChange,  selectedCategory}) => {
  const [clickedImage, setClickedImage] = useState(null);
  // const [imageSources, setImageSources] = useState({}); // State to store image sources for each item
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleImageClick = (item) => {
    setClickedImage(item);
    setCurrentIndex(0);
  };

  const handlePrevImage = () => {
    if (clickedImage.photos) {
      const newIndex = (currentIndex - 1 + clickedImage.photos.length) % clickedImage.photos.length;
      setCurrentIndex(newIndex);
    }
  };

  const handleNextImage = () => {
    if (clickedImage.photos) {
      const newIndex = (currentIndex + 1) % clickedImage.photos.length;
      setCurrentIndex(newIndex);
    }
  };

  const closeModal = (e) => {
    if (e.target.classList.contains('modalBackground')) {
      setClickedImage(null);
    }
  };

  useEffect(() => {
    const images = document.querySelectorAll('.galleryItem img');

    images.forEach(img => {
      if (img.complete) {
        img.classList.add('loaded');
      } else {
        img.addEventListener("load", () => {
          img.classList.add('loaded');
        });
      }
    });

    const body = document.body;
    if (clickedImage) {
      body.classList.add('no-scroll');
    } else {
      body.classList.remove('no-scroll');
    }
  }, [clickedImage]); 

  // const handleImageArray = (item, index) => {
  //   let imgIndex = 0; // Initialize index to 0
  //   // setCurrentImageSrc(index, `../images/${item.folder}/${item.photos[imgIndex]}`);
  //   if (item.photos && item.photos.length > 0) {
  //     // const timer = setInterval(() => {
  //     //   setCurrentImageSrc(index, `../images/${item.folder}/${item.photos[imgIndex]}`);
  //     //   imgIndex++;

  //     //   // If index exceeds the length of photos array, reset it to 0
  //     //   if (imgIndex >= item.photos.length) {
  //     //     imgIndex = 0;
  //     //   }
  //     // }, 5000); // Interval of 5 seconds
  //   }
  // };

  
  // const setCurrentImageSrc = (index, src) => {
  //   console.log(src)
  //   setImageSources(prevState => ({
  //     ...prevState,
  //     [index]: src // Update the image source for the specified index
  //   }));
  // };

  // };

  return (
    <div className='gallery'  >
      <div className='container'>
        {galleryData.map((item, index) =>
          <div className='galleryItem' style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/${item.key}-small.jpg)` }} key={index} onClick={() => handleImageClick(item)}>
            {/* display image here */}
            {/* {item.folder && imageSources[index] && (
              // <img src={imageSources[index]} alt={item.title} loading="lazy"/>
              <img src={`../images/${item.folder}/${item.key}`} alt={item.title} loading="lazy"/>
            )} */}
            {/* {!item.folder && ( */}
            <img src={`../images/${item.key}.jpg`} alt={item.title} loading="lazy" onError={(e) => {
               e.target.src = `../images/${item.key}.gif`;
            }}/>
            {/* )} */}
            {/* <p>{item.medium}</p> */}
          </div>
        )}
      </div>

       {/* pop-up */}
      {clickedImage && (
      <div className="modalBackground" onClick={closeModal}>
        <div className="modalContent">
       
        {clickedImage.folder ? (
              // carousel
              <img src={`../images/${clickedImage.folder}/${clickedImage.photos[currentIndex]}`} alt={clickedImage.title} loading="lazy"/>
              ) : (
              // no carousel
              <img src={`../images/${clickedImage.key}.jpg`} alt={clickedImage.title} loading="lazy" onError={(e) => {
                e.target.src = `../images/${clickedImage.key}.gif`;
              }}/>
            )}

          <div className="artPieceInfo">
              
            {clickedImage.folder && (
             <div className="imageNavigation">
                <button className="prevButton" onClick={() => handlePrevImage()}>Prev</button>
                <button className="nextButton" onClick={() => handleNextImage()}>Next</button>
              </div>
            )}

            <h2>{clickedImage.title}</h2>
            {/* button for external project link, if it exists */}
            {clickedImage.link && (
              <a href={clickedImage.link} target="_blank" rel="noopener noreferrer" className="projectLinkButton">View Project</a>
            )}

            <p>{clickedImage.year}</p>
            <p>{clickedImage.medium}</p>
            <p>{clickedImage.dimensions}</p>
            <p>{clickedImage.description}</p>
          </div>
          {/* <button onClick={closeModal}>Close</button> */}
        </div>
      </div>
    )}
  </div>
);


};

export default Gallery;


// import React from 'react'
// import { useEffect, useState } from 'react';

// //import the data and sort it by year
// import { GalleryData as originalGalleryData  } from '../GalleryData'; 
// import GalleryFilter from './GalleryFilter';
// const sortedGalleryData = () => {
//     return [...originalGalleryData].sort((a, b) => b.year - a.year);
// };
// export const GalleryData = sortedGalleryData();

// //the gallery
// const Gallery = ({ galleryData }) => {
//     const [data, setData] = useState([]);
//     const [collection, setCollection] = useState([]);
//     const [clickedImage, setClickedImage] = useState(null);
//     const [selectedCategory, setSelectedCategory] = useState('all'); // Add selectedCategory state variable

//     useEffect(() => {
//         setData(GalleryData);
//         //set categories
//         setCollection([...new Set(GalleryData.map((item) => item.category))]);
//     }, []);

//     // radio group category filter
//     const gallery_filter = (category) => {
//         setSelectedCategory(category);
//         if (category === 'all') {
//             setData(sortedGalleryData());
//         } else {
//             const filteredData = GalleryData.filter(item => item.category === category);
//             setData(filteredData);
//         }
//     };
    
//     const handleImageClick = (item) => {

//             setClickedImage(item);
//             console.log(item.category);
//     };

//     const closeModal = () => {
//         setClickedImage(null);
//     };

//     const photos = GalleryData.map(item => ({
//         src: `../images/${item.image}`, // Assuming your images are stored in the images folder
//         // width: item.width, // Width of the image
//         // height: item.height, // Height of the image
//       }));
  
//     return (
//       <div className='gallery'>
//         <div >
//         <div className='radioContainer'>
      
//                     <ul>
//                     <li>
//                         <label className="radio-button">
//                             <input
//                                 type="radio"
//                                 value="all"
//                                 checked={selectedCategory === 'all'}
//                                 onChange={() => gallery_filter('all')}
//                             />
//                            <div className="radio-circle"></div>
//                            <span> All </span>
//                         </label>
//                     </li>
//                     {collection.map((item, index) => (
//                         <li key={index}>
//                             <label className="radio-button">
//                                 <input
//                                     type="radio"
//                                     value={item}
//                                     checked={selectedCategory === item}
//                                     onChange={() => gallery_filter(item)}
//                                 />
//                                 <div className="radio-circle"></div>
//                                 <span> {item} </span>
//                             </label>
//                         </li>
//                     ))}
//                 </ul>
//         </div>
//         </div>

//         <div className='container' >
//         {
//         data.map((item, index) =>       
//         <div className='galleryItem' key={index} onClick={() => handleImageClick(item)}>
//         <img src={`../images/${item.image}`}  />
//         <p>{item.medium}</p>
//         </div>
//         )
//         }
//         </div>  

//         {/* pop-up */}
//         {clickedImage && (
//                 <div className="modalBackground" onClick={closeModal}>
//                     <div className="modalContent">
//                         <img src={`../images/${clickedImage.image}`} alt={clickedImage.title} />
//                         <div className="artPieceInfo">
//                             <h2>{clickedImage.title}</h2>
//                               {/* button for external project link, if it exists */}
//                          {clickedImage.link && (
//                          <a href={clickedImage.link} target="_blank" rel="noopener noreferrer" className="projectLinkButton">View Project</a>
//                         )}
//                                 <p>{clickedImage.year}</p>
//                                 <p>{clickedImage.medium}</p>
//                                 <p>{clickedImage.dimensions}</p>
//                                 <p>{clickedImage.description}</p>
//                          </div>
//                         <button onClick={closeModal}>Close</button>
//                     </div>
//                 </div>
//             )}
//             {/* pop-up */}
//       </div>
//     );
//   };

// export default Gallery;
