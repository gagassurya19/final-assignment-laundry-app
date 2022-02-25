import React from "react";

import Navbar from "./navbar";
import Hero from "./hero";
import Statistic from "./statistic";
import Testimoni from "./testimoni";
import Price from "./price";
import Contact from "./contact";
import Gallery from "./gallery";
import { Footer } from "../../components";

import dataJson from "../../data/landingPage.json";
const data = JSON.parse(JSON.stringify(dataJson))

export default function LandingPage() {
    return (
        <>
            <div class="sticky top-0 bg-white z-10 container mx-auto">
                <Navbar site_name={data.site_name} menu={data.navbar.menu} button={data.navbar.button} />
            </div>
            <div class="container mx-auto">
                <div>
                    <Hero title={data.hero.title} image={data.hero.image} />
                    <Statistic data={data.statistic} />
                    <Testimoni data={data.testimoni} />
                    <Price data={data.package} />
                    <Contact data={data.contact}/>
                    <Gallery data={data.gallery} />
                    <Footer/>
                </div>
            </div>
        </>
    )
}
