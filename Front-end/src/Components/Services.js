import React from 'react'
import {FaMoneyCheck,FaDollarSign,FaUser} from 'react-icons/fa'
import {MdOutlineWifiTethering} from 'react-icons/md'
import {BsFillPhoneFill} from 'react-icons/bs'
import {AiFillLike} from 'react-icons/ai'

export default function Services() {
  
    return (
        <>
    <section id="services" class="services">
        <div class="container" data-aos="fade-up">

            <div class="section-title">
            <h2>Why choose Bus Station</h2>
            </div>

            <div class="row">
            <div class="col-lg-4 col-md-6 icon-box" data-aos="fade-up">
                <div class="icon"><i class="bi bi-chat-left-dots"><MdOutlineWifiTethering/></i></div>
                <h4 class="title">Ticket selling network</h4>
                <p class="description">First in Vietnam</p>
                <p class="description">Application of the latest technology</p>
            </div>
            <div class="col-lg-4 col-md-6 icon-box" data-aos="fade-up" data-aos-delay="100">
                <div class="icon"><i class="bi bi-bounding-box"><AiFillLike/></i></div>
                <h4 class="title">Garage &amp; Service</h4>
                <p class="description">Diversity – Quality – Safer</p>
            </div>
            <div class="col-lg-4 col-md-6 icon-box" data-aos="fade-up" data-aos-delay="200">
                <div class="icon"><i class="bi bi-globe"><FaDollarSign/></i></div>
                <h4 class="title">Price</h4>
                <p class="description">Always have the best price</p>
            </div>
            <div class="col-lg-4 col-md-6 icon-box" data-aos="fade-up" data-aos-delay="300">
                <div class="icon"><i class="bi bi-broadcast"><FaMoneyCheck  /></i></div>
                <h4 class="title">Payment</h4>
                <p class="description">Safer  &amp;  flexible</p>
            </div>
            <div class="col-lg-4 col-md-6 icon-box" data-aos="fade-up" data-aos-delay="400">
                <div class="icon"><i class="bi bi-brightness-high"><BsFillPhoneFill/></i></div>
                <h4 class="title">Buy ticket</h4>
                <p class="description">Easily &amp; fast with only 3 steps</p>
            </div>
            <div class="col-lg-4 col-md-6 icon-box" data-aos="fade-up" data-aos-delay="500">
                <div class="icon"><i class="bi bi-calendar2-week"><FaUser/></i></div>
                <h4 class="title">Support</h4>
                <p class="description">Hotline &amp; online (08h00 - 22h00)</p>
            </div>
            </div>

        </div>
    </section>
        </>
        )
}