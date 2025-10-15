import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Facilites = () => {
  return (
    <>
        <section className='our-facilities'>
            <div className="container">
                <h2 className='primary-heading our-facilities__heading'>Our Facilites</h2>
                <div className='our-facilities__content'>
                    <div className='our-facilities__sky'>
                        <h3 className='our-facilities__list-heading'>Sky Turf Facilities</h3>
                        <div className='our-facilities__list-wrap'>
                            <ul className='our-facilities__list'>
                                <li className='our-facilities__list-item'>Fast Aid</li>
                                <li className='our-facilities__list-item'>Cold water</li>
                                <li className='our-facilities__list-item'>Video recording 3 Gool  par slot</li>
                                <li className='our-facilities__list-item'>Goalkeeping gloves</li>
                                <li className='our-facilities__list-item'>Apron</li>
                                <li className='our-facilities__list-item'>Changing room</li>
                                <li className='our-facilities__list-item'>Washroom & Shower</li>
                                <li className='our-facilities__list-item'>Cricket football accessories</li>
                            </ul>
                        </div>
                        <Link href="">
                            <span className='secondary-button'>Book Now</span>
                        </Link>
                    </div>
                    <div className='our-facilities__timeup'>
                        <h3 className='our-facilities__list-heading'>Time Up Facilities</h3>
                        <div className='our-facilities__list-wrap'>
                            <ul className='our-facilities__list'>
                                <li className='our-facilities__list-item'>Fast Aid</li>
                                <li className='our-facilities__list-item'>Cold water</li>
                                <li className='our-facilities__list-item'>Video recording 3 Gool  par slot</li>
                                <li className='our-facilities__list-item'>Goalkeeping gloves</li>
                                <li className='our-facilities__list-item'>Apron</li>
                                <li className='our-facilities__list-item'>Changing room</li>
                                <li className='our-facilities__list-item'>Washroom & Shower</li>
                                <li className='our-facilities__list-item'>Cricket football accessories</li>
                            </ul>
                        </div>
                        <Link href="">
                            <span className='secondary-button'>Book Now</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Facilites