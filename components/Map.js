import React from 'react'
import dynamic from 'next/dynamic';

// const DynamicIframeComponent = dynamic(() => import('../components/IframeComponent'), {
//     ssr: false, // Ensures it runs only on the client
// });

const Map = () => {
  return (
    <>
        <section className='map'>
            <div className="container">
                <h2 className='primary-heading map__heading'>Our Location</h2>
                <div className="map__content">
                    <div className='map__skyturf'>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1826.6289962026638!2d90.45124529623874!3d23.70247927037223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b7001a0b7ce7%3A0xd02f7ade7b746510!2sSky%20Turf!5e0!3m2!1sen!2sbd!4v1758200072611!5m2!1sen!2sbd"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className='map__map'
                        ></iframe>
                    </div>
                    <div className='map__timeupturf'>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7306.340127229454!2d90.43615400791168!3d23.705620220635076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b9004ee1d9af%3A0x8fbe42956f60e2c!2sTime%20Up!5e0!3m2!1sen!2sbd!4v1758200382905!5m2!1sen!2sbd"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className='map__map'
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>

    </>
  )
}

export default Map